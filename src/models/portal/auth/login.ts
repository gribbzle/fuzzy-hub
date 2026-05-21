import { ApiResponse } from "@lib/api/types";
import { ProfileType } from "@portal/models";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticatedUserProfile {
  public_id: string;
  type: ProfileType;
  approved: boolean;
}

export interface AuthenticatedUserResource {
  user_id: string;
  profiles: AuthenticatedUserProfile[];
}

export type LoginResponse = ApiResponse<AuthenticatedUserResource>;

export interface OAuthLoginRequest {
  oauth_token: string;
}
export interface OAuthLoginParams extends OAuthLoginRequest {
  provider: "google" | "meta";
}
