const DATA_URL = "data/affirmations.json";
const STORAGE_KEY = "dailyAffirmation.v1";
const serviceWorkerPath = "service-worker.js";

const defaultState = {
  settings: {
    theme: "system",
    textSize: "0",
    highContrast: false,
    breatheFirst: false,
    readAloud: true,
    categories: [
      "general",
      "gratitude",
      "anxiety_calm",
      "healing",
      "confidence",
      "relationships",
      "happiness",
    ],
    reminderEnabled: false,
    reminderTime: "09:00",
  },
  favorites: [],
  reflections: {},
  feedback: {},
};

const elements = {
  todayLabel: document.querySelector("#todayLabel"),
  greetingText: document.querySelector("#greetingText"),
  categoryLabel: document.querySelector("#categoryLabel"),
  affirmationText: document.querySelector("#affirmationText"),
  affirmationCard: document.querySelector("#affirmationCard"),
  breathPanel: document.querySelector("#breathPanel"),
  revealButton: document.querySelector("#revealButton"),
  newAffirmationButton: document.querySelector("#newAffirmationButton"),
  copyButton: document.querySelector("#copyButton"),
  favoriteButton: document.querySelector("#favoriteButton"),
  speakButton: document.querySelector("#speakButton"),
  stopSpeakButton: document.querySelector("#stopSpeakButton"),
  statusMessage: document.querySelector("#statusMessage"),
  reflectionText: document.querySelector("#reflectionText"),
  reflectionContext: document.querySelector("#reflectionContext"),
  favoriteSearch: document.querySelector("#favoriteSearch"),
  favoritesList: document.querySelector("#favoritesList"),
  reflectionSearch: document.querySelector("#reflectionSearch"),
  reflectionsList: document.querySelector("#reflectionsList"),
  affirmationSearch: document.querySelector("#affirmationSearch"),
  searchResults: document.querySelector("#searchResults"),
  searchCategoryFilters: document.querySelector("#searchCategoryFilters"),
  settingsCategoryFilters: document.querySelector("#settingsCategoryFilters"),
  themeSelect: document.querySelector("#themeSelect"),
  textSizeRange: document.querySelector("#textSizeRange"),
  highContrastToggle: document.querySelector("#highContrastToggle"),
  breatheToggle: document.querySelector("#breatheToggle"),
  readAloudToggle: document.querySelector("#readAloudToggle"),
  reminderToggle: document.querySelector("#reminderToggle"),
  reminderTime: document.querySelector("#reminderTime"),
  checkNotificationsButton: document.querySelector("#checkNotificationsButton"),
  notificationMessage: document.querySelector("#notificationMessage"),
  clearDataButton: document.querySelector("#clearDataButton"),
  themeQuickButton: document.querySelector("#themeQuickButton"),
};

let appData = { categories: {}, affirmations: [] };
let state = loadState();
let currentAffirmation = null;
let breathGateOpen = true;
let statusTimer = 0;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      ...structuredClone(defaultState),
      ...saved,
      settings: { ...defaultState.settings, ...saved?.settings },
      favorites: Array.isArray(saved?.favorites) ? saved.favorites : [],
      reflections: saved?.reflections || {},
      feedback: saved?.feedback || {},
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function dayNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

function setStatus(message) {
  window.clearTimeout(statusTimer);
  elements.statusMessage.textContent = message;
  statusTimer = window.setTimeout(() => {
    elements.statusMessage.textContent = "";
  }, 4200);
}

function getSelectedCategories() {
  const available = Object.keys(appData.categories);
  const selected = state.settings.categories.filter((category) => available.includes(category));
  return selected.length ? selected : ["general"];
}

function getEligibleAffirmations() {
  const selected = new Set(getSelectedCategories());
  return appData.affirmations.filter((item) => selected.has(item.category));
}

function scoreAffirmation(item) {
  const feedback = state.feedback[item.category] || {};
  return (feedback.helped || 0) * 2 + (feedback.favorite || 0) - (feedback.notToday || 0);
}

function chooseAffirmation(preferDaily = false) {
  if (!appData.affirmations.length) {
    return null;
  }

  const pool = getEligibleAffirmations();
  if (!pool.length) {
    return appData.affirmations[0];
  }

  if (preferDaily) {
    const boosted = pool
      .map((item) => ({ item, score: scoreAffirmation(item) }))
      .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id));
    const top = boosted.slice(0, Math.min(boosted.length, 30));
    return top[dayNumber() % top.length].item;
  }

  const weights = pool.map((item) => Math.max(1, 4 + scoreAffirmation(item)));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = Math.random() * total;

  for (let index = 0; index < pool.length; index += 1) {
    cursor -= weights[index];
    if (cursor <= 0) {
      return pool[index];
    }
  }

  return pool[0];
}

