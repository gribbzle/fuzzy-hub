import {
  AdminQuizProfilePropertyWeightsData,
  QUIZ_PROFILE_PROPERTY_WEIGHT_KEYS,
  QuizProfilePropertyWeightKey,
  QuizProfilePropertyWeightLevel,
} from "@/app/admin/(dashboard)/_models";
import { redirectAdminOnUnauthorized } from "@/utils/adminApiAuth";
import { getResponseErrorMessage } from "@/utils/apiResponseError";
import { getAuthHeadersForClient } from "@/utils/authCookie";
import { API_BASE_URL } from "@constants";

function normalizeWeightLevel(value: unknown): QuizProfilePropertyWeightLevel {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }
  return "medium";
}

export function normalizeQuizProfilePropertyWeights(
  raw: Partial<Record<string, unknown>> | undefined,
): AdminQuizProfilePropertyWeightsData {
  const result = {} as AdminQuizProfilePropertyWeightsData;
  for (const key of QUIZ_PROFILE_PROPERTY_WEIGHT_KEYS) {
    result[key] = normalizeWeightLevel(raw?.[key]);
  }
  return result;
}

export async function submitQuizProfilePropertyWeightsRequest(options: {
  quizProfileId: string;
  values: AdminQuizProfilePropertyWeightsData;
  setSubmitError: (value: string | null) => void;
}): Promise<boolean> {
  const { quizProfileId, values, setSubmitError } = options;
  setSubmitError(null);

  const path = `/admin/quiz-profiles/${encodeURIComponent(quizProfileId)}/property-weights`;
  const fallbackErrorMessage = "Failed to save property weights";

  const weights: Record<string, QuizProfilePropertyWeightLevel> = {};
  for (const key of QUIZ_PROFILE_PROPERTY_WEIGHT_KEYS) {
    weights[key] = values[key];
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
      body: JSON.stringify({ weights }),
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

export function labelForQuizProfilePropertyWeightKey(
  key: QuizProfilePropertyWeightKey,
): string {
  const labels: Record<QuizProfilePropertyWeightKey, string> = {
    time: "Time",
    activity: "Activity",
    space: "Space",
    kids: "Kids",
    allergy: "Allergy",
    grooming: "Grooming",
    interaction: "Interaction",
    travel: "Travel",
    budget: "Budget",
  };
  return labels[key];
}
