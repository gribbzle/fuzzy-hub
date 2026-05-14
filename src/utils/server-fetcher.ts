import { cookies } from "next/headers";

import {
  API_BASE_URL,
  AUTH_CURRENT_PROFILE_ID_COOKIE_NAME,
  AUTH_TOKEN_COOKIE_NAME,
} from "@constants";

/**
 * Server-only fetch to the API with optional Bearer token from the request cookie.
 * Use from Server Actions / Route Handlers — not from client components.
 */
export async function serverFetcher<TResponse>(
  url: string,
  init?: RequestInit,
): Promise<TResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_NAME)?.value;
  const profileId = cookieStore.get(AUTH_CURRENT_PROFILE_ID_COOKIE_NAME)?.value;

  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (profileId) {
    headers.set("X-Profile-Id", profileId);
  }

  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw Object.assign(
      new Error(
        (error as { data?: { message?: string } }).data?.message ??
          "Request failed",
      ),
      {
        status: response.status,
        info: error,
      },
    );
  }

  return response.json();
}
