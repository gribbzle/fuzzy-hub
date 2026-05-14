import type { UserProfile } from "@admin/models";
import {
  AUTH_CURRENT_PROFILE_ID_COOKIE_NAME,
  AUTH_PROFILES_COOKIE_NAME,
  AUTH_TOKEN_COOKIE_MAX_AGE_SECONDS,
  AUTH_TOKEN_COOKIE_NAME,
} from "@constants";

function secureCookieSuffix(): string {
  if (typeof window === "undefined") {
    return "; Secure";
  }
  return window.location.protocol === "https:" ? "; Secure" : "";
}

export function setAuthTokenCookie(token: string): void {
  if (typeof document === "undefined") {
    return;
  }
  const value = encodeURIComponent(token);
  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${value}; Path=/; Max-Age=${AUTH_TOKEN_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secureCookieSuffix()}`;
}

export function clearAuthTokenCookie(): void {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0${secureCookieSuffix()}`;
}

export function setProfilesCookie(profiles: UserProfile[]): void {
  if (typeof document === "undefined") {
    return;
  }
  const value = encodeURIComponent(JSON.stringify(profiles));
  document.cookie = `${AUTH_PROFILES_COOKIE_NAME}=${value}; Path=/; Max-Age=${AUTH_TOKEN_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secureCookieSuffix()}`;
}

export function clearProfilesCookie(): void {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${AUTH_PROFILES_COOKIE_NAME}=; Path=/; Max-Age=0${secureCookieSuffix()}`;
}

export function setCurrentProfileIdCookie(publicId: string): void {
  if (typeof document === "undefined") {
    return;
  }
  const value = encodeURIComponent(publicId);
  document.cookie = `${AUTH_CURRENT_PROFILE_ID_COOKIE_NAME}=${value}; Path=/; Max-Age=${AUTH_TOKEN_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secureCookieSuffix()}`;
}

export function clearCurrentProfileIdCookie(): void {
  if (typeof document === "undefined") {
    return;
  }
  document.cookie = `${AUTH_CURRENT_PROFILE_ID_COOKIE_NAME}=; Path=/; Max-Age=0${secureCookieSuffix()}`;
}

/** Clears token, profiles, and current profile cookies used for API authorization. */
export function clearAllAuthCookies(): void {
  clearAuthTokenCookie();
  clearProfilesCookie();
  clearCurrentProfileIdCookie();
}

function getCookieValueByName(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  if (!match?.[1]) {
    return null;
  }
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

export function getAuthTokenFromCookie(): string | null {
  return getCookieValueByName(AUTH_TOKEN_COOKIE_NAME);
}

export function getCurrentProfileIdFromCookie(): string | null {
  return getCookieValueByName(AUTH_CURRENT_PROFILE_ID_COOKIE_NAME);
}

export function getAuthHeadersForClient(): Record<string, string> {
  const headers: Record<string, string> = {};
  const token = getAuthTokenFromCookie();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const profileId = getCurrentProfileIdFromCookie();
  if (profileId) {
    headers["X-Profile-Id"] = profileId;
  }
  return headers;
}
