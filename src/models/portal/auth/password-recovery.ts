import { ApiResponse } from "@lib/api/types";

export interface InitiatePasswordRecoveryRequest {
  email: string;
}

export type PasswordRecoveryCodeSentResource = string;

export type PasswordRecoveryCodeSentResponse =
  ApiResponse<PasswordRecoveryCodeSentResource>;

export interface VerifyPasswordRecoveryCodeRequest {
  email: string;
  code: string;
}

export interface PasswordRecoveryCodeVerifiedResource {
  public_id: string;
}

export type PasswordRecoveryCodeVerifiedResponse =
  ApiResponse<PasswordRecoveryCodeVerifiedResource>;

export interface ResetPasswordRequest {
  public_id: string;
  password: string;
  password_confirmation: string;
}

export interface PasswordResetSuccessResource {
  message: string;
}

export type PasswordResetSuccessResponse =
  ApiResponse<PasswordResetSuccessResource>;

export interface PasswordRecoveryState {
  sessionId: string;
  email: string;
}

export interface ResendPasswordRecoveryCodeRequest {
  email: string;
}
