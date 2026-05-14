import { ApiResponse } from "@lib/api/types";
import { UserType } from "@models";

export type RegistrationStep =
  | "account_type"
  | "email_address"
  | "email_confirmation"
  | "password_setup"
  | "customer_personal_info"
  | "breeder_personal_info"
  | "breeder_verification"
  | "service_personal_info"
  | "service_verification"
  | "customer_complete"
  | "breeder_complete"
  | "service_complete";

export type ProfileType = Exclude<UserType, "admin">;

export interface RegistrationSessionResource {
  public_id: string;
  profile_type: ProfileType;
  submitted_step: RegistrationStep;
  current_step: RegistrationStep;
  expires_at: string;
}

export type RegistrationSessionResponse =
  ApiResponse<RegistrationSessionResource>;

export interface StartRegistrationRequest {
  profile_type: ProfileType;
}

export interface OAuthRegistrationRequest {
  oauth_token: string;
  profile_type: "admin" | ProfileType;
}

export interface OAuthRegistrationParams extends OAuthRegistrationRequest {
  provider: "google" | "meta";
  registrationSession: string;
}

export interface EmailAddressStepRequest {
  email: string;
}

interface EmailConfirmationStepRequest {
  verification_code: string;
}

export interface PasswordSetupStepRequest {
  password: string;
  password_confirmation: string;
}

export interface CustomerPersonalInfoStepRequest {
  full_name: string;
  phone_number: string | null;
}

export interface BreederPersonalInfoStepRequest {
  subtype: "breeder" | "shelter";
  full_name: string;
  phone_number?: string;
  about_me: string;
}

export interface ServicePersonalInfoStepRequest {
  full_name: string;
  phone_number?: string;
  about_me: string;
}

export interface BreederVerificationStepRequest {
  business_type: "company" | "self_employed";
  company_name?: string;
  company_address?: string;
  tax_id?: string;
  business_license_number?: string;
  license_image?: File | null;
  liability_insurance_image?: File | null;
  full_legal_name?: string;
  residential_address?: string;
  government_id_number?: string;
  id_image?: File | null;
}

export interface ServiceVerificationStepRequest {
  business_type: "company" | "self_employed";
  company_name?: string;
  company_address?: string;
  tax_id?: string;
  business_license_number?: string;
  license_image?: File | null;
  liability_insurance?: string;
  full_legal_name?: string;
  residential_address?: string;
  government_id_number?: string;
  id_image?: File | null;
}

export type SubmitStepRequest =
  | EmailAddressStepRequest
  | EmailConfirmationStepRequest
  | PasswordSetupStepRequest
  | CustomerPersonalInfoStepRequest
  | BreederPersonalInfoStepRequest
  | ServicePersonalInfoStepRequest
  | BreederVerificationStepRequest
  | ServiceVerificationStepRequest;

export interface SubmitStepParams<T> {
  registrationSession: string;
  step: RegistrationStep;
  data: T;
}

export interface RegistrationState {
  session: string;
  profile_type: ProfileType;
  emailAddress: EmailAddressStepRequest;
  passwordSetup: PasswordSetupStepRequest;
  customerPersonalInfo: CustomerPersonalInfoStepRequest;
  breederPersonalInfo: BreederPersonalInfoStepRequest;
  servicePersonalInfo: ServicePersonalInfoStepRequest;
  breederVerification: BreederVerificationStepRequest;
  serviceVerification: ServiceVerificationStepRequest;
}

export interface ResendVerificationCodeRequest {
  registrationSession: string;
}
