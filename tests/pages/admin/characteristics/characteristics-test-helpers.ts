/** Paths under `/api/v1/admin/characteristics/...`. */
export type AdminCharacteristicApiPath =
  | { kind: "collection" }
  | { kind: "item"; id: string }
  | { kind: "other" };

export function parseAdminCharacteristicApiPath(
  pathname: string,
): AdminCharacteristicApiPath {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length < 4 ||
    segments[0] !== "api" ||
    segments[1] !== "v1" ||
    segments[2] !== "admin" ||
    segments[3] !== "characteristics"
  ) {
    return { kind: "other" };
  }

  if (segments.length === 4) {
    return { kind: "collection" };
  }

  if (segments.length === 5) {
    return { kind: "item", id: decodeURIComponent(segments[4] ?? "") };
  }

  return { kind: "other" };
}
