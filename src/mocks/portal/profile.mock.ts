import { ProfileResource } from "@portal/models";

export const CUSTOMER_PROFILE_MOCK: ProfileResource = {
  approved: true,
  avatar_public_id: null,
  created_at: "2023-04-29T16:57:48Z",
  profile_data: null,
  public_id: "7f8b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6a",
  type: "customer",
  updated_at: "2023-04-29T16:57:48Z",
};

export const BREEDER_PROFILE_MOCK: ProfileResource = {
  approved: true,
  avatar_public_id: "/images/mocks/avatar/breeder.png",
  created_at: "2023-04-29T16:57:48Z",
  profile_data: null,
  public_id: "7f8b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6b",
  type: "breeder",
  updated_at: "2023-04-29T16:57:48Z",
};

export const SERVICE_PROFILE_MOCK: ProfileResource = {
  approved: true,
  avatar_public_id: "/images/mocks/avatar/service.png",
  created_at: "2023-04-29T16:57:48Z",
  profile_data: null,
  public_id: "7f8b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6c",
  type: "breeder",
  updated_at: "2023-04-29T16:57:48Z",
};
