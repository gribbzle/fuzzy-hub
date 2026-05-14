import { API_BASE_URL } from "@constants";
import { ApiErrorPayload, ApiFetchError, toApiError } from "@lib/api/error";
import { ApiResponse, FetcherResponse } from "@lib/api/types";

/**
 * Базовый клиент (Low-level fetch)
 */
async function baseFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const payload: ApiErrorPayload = errorData?.data ?? {};

    throw new ApiFetchError(
      payload.type ?? payload.message ?? response.statusText,
      response.status,
      payload,
    );
  }

  return response.json();
}

/**
 * Fetcher для SWR (выбрасывает Error)
 * Используется в Client Components: useSWR(url, swrFetcher)
 */
export const swrFetcher = <T>(url: string) => baseFetch<T>(url);

/**
 * Обертка для Server Actions (возвращает объект)
 * Используется в "use server" функциях
 */
export async function actionClient<T>(
  url: string,
  init?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const { data } = await baseFetch<FetcherResponse<T>>(url, init);

    return { data, error: null };
  } catch (error) {
    console.error("Action Error:", error);

    return { data: null, error: toApiError(error) };
  }
}
