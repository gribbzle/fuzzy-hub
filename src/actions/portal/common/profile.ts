import { actionClient } from "@lib/api/api-client";
import { ProfileListResource, ProfileListResponse } from "@portal/models";

export const getProfilesAction = async (): Promise<ProfileListResponse> =>
  actionClient<ProfileListResource>("/portal/profiles", {
    method: "GET",
  });
