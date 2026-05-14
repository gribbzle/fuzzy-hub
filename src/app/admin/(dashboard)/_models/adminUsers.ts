import { FetcherResponse } from "@admin/models";

export type AdminProfileType = "customer" | "breeder" | "service" | "admin";

export interface AdminUserListItem {
  public_id: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
}

export interface AdminUsersListData {
  items: AdminUserListItem[];
  total: number;
}

export type AdminUsersListResponse = FetcherResponse<AdminUsersListData>;

export interface AdminUserDetail {
  public_id: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export type AdminUserDetailResponse = FetcherResponse<AdminUserDetail>;

export interface AdminUserProfileListItem {
  public_id: string;
  type: string;
  approved: boolean;
  created_at: string;
}

export interface AdminUserProfilesListData {
  items: AdminUserProfileListItem[];
  total: number;
}

export type AdminUserProfilesListResponse =
  FetcherResponse<AdminUserProfilesListData>;

export interface AdminUserProfileDetail {
  public_id: string;
  type: string;
  approved: boolean;
  avatar_public_id: string | null;
  profile_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export type AdminUserProfileDetailResponse =
  FetcherResponse<AdminUserProfileDetail>;
