create or replace function public.replace_encrypted_journal_backup(
  p_reflections jsonb,
  p_key jsonb
)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_expected_count integer := 0;
  v_replaced_count integer := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if jsonb_typeof(p_reflections) is distinct from 'array' then
    raise exception 'Reflections payload must be an array';
  end if;

  if p_key is null or jsonb_typeof(p_key) is distinct from 'object' then
    raise exception 'Journal key payload is required';
  end if;

  if p_key ->> 'key_version' is null
    or p_key ->> 'wrapped_journal_key' is null
    or btrim(p_key ->> 'wrapped_journal_key') = ''
    or p_key ->> 'wrapping_iv' is null
    or btrim(p_key ->> 'wrapping_iv') = ''
    or p_key ->> 'kdf_salt' is null
    or btrim(p_key ->> 'kdf_salt') = ''
    or p_key ->> 'kdf_iterations' is null
    or (p_key ->> 'kdf_iterations')::integer <= 0
    or p_key ->> 'kdf_hash' is null
    or btrim(p_key ->> 'kdf_hash') = ''
    or p_key ->> 'kdf_algorithm' is null
    or btrim(p_key ->> 'kdf_algorithm') = ''
    or p_key ->> 'wrapping_algorithm' is null
    or btrim(p_key ->> 'wrapping_algorithm') = ''
  then
    raise exception 'Journal key payload is missing required wrapped-key metadata';
  end if;

  select count(*)
  into v_expected_count
  from jsonb_array_elements(p_reflections);

  if exists (
    select 1
    from jsonb_to_recordset(p_reflections) as row_data(
      id text,
      date date,
      reflection_ciphertext text,
      reflection_iv text
    )
    where row_data.id is null
      or btrim(row_data.id) = ''
      or row_data.date is null
      or row_data.reflection_ciphertext is null
      or btrim(row_data.reflection_ciphertext) = ''
      or row_data.reflection_iv is null
      or btrim(row_data.reflection_iv) = ''
  ) then
    raise exception 'Every reflection row must include id, date, ciphertext, and iv';
  end if;

  delete from public.reflections
  where user_id = v_user_id;

  insert into public.reflections (
    user_id,
    id,
    date,
    affirmation_id,
    category,
    affirmation,
    reflection_text,
    reflection_ciphertext,
    reflection_iv,
    encryption_version,
    updated_at
  )
  select
    v_user_id,
    row_data.id,
    row_data.date,
    coalesce(row_data.affirmation_id, ''),
    coalesce(row_data.category, ''),
    coalesce(row_data.affirmation, ''),
    null,
    row_data.reflection_ciphertext,
    row_data.reflection_iv,
    row_data.encryption_version,
    coalesce(row_data.updated_at, now())
  from jsonb_to_recordset(p_reflections) as row_data(
    id text,
    date date,
    affirmation_id text,
    category text,
    affirmation text,
    reflection_ciphertext text,
    reflection_iv text,
    encryption_version integer,
    updated_at timestamptz
  );

  get diagnostics v_replaced_count = row_count;

  if v_replaced_count <> v_expected_count then
    raise exception 'Reflection replacement count mismatch: expected %, inserted %',
      v_expected_count,
      v_replaced_count;
  end if;

  insert into public.journal_encryption_keys (
    user_id,
    key_version,
    wrapped_journal_key,
    wrapping_iv,
    kdf_salt,
    kdf_iterations,
    kdf_hash,
    kdf_algorithm,
    wrapping_algorithm,
    updated_at
  )
  values (
    v_user_id,
    coalesce((p_key ->> 'key_version')::integer, 1),
    p_key ->> 'wrapped_journal_key',
    p_key ->> 'wrapping_iv',
    p_key ->> 'kdf_salt',
    coalesce((p_key ->> 'kdf_iterations')::integer, 310000),
    coalesce(p_key ->> 'kdf_hash', 'SHA-256'),
    coalesce(p_key ->> 'kdf_algorithm', 'PBKDF2'),
    coalesce(p_key ->> 'wrapping_algorithm', 'AES-GCM'),
    coalesce((p_key ->> 'updated_at')::timestamptz, now())
  )
  on conflict (user_id) do update set
    key_version = excluded.key_version,
    wrapped_journal_key = excluded.wrapped_journal_key,
    wrapping_iv = excluded.wrapping_iv,
    kdf_salt = excluded.kdf_salt,
    kdf_iterations = excluded.kdf_iterations,
    kdf_hash = excluded.kdf_hash,
    kdf_algorithm = excluded.kdf_algorithm,
    wrapping_algorithm = excluded.wrapping_algorithm,
    updated_at = excluded.updated_at;

  return v_replaced_count;
end;
$$;

revoke all on function public.replace_encrypted_journal_backup(jsonb, jsonb) from public;
revoke all on function public.replace_encrypted_journal_backup(jsonb, jsonb) from anon;
grant execute on function public.replace_encrypted_journal_backup(jsonb, jsonb) to authenticated;
