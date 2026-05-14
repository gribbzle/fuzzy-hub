import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";
import type { FieldPath, UseFormSetError } from "react-hook-form";

export interface CategoryFormValues {
  catalog_id: string;
  name: string;
  slug: string;
  image: File | null;
  description: string;
}

export interface CategoryMetadataFormValues {
  name: string;
  slug: string;
  image: File | null;
  description: string;
}

const CATEGORY_CREATE_FIELD_KEYS = new Set<keyof CategoryFormValues>([
  "catalog_id",
  "name",
  "slug",
  "image",
  "description",
]);

const CATEGORY_METADATA_FIELD_KEYS = new Set<keyof CategoryMetadataFormValues>([
  "name",
  "slug",
  "image",
  "description",
]);

function parseApiFieldErrors<TFieldKey extends string>(
  errorBody: Record<string, unknown>,
  knownFieldKeys: Set<TFieldKey>,
): {
  fieldErrors: Partial<Record<TFieldKey, string>>;
  unknownLines: string[];
} {
  const fieldErrors: Partial<Record<TFieldKey, string>> = {};
  const unknownLines: string[] = [];

  const data = errorBody.data;
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { fieldErrors, unknownLines };
  }

  const obj = data as Record<string, unknown>;
  for (const [key, val] of Object.entries(obj)) {
    if (key === "message") {
      continue;
    }

    let message = "";
    if (Array.isArray(val)) {
      const messages = val.filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0,
      );
      message = messages.map((item) => item.trim()).join(" ");
    } else if (typeof val === "string" && val.trim().length > 0) {
      message = val.trim();
    }

    if (message === "") {
      continue;
    }

    if (knownFieldKeys.has(key as TFieldKey)) {
      fieldErrors[key as TFieldKey] = message;
    } else {
      unknownLines.push(`${key}: ${message}`);
    }
  }

  return { fieldErrors, unknownLines };
}

function collectMessagesFromDataObject(
  dataObj: Record<string, unknown>,
): string[] {
  const out: string[] = [];
  for (const val of Object.values(dataObj)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        if (typeof item === "string" && item.trim().length > 0) {
          out.push(item.trim());
        }
      }
    } else if (typeof val === "string" && val.trim().length > 0) {
      out.push(val.trim());
    }
  }
  return out;
}

function getCategorySubmitErrorMessage(
  errorBody: Record<string, unknown>,
  fallback: string,
): string {
  const data = errorBody.data;

  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    const fieldMessages = collectMessagesFromDataObject(obj);
    if (fieldMessages.length > 0) {
      return fieldMessages.join(" ");
    }

    const nestedMessage = obj.message;
    if (typeof nestedMessage === "string" && nestedMessage.trim().length > 0) {
      return nestedMessage.trim();
    }
  }

  if (typeof data === "string" && data.trim().length > 0) {
    return data.trim();
  }

  const topMessage = errorBody.message;
  if (typeof topMessage === "string" && topMessage.trim().length > 0) {
    return topMessage.trim();
  }

  return fallback;
}

export type SubmitCategoryCreateResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors?: Partial<Record<keyof CategoryFormValues, string>>;
      submitMessage?: string | null;
    };

export async function submitCategoryCreateRequest(options: {
  values: CategoryFormValues;
}): Promise<SubmitCategoryCreateResult> {
  const { values } = options;
  const fallbackErrorMessage = "Failed to create category";
  const path = "/admin/categories";
  const catalogPublicId = values.catalog_id.trim();

  if (catalogPublicId === "") {
    return { ok: false, fieldErrors: { catalog_id: "Catalog is required." } };
  }

  let response: Response;
  const formData = new FormData();
  formData.append("catalog_id", catalogPublicId);
  formData.append("name", values.name.trim());
  formData.append("slug", values.slug.trim());
  formData.append("description", values.description.trim());
  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...getAuthHeadersForClient(),
      },
      body: formData,
    });
  } catch {
    return { ok: false, submitMessage: fallbackErrorMessage };
  }

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, path)) {
      return { ok: false };
    }

    const rawText = await response.text();
    let error: Record<string, unknown> = {};
    if (rawText.trim() !== "") {
      try {
        error = JSON.parse(rawText) as Record<string, unknown>;
      } catch {
        return {
          ok: false,
          submitMessage:
            rawText.length <= 280 ? rawText.trim() : fallbackErrorMessage,
        };
      }
    }

    const { fieldErrors, unknownLines } = parseApiFieldErrors(
      error,
      CATEGORY_CREATE_FIELD_KEYS,
    );
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const hasUnknown = unknownLines.length > 0;
    if (hasFieldErrors || hasUnknown) {
      return {
        ok: false,
        fieldErrors: hasFieldErrors ? fieldErrors : undefined,
        submitMessage: hasUnknown ? unknownLines.join("\n") : undefined,
      };
    }

    return {
      ok: false,
      submitMessage: getCategorySubmitErrorMessage(error, fallbackErrorMessage),
    };
  }

  return { ok: true };
}

