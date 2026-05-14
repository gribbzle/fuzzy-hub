import { adminJsonRequest } from "../../../_utils/adminJsonRequest";

export type CategoryCharacteristicJsonResult = Awaited<
  ReturnType<typeof adminJsonRequest>
>;

export function createCategoryCharacteristic(
  categoryId: string,
  body: {
    characteristic_id: string;
    order: number;
    is_required: boolean;
  },
): Promise<CategoryCharacteristicJsonResult> {
  return adminJsonRequest({
    path: `/admin/categories/${encodeURIComponent(categoryId)}/characteristics`,
    method: "POST",
    body,
    networkErrorMessage: "Failed to add characteristic.",
    httpErrorFallback: "Failed to add characteristic.",
  });
}

export function updateCategoryCharacteristic(
  categoryId: string,
  characteristicPublicId: string,
  body: { order: number; is_required: boolean },
): Promise<CategoryCharacteristicJsonResult> {
  return adminJsonRequest({
    path: `/admin/categories/${encodeURIComponent(categoryId)}/characteristics/${encodeURIComponent(characteristicPublicId)}`,
    method: "PATCH",
    body,
    networkErrorMessage: "Failed to update characteristic.",
    httpErrorFallback: "Failed to update characteristic.",
  });
}

export function deleteCategoryCharacteristic(
  categoryId: string,
  characteristicPublicId: string,
): Promise<CategoryCharacteristicJsonResult> {
  return adminJsonRequest({
    path: `/admin/categories/${encodeURIComponent(categoryId)}/characteristics/${encodeURIComponent(characteristicPublicId)}`,
    method: "DELETE",
    networkErrorMessage: "Failed to remove characteristic.",
    httpErrorFallback: "Failed to remove characteristic.",
  });
}
