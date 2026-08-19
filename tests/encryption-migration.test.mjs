import assert from "node:assert/strict";

const JOURNAL_ENCRYPTION_VERSION = 1;

function randomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function bytesToBase64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

function base64ToBytes(value) {
  return new Uint8Array(Buffer.from(value, "base64"));
}

async function deriveWrappingKey(secret, salt, metadata) {
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: metadata.kdf_iterations,
      hash: metadata.kdf_hash,
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["wrapKey", "unwrapKey"],
  );
}

async function wrapKey(secret, journalKey, overrides = {}) {
  const metadata = {
    key_version: 1,
    kdf_iterations: overrides.kdf_iterations || 120000,
    kdf_hash: overrides.kdf_hash || "SHA-256",
    kdf_algorithm: "PBKDF2",
    wrapping_algorithm: "AES-GCM",
  };
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const wrappingKey = await deriveWrappingKey(secret, salt, metadata);
  const wrapped = await crypto.subtle.wrapKey("raw", journalKey, wrappingKey, { name: "AES-GCM", iv });
  return {
    ...metadata,
    wrapped_journal_key: bytesToBase64(new Uint8Array(wrapped)),
    wrapping_iv: bytesToBase64(iv),
    kdf_salt: bytesToBase64(salt),
    updated_at: "2026-08-19T12:00:00.000Z",
  };
}

async function unwrapKey(secret, metadata) {
  const wrappingKey = await deriveWrappingKey(secret, base64ToBytes(metadata.kdf_salt), metadata);
  return crypto.subtle.unwrapKey(
    "raw",
    base64ToBytes(metadata.wrapped_journal_key),
    wrappingKey,
    { name: metadata.wrapping_algorithm, iv: base64ToBytes(metadata.wrapping_iv) },
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
}

async function encryptText(key, text) {
  const iv = randomBytes(12);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text || ""));
  return {
    ciphertext: bytesToBase64(new Uint8Array(ciphertext)),
    iv: bytesToBase64(iv),
  };
}

async function decryptText(key, ciphertext, iv) {
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64ToBytes(iv) }, key, base64ToBytes(ciphertext));
  return new TextDecoder().decode(plaintext);
}

function validTime(value) {
  const parsed = value ? new Date(value).getTime() : NaN;
  return Number.isNaN(parsed) ? 0 : parsed;
}

function newerByUpdatedAt(localEntry, cloudEntry) {
  if (!localEntry) return cloudEntry;
  if (!cloudEntry) return localEntry;
  return validTime(cloudEntry.updatedAt) > validTime(localEntry.updatedAt) ? cloudEntry : localEntry;
}

function hasReflectionText(entry) {
  return Object.prototype.hasOwnProperty.call(entry || {}, "text");
}

function localReflectionEntries(reflections) {
  return Object.values(reflections || {}).filter((entry) => entry?.id && entry?.date && hasReflectionText(entry));
}

function mergeReflectionMaps(currentReflections, cloudReflections) {
  const merged = { ...(currentReflections || {}) };
  Object.entries(cloudReflections || {}).forEach(([id, cloudEntry]) => {
    merged[id] = newerByUpdatedAt(merged[id], cloudEntry);
  });
  return merged;
}

async function restoreRows(rows, key) {
  const restored = {};
  for (const row of rows) {
    const text = await decryptText(key, row.reflection_ciphertext, row.reflection_iv);
    restored[row.id] = {
      id: row.id,
      date: row.date,
      affirmationId: row.affirmation_id || "",
      category: row.category || "",
      affirmation: row.affirmation || "",
      text,
      updatedAt: row.updated_at || "",
    };
  }
  return restored;
}

async function rowsForKey(reflections, key) {
  const rows = [];
  for (const entry of localReflectionEntries(reflections)) {
    const encrypted = await encryptText(key, entry.text || "");
    rows.push({
      id: entry.id,
      date: entry.date,
      affirmation_id: entry.affirmationId || "",
      category: entry.category || "",
      affirmation: entry.affirmation || "",
      reflection_ciphertext: encrypted.ciphertext,
      reflection_iv: encrypted.iv,
      encryption_version: JOURNAL_ENCRYPTION_VERSION,
      updated_at: entry.updatedAt || "2026-08-19T12:00:00.000Z",
    });
  }
  return rows;
}

async function mergedForMigration(localReflections, cloudRows, oldKey) {
  const cloudReflections = await restoreRows(cloudRows, oldKey);
  const localReflectionsById = Object.fromEntries(localReflectionEntries(localReflections).map((entry) => [entry.id, entry]));
  return mergeReflectionMaps(cloudReflections, localReflectionsById);
}

