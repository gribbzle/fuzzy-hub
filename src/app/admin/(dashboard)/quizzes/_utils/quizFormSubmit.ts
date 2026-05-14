import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

export interface QuizFormValues {
  name: string;
  status: string;
}

export async function submitQuizFormRequest(options: {
  mode: "create" | "edit";
  quizId?: string;
  values: QuizFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<boolean> {
  const { mode, quizId, values, setSubmitError } = options;
  setSubmitError(null);

  const path =
    mode === "create"
      ? "/admin/quizzes"
      : `/admin/quizzes/${encodeURIComponent(quizId ?? "")}`;
  const method = mode === "create" ? "POST" : "PATCH";
  const fallbackErrorMessage =
    mode === "create" ? "Failed to create quiz" : "Failed to save quiz";

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
        status: values.status,
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
