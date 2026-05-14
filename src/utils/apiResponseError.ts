/**
 * Parses common API error JSON shapes (e.g. `{ data: { message } }`).
 */
export function getResponseErrorMessage(
  errorBody: unknown,
  fallback: string,
): string {
  if (typeof errorBody !== "object" || !errorBody) {
    return fallback;
  }

  const data = (errorBody as { data?: unknown }).data;
  if (typeof data !== "object" || !data) {
    return fallback;
  }

  const message = (data as { message?: unknown }).message;
  return typeof message === "string" && message.length > 0 ? message : fallback;
}
