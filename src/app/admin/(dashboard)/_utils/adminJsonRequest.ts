import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

export type AdminJsonRequestResult =
  | { ok: true }
  | { ok: false; kind: "unauthorized" }
  | { ok: false; kind: "error"; message: string };

function mapBooleanFlags(value: unknown): unknown {
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (Array.isArray(value)) {
    return value.map((item) => mapBooleanFlags(item));
  }

  if (value !== null && typeof value === "object") {
    const source = value as Record<string, unknown>;
    const mapped: Record<string, unknown> = {};
    for (const [key, nestedValue] of Object.entries(source)) {
      mapped[key] = mapBooleanFlags(nestedValue);
    }
    return mapped;
  }

  return value;
}

/**
 * Authenticated JSON request to the admin API (POST/PATCH with body, or DELETE).
 */
export async function adminJsonRequest(options: {
  path: string;
  method: "POST" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  networkErrorMessage: string;
  httpErrorFallback: string;
}): Promise<AdminJsonRequestResult> {
  const { path, method, body, networkErrorMessage, httpErrorFallback } =
    options;
  const serializedBody =
    method !== "DELETE" && body !== undefined
      ? (mapBooleanFlags(body) as Record<string, unknown>)
      : undefined;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...(method !== "DELETE" ? { "Content-Type": "application/json" } : {}),
        ...getAuthHeadersForClient(),
      },
      ...(serializedBody !== undefined
        ? { body: JSON.stringify(serializedBody) }
        : {}),
    });
  } catch {
    return { ok: false, kind: "error", message: networkErrorMessage };
  }

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, path)) {
      return { ok: false, kind: "unauthorized" };
    }
    const error = await response.json().catch(() => ({}));
    return {
      ok: false,
      kind: "error",
      message: getResponseErrorMessage(error, httpErrorFallback),
    };
  }

  return { ok: true };
}
