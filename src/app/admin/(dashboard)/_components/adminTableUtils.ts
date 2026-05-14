export const DEFAULT_ADMIN_TABLE_LIMIT = 10;
export const ADMIN_TABLE_LIMIT_OPTIONS = [10, 20, 50] as const;
export const ADMIN_ROW_ACTIONS_MENU_GAP_PX = 8;

/** Primary CTA (Add / header actions) — shared across admin list shells and links */
export const ADMIN_PRIMARY_BUTTON_CLASS =
  "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2";

export function formatJsonPreview(data: Record<string, unknown>): string {
  try {
    const text = JSON.stringify(data);
    return text.length > 160 ? `${text.slice(0, 160)}...` : text;
  } catch {
    return "-";
  }
}

export function formatAdminTableOptionalString(
  value: string | null | undefined,
): string {
  const trimmed = value?.trim();
  if (trimmed) {
    return trimmed;
  }
  return "—";
}

export function formatAdminCatalogDisplayName(params: {
  name?: string | null;
  catalogId: number | string;
}): string {
  const trimmed = params.name?.trim();
  if (trimmed) {
    return trimmed;
  }
  return `Catalog #${params.catalogId}`;
}

export function formatAdminTableDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function getAdminPaginationSummary(
  total: number,
  rangeStart: number,
  rangeEnd: number,
  isLoading: boolean,
): string {
  if (total > 0) {
    return `Showing ${rangeStart}-${rangeEnd} of ${total}`;
  }
  if (isLoading) {
    return "Loading...";
  }
  return "No results";
}
