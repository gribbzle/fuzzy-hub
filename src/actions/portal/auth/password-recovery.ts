"use server";

import { actionClient } from "@lib/api/api-client";

import {
  InitiatePasswordRecoveryRequest,
  PasswordRecoveryCodeSentResource,
  PasswordRecoveryCodeSentResponse,
  PasswordRecoveryCodeVerifiedResource,
  PasswordRecoveryCodeVerifiedResponse,
  PasswordResetSuccessResource,
  PasswordResetSuccessResponse,
  ResendPasswordRecoveryCodeRequest,
  ResetPasswordRequest,
  VerifyPasswordRecoveryCodeRequest,
} from "@portal/auth/models";

export const initiatePasswordRecoveryAction = async (
  params: InitiatePasswordRecoveryRequest,
): Promise<PasswordRecoveryCodeSentResponse> =>
  actionClient<PasswordRecoveryCodeSentResource>("/portal/password-recovery", {
    method: "POST",
    body: JSON.stringify(params),
  });

export const verifyCodeAction = async (
  params: VerifyPasswordRecoveryCodeRequest,
): Promise<PasswordRecoveryCodeVerifiedResponse> =>
  actionClient<PasswordRecoveryCodeVerifiedResource>(
    "/portal/password-recovery/verify-code",
    {
      method: "POST",
      body: JSON.stringify(params),
    },
  );

export const resetPasswordRecoveryAction = async (
  params: ResetPasswordRequest,
): Promise<PasswordResetSuccessResponse> =>
  actionClient<PasswordResetSuccessResource>("/portal/password-recovery", {
    method: "PATCH",
    body: JSON.stringify(params),
  });

export const resendCodeAction = async (
  params: ResendPasswordRecoveryCodeRequest,
) =>
  actionClient<PasswordRecoveryCodeSentResource>(
    "/portal/password-recovery/resend-code",
    {
      method: "POST",
      body: JSON.stringify(params),
    },
  );
