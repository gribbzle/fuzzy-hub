import {
  categoryCharacteristicCreateFormSchema,
  categoryCharacteristicEditFormSchema,
} from "./categoryCharacteristicFormSchemas";
import type {
  CategoryCharacteristicFormErrors,
  CategoryCharacteristicFormValues,
} from "./categoryCharacteristicFormTypes";

/**
 * Form-only validation (not API response parsing).
 * Prefer `categoryCharacteristicCreateFormSchema` / `categoryCharacteristicEditFormSchema` with RHF.
 */
export function validateCategoryCharacteristicForm(
  form: CategoryCharacteristicFormValues,
  mode: "create" | "edit",
): CategoryCharacteristicFormErrors {
  const schema =
    mode === "create"
      ? categoryCharacteristicCreateFormSchema
      : categoryCharacteristicEditFormSchema;
  const result = schema.safeParse(form);
  if (result.success) {
    return {};
  }

  const out: CategoryCharacteristicFormErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key === "characteristic_id" || key === "order") {
      if (out[key] === undefined) {
        out[key] = issue.message;
      }
    }
  }
  return out;
}
