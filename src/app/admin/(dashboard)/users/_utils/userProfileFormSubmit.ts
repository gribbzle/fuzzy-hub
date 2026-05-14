import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

export interface AdminUserProfileFormValues {
  approved: boolean;
  full_name: string;
  phone_number: string;
}

export async function submitAdminUserProfilePatchRequest(options: {
  userId: string;
  profileId: string;
  values: AdminUserProfileFormValues;
  setSubmitError: (value: string | null) => void;
}): Promise<boolean> {
  const { userId, profileId, values, setSubmitError } = options;
  setSubmitError(null);

  const path = `/admin/users/${encodeURIComponent(userId)}/profiles/${encodeURIComponent(profileId)}`;
  const fallbackErrorMessage = "Failed to save profile";

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
        approved: values.approved,
        full_name: values.full_name.trim(),
        phone_number: values.phone_number.trim(),
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
