import { API_URL } from "@/config/api";

const TOKEN_KEY = "token";
const EMAIL_KEY = "authEmail";

export function startGoogleOAuth() {
  if (typeof window === "undefined") return;
  window.location.href = `${API_URL}/auth/google`;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getAuthEmail() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(EMAIL_KEY) || "";
}

export function persistSession(token, email) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TOKEN_KEY, token);
  if (email) sessionStorage.setItem(EMAIL_KEY, email);
}

export function clearSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EMAIL_KEY);
}

export function consumeAuthFromUrl() {
  if (typeof window === "undefined") return null;

  const url = new URL(window.location.href);
  const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
  const token = url.searchParams.get("token") || hashParams.get("token");
  const email = url.searchParams.get("email") || hashParams.get("email");

  if (!token) return null;

  persistSession(token, email);
  url.searchParams.delete("token");
  url.searchParams.delete("email");
  url.hash = "";
  window.history.replaceState({}, "", `${url.pathname}${url.search}`);

  return { token, email: email || "" };
}
