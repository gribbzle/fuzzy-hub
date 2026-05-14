import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";
import type { FieldPath, UseFormSetError } from "react-hook-form";

import type { CharacteristicFormValues } from "./characteristicFormTypes";

const CHARACTERISTIC_FORM_FIELD_KEYS = new Set<string>([
  "name",
  "slug",
  "type",
  "group",
  "description",
  "dictionary_id",
  "unit",
  "min",
  "max",
  "max_length",
]);

/**
 * ApiValidationException: data is { fieldName: string[] | string, ... }.
 * Maps known keys to field errors; other keys become lines for the general alert.
 */
function parseApiFieldErrors(errorBody: Record<string, unknown>): {
  fieldErrors: Record<string, string>;
  unknownLines: string[];
} {
  const fieldErrors: Record<string, string> = {};
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

    let msg = "";
    if (Array.isArray(val)) {
      const msgs = val.filter(
        (x): x is string => typeof x === "string" && x.trim().length > 0,
      );
      msg = msgs.map((m) => m.trim()).join(" ");
    } else if (typeof val === "string" && val.trim().length > 0) {
      msg = val.trim();
    }

    if (msg === "") {
      continue;
    }

    if (CHARACTERISTIC_FORM_FIELD_KEYS.has(key)) {
      fieldErrors[key] = msg;
    } else {
      unknownLines.push(`${key}: ${msg}`);
    }
  }

  return { fieldErrors, unknownLines };
}

/**
 * Non-validation API errors (single message, etc.).
 */
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

function getSubmitErrorMessage(
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

  const topError = errorBody.error;
  if (typeof topError === "string" && topError.trim().length > 0) {
    return topError.trim();
  }

  const errors = errorBody.errors;
  if (typeof errors === "object" && errors !== null && !Array.isArray(errors)) {
    const fromErrors = collectMessagesFromDataObject(
      errors as Record<string, unknown>,
    );
    if (fromErrors.length > 0) {
      return fromErrors.join(" ");
    }
  }

  return fallback;
}

function parseOptionalInt(raw: string): number | undefined {
  const t = raw.trim();
  if (t === "") {
    return undefined;
  }
  const n = Number.parseInt(t, 10);
  return Number.isFinite(n) ? n : undefined;
}

function parseDictionaryId(raw: string): number | string | undefined {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return undefined;
  }

  const parsedAsInt = Number.parseInt(trimmed, 10);
  if (
    Number.isFinite(parsedAsInt) &&
    parsedAsInt > 0 &&
    String(parsedAsInt) === trimmed
  ) {
    return parsedAsInt;
  }

  return trimmed;
}

function buildCreateBody(
  values: CharacteristicFormValues,
): Record<string, string | number> {
  const body: Record<string, string | number> = {
    name: values.name.trim(),
    slug: values.slug.trim(),
    type: values.type,
    group: values.group,
  };

  const description = values.description.trim();
  if (description !== "") {
    body.description = description;
  }

  const dictionaryId = parseDictionaryId(values.dictionary_id);
  if (dictionaryId != null) {
    body.dictionary_id = dictionaryId;
  }

  const unit = values.unit.trim();
  if (unit !== "") {
    body.unit = unit;
  }

  const min = parseOptionalInt(values.min);
  if (min != null) {
    body.min = min;
  }

  const max = parseOptionalInt(values.max);
  if (max != null) {
    body.max = max;
  }

  const maxLength = parseOptionalInt(values.max_length);
  if (maxLength != null) {
    body.max_length = maxLength;
  }

  return body;
}

export type SubmitCharacteristicCreateResult =
  | { ok: true; createdPublicId: string }
  | {
      ok: false;
      fieldErrors?: Record<string, string>;
      submitMessage?: string | null;
    };

export async function submitCharacteristicCreateRequest(options: {
  values: CharacteristicFormValues;
}): Promise<SubmitCharacteristicCreateResult> {
  const { values } = options;

  const fallbackErrorMessage = "Failed to create characteristic";
  const path = "/admin/characteristics";

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeadersForClient(),
      },
      body: JSON.stringify(buildCreateBody(values)),
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

    const { fieldErrors, unknownLines } = parseApiFieldErrors(error);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const hasUnknown = unknownLines.length > 0;

    if (hasFieldErrors || hasUnknown) {
      return {
        ok: false,
        fieldErrors: hasFieldErrors ? fieldErrors : undefined,
        submitMessage: hasUnknown ? unknownLines.join("\n") : undefined,
      };
    }

    const message = getSubmitErrorMessage(error, fallbackErrorMessage);
    const submitMessage =
      message === fallbackErrorMessage && response.statusText
        ? `${fallbackErrorMessage} (${response.status} ${response.statusText})`
        : message;
    return { ok: false, submitMessage };
  }

  const json = (await response.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  const data = json?.data as { public_id?: string } | undefined;
  const publicId =
    typeof data?.public_id === "string" ? data.public_id : undefined;

  if (publicId == null || publicId === "") {
    return { ok: false, submitMessage: fallbackErrorMessage };
  }

  return { ok: true, createdPublicId: publicId };
}

export type SubmitCharacteristicPatchResult =
  | { ok: true }
  | {
      ok: false;
      fieldErrors?: Record<string, string>;
      submitMessage?: string | null;
    };

export async function submitCharacteristicPatchRequest(options: {
  characteristicId: string;
  values: CharacteristicFormValues;
}): Promise<SubmitCharacteristicPatchResult> {
  const { characteristicId, values } = options;

  const fallbackErrorMessage = "Failed to update characteristic";
  const path = `/admin/characteristics/${encodeURIComponent(characteristicId)}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeadersForClient(),
      },
      body: JSON.stringify(buildCreateBody(values)),
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

    const { fieldErrors, unknownLines } = parseApiFieldErrors(error);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;
    const hasUnknown = unknownLines.length > 0;

    if (hasFieldErrors || hasUnknown) {
      return {
        ok: false,
        fieldErrors: hasFieldErrors ? fieldErrors : undefined,
        submitMessage: hasUnknown ? unknownLines.join("\n") : undefined,
      };
    }

    const message = getSubmitErrorMessage(error, fallbackErrorMessage);
    const submitMessage =
      message === fallbackErrorMessage && response.statusText
        ? `${fallbackErrorMessage} (${response.status} ${response.statusText})`
        : message;
    return { ok: false, submitMessage };
  }

  return { ok: true };
}

/**
 * Maps a failed create/patch result onto react-hook-form and toasts (shared by create + edit flows).
 */
export function applyCharacteristicFailedSubmit(
  result: {
    fieldErrors?: Record<string, string>;
    submitMessage?: string | null;
  },
  options: {
    setError: UseFormSetError<CharacteristicFormValues>;
    setSubmitError: (value: string | null) => void;
    notifyError: (message: string) => void;
    genericFieldErrorsMessage: string;
  },
): void {
  const { setError, setSubmitError, notifyError, genericFieldErrorsMessage } =
    options;
  if (result.fieldErrors) {
    for (const [key, message] of Object.entries(result.fieldErrors)) {
      setError(key as FieldPath<CharacteristicFormValues>, {
        type: "server",
        message,
      });
    }
  }
  if (result.submitMessage != null && result.submitMessage !== "") {
    setSubmitError(result.submitMessage);
    notifyError(result.submitMessage);
  } else if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
    notifyError(genericFieldErrorsMessage);
  }
}