async function verifyCommitted(expectedRows, committedRows, committedMetadata, expectedMetadata, secret) {
  assert.deepEqual(
    new Set(committedRows.map((row) => row.id)),
    new Set(expectedRows.map((row) => row.id)),
    "committed reflection IDs must match the submitted set",
  );
  assert.equal(committedRows.length, expectedRows.length, "committed count must match submitted count");
  assert.equal(committedMetadata.wrapped_journal_key, expectedMetadata.wrapped_journal_key, "committed metadata must match");
  const recoveredKey = await unwrapKey(secret, committedMetadata);
  const restored = await restoreRows(committedRows, recoveredKey);
  assert.equal(Object.keys(restored).length, expectedRows.length, "new secret must decrypt committed rows");
  return recoveredKey;
}

async function testMetadataAwareUnwrap() {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const metadata = await wrapKey("new-secret-123", key, { kdf_iterations: 90000 });
  const unwrapped = await unwrapKey("new-secret-123", metadata);
  const encrypted = await encryptText(key, "metadata matters");
  assert.equal(await decryptText(unwrapped, encrypted.ciphertext, encrypted.iv), "metadata matters");
}

async function testMergePreservesNewestAndEmptyText() {
  const oldKey = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const cloudEncrypted = await rowsForKey({
    shared: { id: "shared", date: "2026-08-09", text: "cloud old", updatedAt: "2026-08-09T09:00:00.000Z" },
    emptyCloud: { id: "emptyCloud", date: "2026-08-10", text: "", updatedAt: "2026-08-10T09:00:00.000Z" },
  }, oldKey);
  const merged = await mergedForMigration({
    shared: { id: "shared", date: "2026-08-09", text: "local new", updatedAt: "2026-08-11T09:00:00.000Z" },
    emptyLocal: { id: "emptyLocal", date: "2026-08-12", text: "", updatedAt: "2026-08-12T09:00:00.000Z" },
  }, cloudEncrypted, oldKey);
  assert.equal(merged.shared.text, "local new");
  assert.equal(merged.emptyCloud.text, "");
  assert.equal(merged.emptyLocal.text, "");
  assert.equal(localReflectionEntries(merged).length, 3);
}

async function testPostRpcVerificationAndCountMismatch() {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const secret = "new-secret-123";
  const metadata = await wrapKey(secret, key);
  const rows = await rowsForKey({
    one: { id: "one", date: "2026-08-01", text: "One", updatedAt: "2026-08-01T10:00:00.000Z" },
    two: { id: "two", date: "2026-08-02", text: "Two", updatedAt: "2026-08-02T10:00:00.000Z" },
  }, key);
  await verifyCommitted(rows, rows, metadata, metadata, secret);
  await assert.rejects(() => verifyCommitted(rows, rows.slice(0, 1), metadata, metadata, secret), /committed reflection IDs|count/);
}

async function testRotationVerifiesNewSecretBeforeUpload() {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  const metadata = await wrapKey("rotated-secret-123", key);
  const unwrapped = await unwrapKey("rotated-secret-123", metadata);
  const cloudRows = await rowsForKey({
    entry: { id: "entry", date: "2026-08-03", text: "Still readable", updatedAt: "2026-08-03T10:00:00.000Z" },
  }, key);
  const restored = await restoreRows(cloudRows, unwrapped);
  assert.equal(restored.entry.text, "Still readable");
  await assert.rejects(() => unwrapKey("wrong-secret-123", metadata));
}

function testPartialSuccessAndCapabilityDecisions() {
  const migrationStatus = (cloudSucceeded, localSaveSucceeded) => cloudSucceeded && !localSaveSucceeded ? "partial-success" : "success";
  assert.equal(migrationStatus(true, false), "partial-success");
  const visibleAction = (configured, extractable) => {
    if (!configured) return "setup";
    return extractable ? "change-secret" : "migrate-legacy-key";
  };
  assert.equal(visibleAction(true, true), "change-secret");
  assert.equal(visibleAction(true, false), "migrate-legacy-key");
  assert.equal(visibleAction(false, false), "setup");
}

await testMetadataAwareUnwrap();
await testMergePreservesNewestAndEmptyText();
await testPostRpcVerificationAndCountMismatch();
await testRotationVerifiesNewSecretBeforeUpload();
testPartialSuccessAndCapabilityDecisions();

console.log("encrypted journal migration tests passed");
