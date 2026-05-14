"use server";

import { actionClient } from "@lib/api/api-client";

import {
  AuthenticatedUserResource,
  LoginRequest,
  LoginResponse,
  OAuthLoginParams,
} from "@portal/auth/models";

export const loginAction = async (
  params: LoginRequest,
): Promise<LoginResponse> =>
  actionClient<AuthenticatedUserResource>("/portal/auth/login", {
    method: "POST",
    body: JSON.stringify(params),
  });

export const oauthLoginAction = async ({
  provider,
  ...params
}: OAuthLoginParams): Promise<LoginResponse> =>
  actionClient<AuthenticatedUserResource>(`/portal/auth/oauth/${provider}`, {
    method: "POST",
    body: JSON.stringify(params),
  });
