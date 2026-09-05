const ALZAREEN_AUTH_TOKEN = 'user_token';

export { ALZAREEN_AUTH_TOKEN };

/**
 * Reads the stored { token, user, profile } object saved after a
 * successful /api/accounts/quick-apply/ call. Returns null if nothing
 * is stored yet, localStorage isn't available (SSR), or the stored
 * value is corrupted.
 */
export function getStoredAuth() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(ALZAREEN_AUTH_TOKEN);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Saves { token, user, profile } (the shape returned by quick-apply)
 * to localStorage, so a returning visitor is recognized without
 * filling the lead form in again.
 */
export function storeAuth({ token, user, profile }) {
  console.log("token", token);
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ALZAREEN_AUTH_TOKEN, JSON.stringify({ token, user, profile }));
}

/**
 * Clears stored auth -- call this on logout, or let api.js's 401
 * interceptor call it automatically when a token turns out to be invalid.
 */
export function clearStoredAuth() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ALZAREEN_AUTH_TOKEN);
}

/** True if a visitor has previously submitted the lead form / quick-applied. */
export function isAuthenticated() {
  return !!getStoredAuth()?.token;
}
