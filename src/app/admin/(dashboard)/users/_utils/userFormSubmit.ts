import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

export interface AdminUserFormValues {
  email: string;
  password: string;
}

export async function submitAdminUserPatchRequest(options: {
  userId: string;
  values: AdminUserFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<boolean> {
  const { userId, values, setSubmitError } = options;
  setSubmitError(null);

  const path = `/admin/users/${encodeURIComponent(userId)}`;
  const fallbackErrorMessage = "Failed to save user";

  const body: { email: string; password?: string | null } = {
    email: values.email.trim(),
  };
  const pwd = values.password.trim();
  if (pwd !== "") {
    body.password = pwd;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeadersForClient(),
      },
      body: JSON.stringify(body),
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