function categoryName(key) {
  return appData.categories[key] || key;
}

function setAffirmation(item, options = {}) {
  if (!item) {
    setStatus("Affirmations are still loading.");
    return;
  }

  currentAffirmation = item;
  elements.categoryLabel.textContent = categoryName(item.category);
  elements.affirmationText.textContent = item.text;
  elements.favoriteButton.setAttribute("aria-pressed", String(state.favorites.includes(item.id)));
  elements.favoriteButton.textContent = state.favorites.includes(item.id) ? "Favorited" : "Favorite";
  elements.reflectionContext.textContent = `${todayKey()} · ${categoryName(item.category)}`;
  loadCurrentReflection();

  if (state.settings.breatheFirst && !options.skipBreath) {
    breathGateOpen = false;
    elements.breathPanel.hidden = false;
    elements.affirmationCard.hidden = true;
  } else {
    breathGateOpen = true;
    elements.breathPanel.hidden = true;
    elements.affirmationCard.hidden = false;
  }
}

function revealAffirmation() {
  breathGateOpen = true;
  elements.breathPanel.hidden = true;
  elements.affirmationCard.hidden = false;
  elements.affirmationText.focus({ preventScroll: false });
}

function reflectionId(item = currentAffirmation) {
  return item ? `${todayKey()}::${item.id}` : "";
}

function loadCurrentReflection() {
  const id = reflectionId();
  elements.reflectionText.value = state.reflections[id]?.text || "";
}

function saveCurrentReflection() {
  if (!currentAffirmation) {
    return;
  }

  const id = reflectionId();
  const text = elements.reflectionText.value;
  if (text.trim()) {
    state.reflections[id] = {
      id,
      date: todayKey(),
      affirmationId: currentAffirmation.id,
      category: currentAffirmation.category,
      affirmation: currentAffirmation.text,
      text,
      updatedAt: new Date().toISOString(),
    };
  } else {
    delete state.reflections[id];
  }
  saveState();
  renderReflections();
}

function toggleFavorite(id = currentAffirmation?.id) {
  if (!id) {
    return;
  }

  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((favoriteId) => favoriteId !== id);
    setStatus("Removed from favorites.");
  } else {
    state.favorites = [...state.favorites, id];
    if (currentAffirmation) {
      saveFeedback("favorite", false);
    }
    setStatus("Saved to favorites.");
  }
  saveState();
  if (currentAffirmation?.id === id) {
    setAffirmation(currentAffirmation, { skipBreath: breathGateOpen });
  }
  renderFavorites();
}

async function copyAffirmation() {
  if (!currentAffirmation) {
    return;
  }

  try {
    await navigator.clipboard.writeText(currentAffirmation.text);
    setStatus("Affirmation copied.");
  } catch {
    setStatus("Copy is not available in this browser.");
  }
}

function saveFeedback(value, announce = true) {
  if (!currentAffirmation) {
    return;
  }

  const category = currentAffirmation.category;
  state.feedback[category] = state.feedback[category] || {};
  if (value === "helped") {
    state.feedback[category].helped = (state.feedback[category].helped || 0) + 1;
  }
  if (value === "neutral") {
    state.feedback[category].neutral = (state.feedback[category].neutral || 0) + 1;
  }
  if (value === "not-today") {
    state.feedback[category].notToday = (state.feedback[category].notToday || 0) + 1;
  }
  if (value === "favorite") {
    state.feedback[category].favorite = (state.feedback[category].favorite || 0) + 1;
  }
  saveState();
  if (announce) {
    setStatus("Feedback saved locally.");
  }
}

function renderFavorites() {
  const query = elements.favoriteSearch.value.trim().toLowerCase();
  const favorites = state.favorites
    .map((id) => appData.affirmations.find((item) => item.id === id))
    .filter(Boolean)
    .filter((item) => !query || item.text.toLowerCase().includes(query) || categoryName(item.category).toLowerCase().includes(query));

  elements.favoritesList.innerHTML = "";
  if (!favorites.length) {
    elements.favoritesList.append(emptyMessage("No favorites match this search."));
    return;
  }

  favorites.forEach((item) => {
    const card = resultCard(item);
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove favorite";
    removeButton.addEventListener("click", () => toggleFavorite(item.id));
    card.querySelector(".result-actions").append(removeButton);
    elements.favoritesList.append(card);
  });
}

