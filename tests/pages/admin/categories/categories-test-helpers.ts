/** Paths under `/api/v1/admin/categories/...`. */
export type AdminCategoryApiPath =
  | { kind: "collection" }
  | { kind: "item"; id: string }
  | {
      kind: "category_characteristics";
      categoryId: string;
    }
  | {
      kind: "category_characteristic_item";
      categoryId: string;
      characteristicId: string;
    }
  | { kind: "other" };

export function parseAdminCategoryApiPath(
  pathname: string,
): AdminCategoryApiPath {
  const segments = pathname.split("/").filter(Boolean);
  if (
    segments.length < 4 ||
    segments[0] !== "api" ||
    segments[1] !== "v1" ||
    segments[2] !== "admin" ||
    segments[3] !== "categories"
  ) {
    return { kind: "other" };
  }

  if (segments.length === 4) {
    return { kind: "collection" };
  }

  if (segments.length === 5) {
    return { kind: "item", id: decodeURIComponent(segments[4] ?? "") };
  }

  if (
    segments.length === 6 &&
    segments[5] === "characteristics" &&
    segments[4] !== undefined
  ) {
    return {
      kind: "category_characteristics",
      categoryId: decodeURIComponent(segments[4]),
    };
  }

  if (
    segments.length === 7 &&
    segments[5] === "characteristics" &&
    segments[4] !== undefined &&
    segments[6] !== undefined
  ) {
    return {
      kind: "category_characteristic_item",
      categoryId: decodeURIComponent(segments[4]),
      characteristicId: decodeURIComponent(segments[6]),
    };
  }

  return { kind: "other" };
}
