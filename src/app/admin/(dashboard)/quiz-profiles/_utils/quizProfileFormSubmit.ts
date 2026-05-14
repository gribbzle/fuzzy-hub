import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

export interface QuizProfileFormValues {
  name: string;
}

export type SubmitQuizProfileFormResult =
  | { ok: true; createdPublicId?: string }
  | { ok: false };

export async function submitQuizProfileFormRequest(options: {
  mode: "create" | "edit";
  quizProfileId?: string;
  values: QuizProfileFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<SubmitQuizProfileFormResult> {
  const { mode, quizProfileId, values, setSubmitError } = options;
  setSubmitError(null);

  const path =
    mode === "create"
      ? "/admin/quiz-profiles"
      : `/admin/quiz-profiles/${encodeURIComponent(quizProfileId ?? "")}`;
  const method = mode === "create" ? "POST" : "PATCH";
  const fallbackErrorMessage =
    mode === "create"
      ? "Failed to create quiz profile"
      : "Failed to save quiz profile";

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeadersForClient(),
      },
      body: JSON.stringify({
        name: values.name.trim(),
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

  if (mode === "create") {
    const json = (await response.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    const data = json?.data as { public_id?: string } | undefined;
    const createdPublicId =
      typeof data?.public_id === "string" ? data.public_id : undefined;
    return { ok: true, createdPublicId };
  }

  return { ok: true };
}
