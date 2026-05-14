import { clearAllAuthCookies } from "./authCookie";

export const ADMIN_LOGIN_PATH = "/admin/login";

function isAdminApiPath(path: string): boolean {
  const base = path.split("?")[0] ?? "";
  return base === "/admin" || base.startsWith("/admin/");
}

/**
 * Client-only. For `/admin/*` API responses with 401 or 403: clears auth cookies and redirects to admin login.
 * @returns true if redirect was started (caller should skip normal error handling).
 */
export function redirectAdminOnUnauthorized(
  response: Response,
  requestPath: string,
): boolean {
  if (response.status !== 401 && response.status !== 403) {
    return false;
  }
  if (!isAdminApiPath(requestPath)) {
    return false;
  }
  if (typeof window === "undefined") {
    return false;
  }
  clearAllAuthCookies();
  window.location.assign(ADMIN_LOGIN_PATH);
  return true;
}
