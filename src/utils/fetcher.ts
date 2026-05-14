import { API_BASE_URL } from "@constants";

import { redirectAdminOnUnauthorized } from "./adminApiAuth";
import { getAuthHeadersForClient } from "./authCookie";

export async function fetcher<TResponse>(
  url: string,
  init?: RequestInit,
): Promise<TResponse> {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    ...getAuthHeadersForClient(),
  });

  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    ...init,
    headers,
  });

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, url)) {
      throw Object.assign(new Error("Unauthorized"), {
        status: response.status,
      });
    }

    const error = await response.json().catch(() => ({}));
    console.error(error);

    throw new Error(error.data.type);
  }

  return response.json();
}
