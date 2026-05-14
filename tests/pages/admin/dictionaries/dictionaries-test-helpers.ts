/** Paths under `/api/v1/admin/dictionaries/...` including dictionary items. */
export type AdminDictionaryApiPath =
  | { kind: "collection" }
  | { kind: "dictionary"; id: string }
  | { kind: "items"; dictionaryId: string }
  | { kind: "item"; dictionaryId: string; itemId: string }
  | { kind: "other" };

export function parseAdminDictionaryApiPath(
  pathname: string,
): AdminDictionaryApiPath {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length < 4 ||
    segments[0] !== "api" ||
    segments[1] !== "v1" ||
    segments[2] !== "admin" ||
    segments[3] !== "dictionaries"
  ) {
    return { kind: "other" };
  }

  if (segments.length === 4) {
    return { kind: "collection" };
  }

  const dictionaryId = decodeURIComponent(segments[4] ?? "");

  if (segments.length === 5) {
    return { kind: "dictionary", id: dictionaryId };
  }

  if (segments.length === 6 && segments[5] === "dictionary-items") {
    return { kind: "items", dictionaryId };
  }

  if (segments.length === 7 && segments[5] === "dictionary-items") {
    return {
      kind: "item",
      dictionaryId,
      itemId: decodeURIComponent(segments[6] ?? ""),
    };
  }

  return { kind: "other" };
}
