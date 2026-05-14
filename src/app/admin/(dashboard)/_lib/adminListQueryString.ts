/**
 * Shared `page` / `limit` query string helpers for SWR list hooks.
 * Optional string params are only added when non-empty after trim.
 */

export function canAdminListFetch(page: number, limit: number): boolean {
  return page >= 1 && limit >= 1;
}

export function isNonEmptyStringId(
  id: string | null | undefined,
): id is string {
  return id != null && id !== "";
}

/**
 * `page` and `limit` plus optional query keys (trimmed; omitted when empty).
 */
export function buildAdminListQueryString(
  page: number,
  limit: number,
  optionalKeyValues?: Readonly<Record<string, string | undefined>>,
): string {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (optionalKeyValues) {
    for (const [k, v] of Object.entries(optionalKeyValues)) {
      const trimmed = v?.trim() ?? "";
      if (trimmed !== "") {
        params.set(k, trimmed);
      }
    }
  }
  return params.toString();
}
