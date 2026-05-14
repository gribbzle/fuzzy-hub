import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

export interface DictionaryFormValues {
  name: string;
  slug: string;
  description: string;
}

export async function submitDictionaryPatchRequest(options: {
  dictionaryId: string;
  values: DictionaryFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<boolean> {
  const { dictionaryId, values, setSubmitError } = options;
  setSubmitError(null);

  const path = `/admin/dictionaries/${encodeURIComponent(dictionaryId)}`;
  const fallbackErrorMessage = "Failed to save dictionary";

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
        name: values.name.trim(),
        slug: values.slug.trim(),
        description: values.description.trim(),
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

export type SubmitDictionaryCreateResult =
  | { ok: true; createdPublicId: string }
  | { ok: false };

export async function submitDictionaryCreateRequest(options: {
  values: DictionaryFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<SubmitDictionaryCreateResult> {
  const { values, setSubmitError } = options;
  setSubmitError(null);

  const fallbackErrorMessage = "Failed to create dictionary";
  const path = "/admin/dictionaries";

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
        name: values.name.trim(),
        slug: values.slug.trim(),
        description: values.description.trim(),
      }),
    });
  } catch {
    setSubmitError(fallbackErrorMessage);
    return { ok: false };
  }

  if (!response.ok) {
    if (redirectAdminOnUnauthorized(response, path)) {
      return { ok: false };
    }
    const error = await response.json().catch(() => ({}));
    setSubmitError(getResponseErrorMessage(error, fallbackErrorMessage));
    return { ok: false };
  }

  const json = (await response.json().catch(() => ({}))) as Record<
    string,
    unknown
  >;
  const data = json?.data as { public_id?: string } | undefined;
  const publicId =
    typeof data?.public_id === "string" ? data.public_id : undefined;

  if (publicId == null || publicId === "") {
    setSubmitError(fallbackErrorMessage);
    return { ok: false };
  }

  return { ok: true, createdPublicId: publicId };
}
