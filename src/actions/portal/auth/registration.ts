"use server";

import { actionClient } from "@lib/api/api-client";
import { dataToFormData } from "@utils";

import {
  OAuthRegistrationParams,
  RegistrationSessionResource,
  RegistrationSessionResponse,
  ResendVerificationCodeRequest,
  StartRegistrationRequest,
  SubmitStepParams,
  SubmitStepRequest,
} from "@portal/auth/models";

export const oauthRegistrationAction = async ({
  provider,
  registrationSession,
  ...params
}: OAuthRegistrationParams): Promise<RegistrationSessionResponse> =>
  actionClient<RegistrationSessionResource>(
    `/portal/registration/${registrationSession}/oauth/${provider}`,
    {
      method: "POST",
      body: JSON.stringify(params),
    },
  );

export const startRegistrationAction = async (
  params: StartRegistrationRequest,
): Promise<RegistrationSessionResponse> =>
  actionClient<RegistrationSessionResource>(`/portal/registration`, {
    method: "POST",
    body: JSON.stringify(params),
  });

export const submitRegistrationStepAction = async <T = SubmitStepRequest>({
  registrationSession,
  step,
  data,
}: SubmitStepParams<T>): Promise<RegistrationSessionResponse> =>
  actionClient<RegistrationSessionResource>(
    `/portal/registration/${registrationSession}/${step}`,
    {
      method: "POST",
      body: dataToFormData(data as Record<string, unknown>),
    },
  );

export const resendVerificationCodeAction = async ({
  registrationSession,
}: ResendVerificationCodeRequest) =>
  actionClient(
    `/portal/registration/${registrationSession}/resend-verification-code`,
    {
      method: "POST",
    },
  );
