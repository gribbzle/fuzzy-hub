import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

export interface DictionaryItemFormValues {
  value: string;
  label: string;
  order: number;
}

export async function submitDictionaryItemCreateRequest(options: {
  dictionaryId: string;
  values: DictionaryItemFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<boolean> {
  const { dictionaryId, values, setSubmitError } = options;
  setSubmitError(null);

  const path = `/admin/dictionaries/${encodeURIComponent(
    dictionaryId,
  )}/dictionary-items`;
  const fallbackErrorMessage = "Failed to create dictionary item";

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeadersForClient(),
      },
      body: JSON.stringify({
        value: values.value.trim(),
        label: values.label.trim(),
        order: values.order,
      }),
    });
  } catch {
    setSubmitError(fallbackErrorMessage);
    return false;
  }

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, path)) {
      return false;
    }
    const error = await response.json().catch(() => ({}));
    setSubmitError(getResponseErrorMessage(error, fallbackErrorMessage));
    return false;
  }

  return true;
}

export async function submitDictionaryItemPatchRequest(options: {
  dictionaryId: string;
  itemId: string;
  values: DictionaryItemFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<boolean> {
  const { dictionaryId, itemId, values, setSubmitError } = options;
  setSubmitError(null);

  const path = `/admin/dictionaries/${encodeURIComponent(
    dictionaryId,
  )}/dictionary-items/${encodeURIComponent(itemId)}`;
  const fallbackErrorMessage = "Failed to save dictionary item";

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeadersForClient(),
      },
      body: JSON.stringify({
        value: values.value.trim(),
        label: values.label.trim(),
        order: values.order,
      }),
    });
  } catch {
    setSubmitError(fallbackErrorMessage);
    return false;
  }

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, path)) {
      return false;
    }
    const error = await response.json().catch(() => ({}));
    setSubmitError(getResponseErrorMessage(error, fallbackErrorMessage));
    return false;
  }

  return true;
}