function renderReflections() {
  const query = elements.reflectionSearch.value.trim().toLowerCase();
  const reflections = Object.values(state.reflections)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .filter((item) => {
      const haystack = `${item.date} ${item.affirmation} ${item.text} ${categoryName(item.category)}`.toLowerCase();
      return !query || haystack.includes(query);
    });

  elements.reflectionsList.innerHTML = "";
  if (!reflections.length) {
    elements.reflectionsList.append(emptyMessage("No saved reflections match this search."));
    return;
  }

  reflections.forEach((item) => {
    const card = document.createElement("article");
    card.className = "result-card";
    card.innerHTML = `
      <p class="category-pill">${escapeHtml(item.date)} · ${escapeHtml(categoryName(item.category))}</p>
      <p>${escapeHtml(item.affirmation)}</p>
      <p>${escapeHtml(item.text)}</p>
      <div class="result-actions"></div>
    `;
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.textContent = "Open";
    openButton.addEventListener("click", () => {
      const affirmation = appData.affirmations.find((entry) => entry.id === item.affirmationId);
      if (affirmation) {
        setAffirmation(affirmation, { skipBreath: true });
        elements.reflectionText.value = item.text;
        switchView("home");
      }
    });
    card.querySelector(".result-actions").append(openButton);
    elements.reflectionsList.append(card);
  });
}

function renderSearch() {
  const query = elements.affirmationSearch.value.trim().toLowerCase();
  const selected = getCheckedValues(elements.searchCategoryFilters);
  const categorySet = new Set(selected.length ? selected : Object.keys(appData.categories));
  const results = appData.affirmations
    .filter((item) => categorySet.has(item.category))
    .filter((item) => !query || item.text.toLowerCase().includes(query) || categoryName(item.category).toLowerCase().includes(query))
    .slice(0, 80);

  elements.searchResults.innerHTML = "";
  if (!results.length) {
    elements.searchResults.append(emptyMessage("No affirmations match this search."));
    return;
  }

  results.forEach((item) => {
    const card = resultCard(item);
    const useButton = document.createElement("button");
    useButton.type = "button";
    useButton.textContent = "Use this";
    useButton.addEventListener("click", () => {
      setAffirmation(item, { skipBreath: true });
      switchView("home");
    });
    card.querySelector(".result-actions").append(useButton);
    elements.searchResults.append(card);
  });
}

function resultCard(item) {
  const card = document.createElement("article");
  card.className = "result-card";
  card.innerHTML = `
    <p class="category-pill">${escapeHtml(categoryName(item.category))}</p>
    <p>${escapeHtml(item.text)}</p>
    <div class="result-actions"></div>
  `;
  return card;
}

function emptyMessage(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character];
  });
}

function renderCategoryControls() {
  const categoryEntries = Object.entries(appData.categories);
  elements.settingsCategoryFilters.innerHTML = "";
  elements.searchCategoryFilters.innerHTML = "";

  categoryEntries.forEach(([key, name]) => {
    elements.settingsCategoryFilters.append(categoryCheckbox(key, name, state.settings.categories.includes(key), "setting"));
    elements.searchCategoryFilters.append(categoryCheckbox(key, name, true, "search"));
  });
}

function categoryCheckbox(key, name, checked, group) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = key;
  input.checked = checked;
  input.dataset.group = group;
  label.append(input, document.createTextNode(name));
  return label;
}

function getCheckedValues(container) {
  return [...container.querySelectorAll("input:checked")].map((input) => input.value);
}

function syncSettingsForm() {
  elements.themeSelect.value = state.settings.theme;
  elements.textSizeRange.value = state.settings.textSize;
  elements.highContrastToggle.checked = state.settings.highContrast;
  elements.breatheToggle.checked = state.settings.breatheFirst;
  elements.readAloudToggle.checked = state.settings.readAloud;
  elements.reminderToggle.checked = state.settings.reminderEnabled;
  elements.reminderTime.value = state.settings.reminderTime;
}

function applySettings() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.documentElement.dataset.textSize = state.settings.textSize;
  document.documentElement.dataset.contrast = state.settings.highContrast ? "high" : "normal";
  elements.speakButton.hidden = !state.settings.readAloud;
  elements.stopSpeakButton.hidden = !state.settings.readAloud;
}

function updateSetting(key, value) {
  state.settings[key] = value;
  saveState();
  applySettings();
}