export type SubmitCategoryPatchResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors?: Partial<Record<keyof CategoryMetadataFormValues, string>>;
      submitMessage?: string | null;
    };

export async function submitCategoryPatchRequest(options: {
  categoryId: string;
  values: CategoryMetadataFormValues;
}): Promise<SubmitCategoryPatchResult> {
  const { categoryId, values } = options;

  const fallbackErrorMessage = "Failed to update category";
  const path = `/admin/categories/${encodeURIComponent(categoryId)}`;

  let response: Response;
  const formData = new FormData();
  formData.append("name", values.name.trim());
  formData.append("slug", values.slug.trim());
  formData.append("description", values.description.trim());
  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        ...getAuthHeadersForClient(),
      },
      body: formData,
    });
  } catch {
    return { ok: false, submitMessage: fallbackErrorMessage };
  }

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, path)) {
      return { ok: false };
    }

    const rawText = await response.text();
    let error: Record<string, unknown> = {};
    if (rawText.trim() !== "") {
      try {
        error = JSON.parse(rawText) as Record<string, unknown>;
      } catch {
        return {
          ok: false,
          submitMessage:
            rawText.length <= 280 ? rawText.trim() : fallbackErrorMessage,
        };
      }
    }

    const { fieldErrors, unknownLines } = parseApiFieldErrors(
      error,
      CATEGORY_METADATA_FIELD_KEYS,
    );
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const hasUnknown = unknownLines.length > 0;
    if (hasFieldErrors || hasUnknown) {
      return {
        ok: false,
        fieldErrors: hasFieldErrors ? fieldErrors : undefined,
        submitMessage: hasUnknown ? unknownLines.join("\n") : undefined,
      };
    }

    return {
      ok: false,
      submitMessage: getCategorySubmitErrorMessage(error, fallbackErrorMessage),
    };
  }

  return { ok: true };
}

export function applyCategoryCreateFailedSubmit(
  result: {
    fieldErrors?: Partial<Record<keyof CategoryFormValues, string>>;
    submitMessage?: string | null;
  },
  options: {
    setError: UseFormSetError<CategoryFormValues>;
    setSubmitError: (value: string | null) => void;
    notifyError: (message: string) => void;
    genericFieldErrorsMessage: string;
  },
): void {
  const { setError, setSubmitError, notifyError, genericFieldErrorsMessage } =
    options;
  if (result.fieldErrors) {
    for (const [key, message] of Object.entries(result.fieldErrors)) {
      if (typeof message === "string" && message !== "") {
        setError(key as FieldPath<CategoryFormValues>, {
          type: "server",
          message,
        });
      }
    }
  }

  if (result.submitMessage != null && result.submitMessage !== "") {
    setSubmitError(result.submitMessage);
    notifyError(result.submitMessage);
  } else if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
    notifyError(genericFieldErrorsMessage);
  }
}

export function applyCategoryPatchFailedSubmit(
  result: {
    fieldErrors?: Partial<Record<keyof CategoryMetadataFormValues, string>>;
    submitMessage?: string | null;
  },
  options: {
    setError: UseFormSetError<CategoryMetadataFormValues>;
    setSubmitError: (value: string | null) => void;
    notifyError: (message: string) => void;
    genericFieldErrorsMessage: string;
  },
): void {
  const { setError, setSubmitError, notifyError, genericFieldErrorsMessage } =
    options;
  if (result.fieldErrors) {
    for (const [key, message] of Object.entries(result.fieldErrors)) {
      if (typeof message === "string" && message !== "") {
        setError(key as FieldPath<CategoryMetadataFormValues>, {
          type: "server",
          message,
        });
      }
    }
  }

  if (result.submitMessage != null && result.submitMessage !== "") {
    setSubmitError(result.submitMessage);
    notifyError(result.submitMessage);
  } else if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
    notifyError(genericFieldErrorsMessage);
  }
}
