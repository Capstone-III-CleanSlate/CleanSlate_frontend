const TOKEN_KEY = "sessionToken";

const chromeStorage = globalThis.chrome?.storage?.local;

export async function getSessionToken() {
  if (!chromeStorage) {
    return null;
  }

  const stored = await chromeStorage.get(TOKEN_KEY);
  return stored[TOKEN_KEY] ?? null;
}

export async function clearSessionToken() {
  if (chromeStorage) {
    await chromeStorage.remove(TOKEN_KEY);
  }
}

export async function getAuthHeaders() {
  const token = await getSessionToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
