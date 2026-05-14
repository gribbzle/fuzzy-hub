"use client";

import { setAuthTokenCookie } from "@/utils/authCookie";
import { FetcherResponse, UserProfile } from "@admin/models";
import { API_BASE_URL } from "@constants";
import useSWRMutation from "swr/mutation";
import * as z from "zod";

import { loginSchema } from "@portal/auth/schemas";

// TODO: убрать зависимость от portal

export type LoginRequest = z.infer<typeof loginSchema>;

interface AuthenticatedUserResource {
  profiles: UserProfile[];
  access_token: string;
  token_type: string;
}

type LoginResponse = FetcherResponse<AuthenticatedUserResource>;

const loginFetcher = async (
  url: string,
  { arg }: { arg: LoginRequest },
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw Object.assign(new Error("Login failed"), {
      status: response.status,
      info: error,
    });
  }

  const json = (await response.json()) as LoginResponse;
  const token = json.data?.access_token;

  if (token) {
    setAuthTokenCookie(token);
  }

  return json;
};

export const useLoginMutation = () =>
  useSWRMutation<LoginResponse, Error, string, LoginRequest>(
    "/portal/auth/login",
    loginFetcher,
  );
