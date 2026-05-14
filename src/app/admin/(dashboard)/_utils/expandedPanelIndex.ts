/**
 * When the user removes the currently expanded item in a list (accordion/collapse UI),
 * returns the index that should stay open, or null if nothing should be expanded.
 */
export function expandedIndexAfterRemovingExpandedItem(
  removedIndex: number,
  itemCountBeforeRemove: number,
): number | null {
  if (removedIndex > 0) {
    return removedIndex - 1;
  }
  if (itemCountBeforeRemove > 1) {
    return 0;
  }
  return null;
}
