import { ApiResponse } from "@lib/api/types";

export type ProfileType = "admin" | "customer" | "breeder" | "service";

export interface ProfileResource {
  public_id: string;
  type: ProfileType;
  approved: boolean;
  avatar_public_id: string | null;
  profile_data: null;
  created_at: string;
  updated_at: string;
}

export interface ProfileListResource {
  items: ProfileResource[];
  total: number;
}

export type ProfileListResponse = ApiResponse<ProfileListResource>;
