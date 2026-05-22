import { ApiFetchError, toApiError } from "@lib/api/error";
import { FetcherResponse } from "@lib/api/types";

import {
  AuthenticatedUserResource,
  LoginRequest,
  LoginResponse,
  OAuthLoginParams,
} from "@portal/auth/models";

let csrfCookieRequest: Promise<void> | null = null;
let hasCsrfCookie = false;

const ensureCsrfCookie = async (forceRefresh = false) => {
  console.log(1);
  if (hasCsrfCookie && !forceRefresh) {
    console.log(2);
    return;
  }

  if (!csrfCookieRequest) {
    console.log(3);
    csrfCookieRequest = fetch(
      "https://fuzzyhub.generals-soft.com/sanctum/csrf-cookie",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      },
    )
      .then((response) => {
        console.log("response", response);

        if (!response.ok) {
          throw new ApiFetchError(
            response.statusText || "Failed to initialize CSRF cookie",
            response.status,
          );
        }

        hasCsrfCookie = true;
      })
      .finally(() => {
        csrfCookieRequest = null;
      });
  }
  console.log(4);

  return csrfCookieRequest;
};

const getCookieValue = (name: string): string | null => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  const value = cookie.slice(name.length + 1);
  return decodeURIComponent(value);
};

const makeAuthRequest = async <T>(
  path: string,
  payload?: unknown,
  withRetry = true,
): Promise<T> => {
  await ensureCsrfCookie();

  const xsrfToken = getCookieValue("XSRF-TOKEN");
  const response = await fetch(path, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });

  if (response.status === 419 && withRetry) {
    await ensureCsrfCookie(true);
    return makeAuthRequest<T>(path, payload, false);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const payloadData = errorData?.data ?? {};

    console.error("Action Error1:", errorData);

    throw new ApiFetchError(
      payloadData.type ?? payloadData.message ?? response.statusText,
      response.status,
      payloadData,
    );
  }

  return response.json();
};

export const loginWithSanctum = async (
  params: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const { data } = await makeAuthRequest<
      FetcherResponse<AuthenticatedUserResource>
    >("/api/v1/portal/auth/login", params);

    console.log("data", data);

    return { data, error: null };
  } catch (error) {
    return { data: null, error: toApiError(error) };
  }
};

export const oauthLoginWithSanctum = async ({
  provider,
  ...params
}: OAuthLoginParams): Promise<LoginResponse> => {
  try {
    const { data } = await makeAuthRequest<
      FetcherResponse<AuthenticatedUserResource>
    >(`/api/auth/oauth/${provider}`, params);

    return { data, error: null };
  } catch (error) {
    return { data: null, error: toApiError(error) };
  }
};