function speakAffirmation() {
  if (!currentAffirmation || !state.settings.readAloud) {
    setStatus("Read aloud is turned off in Settings.");
    return;
  }

  if (!("speechSynthesis" in window)) {
    setStatus("Speech synthesis is not available in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(currentAffirmation.text);
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    setStatus("Read aloud stopped.");
  }
}

function checkNotifications() {
  const unsupported = !("Notification" in window);
  if (unsupported) {
    elements.notificationMessage.textContent = "Notifications are not available in this browser or device.";
    return;
  }

  if (!window.isSecureContext) {
    elements.notificationMessage.textContent = "Notifications require a secure https address on phones. This local http test page cannot enable them.";
    return;
  }

  elements.notificationMessage.textContent = `Notification support is available. Current permission: ${Notification.permission}. This app stores your reminder preference, but browsers may not run daily reminders unless the app is opened or the platform supports scheduled notifications.`;
}

function clearLocalData() {
  const confirmed = window.confirm("Clear all Daily Affirmation favorites, reflections, settings, and feedback from this browser?");
  if (!confirmed) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultState);
  saveState();
  syncSettingsForm();
  applySettings();
  renderCategoryControls();
  setAffirmation(chooseAffirmation(true), { skipBreath: true });
  renderFavorites();
  renderReflections();
  renderSearch();
  setStatus("Local app data cleared.");
}

function switchView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    const isActive = view.id === `${viewName}View`;
    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    const isActive = button.dataset.view === viewName;
    button.classList.toggle("is-active", isActive);
  });

  if (viewName === "favorites") {
    renderFavorites();
  }
  if (viewName === "reflections") {
    renderReflections();
  }
  if (viewName === "search") {
    renderSearch();
  }
}

function setDateAndGreeting() {
  const now = new Date();
  elements.todayLabel.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);

  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  elements.greetingText.textContent = `${greeting}. Take what helps and leave the rest.`;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register(serviceWorkerPath).catch(() => {
      setStatus("Offline mode was not available in this browser.");
    });
  });
}

function bindEvents() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  elements.revealButton.addEventListener("click", revealAffirmation);
  elements.newAffirmationButton.addEventListener("click", () => setAffirmation(chooseAffirmation(false)));
  elements.copyButton.addEventListener("click", copyAffirmation);
  elements.favoriteButton.addEventListener("click", () => toggleFavorite());
  elements.speakButton.addEventListener("click", speakAffirmation);
  elements.stopSpeakButton.addEventListener("click", stopSpeech);
  elements.reflectionText.addEventListener("input", saveCurrentReflection);
  elements.favoriteSearch.addEventListener("input", renderFavorites);
  elements.reflectionSearch.addEventListener("input", renderReflections);
  elements.affirmationSearch.addEventListener("input", renderSearch);
  elements.searchCategoryFilters.addEventListener("change", renderSearch);

  document.querySelectorAll("[data-feedback]").forEach((button) => {
    button.addEventListener("click", () => saveFeedback(button.dataset.feedback));
  });

  elements.themeSelect.addEventListener("change", () => updateSetting("theme", elements.themeSelect.value));
  elements.textSizeRange.addEventListener("input", () => updateSetting("textSize", elements.textSizeRange.value));
  elements.highContrastToggle.addEventListener("change", () => updateSetting("highContrast", elements.highContrastToggle.checked));
  elements.breatheToggle.addEventListener("change", () => updateSetting("breatheFirst", elements.breatheToggle.checked));
  elements.readAloudToggle.addEventListener("change", () => updateSetting("readAloud", elements.readAloudToggle.checked));
  elements.reminderToggle.addEventListener("change", () => updateSetting("reminderEnabled", elements.reminderToggle.checked));
  elements.reminderTime.addEventListener("change", () => updateSetting("reminderTime", elements.reminderTime.value || "09:00"));
  elements.checkNotificationsButton.addEventListener("click", checkNotifications);
  elements.clearDataButton.addEventListener("click", clearLocalData);
  elements.themeQuickButton.addEventListener("click", () => {
    const nextTheme = state.settings.theme === "dark" ? "light" : "dark";
    updateSetting("theme", nextTheme);
    syncSettingsForm();
  });

  elements.settingsCategoryFilters.addEventListener("change", () => {
    const selected = getCheckedValues(elements.settingsCategoryFilters);
    if (!selected.length) {
      setStatus("Choose at least one category.");
      renderCategoryControls();
      return;
    }
    state.settings.categories = selected;
    saveState();
    setAffirmation(chooseAffirmation(true));
  });
}

async function startApp() {
  setDateAndGreeting();
  applySettings();
  syncSettingsForm();
  bindEvents();

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error("Affirmation data not found.");
    }
    appData = await response.json();
    renderCategoryControls();
    setAffirmation(chooseAffirmation(true));
    renderFavorites();
    renderReflections();
    renderSearch();
  } catch {
    setStatus("Affirmation data could not be loaded.");
  }

  registerServiceWorker();
}

startApp();
