import { GlobalState } from "little-state-machine";

import { ProfileType } from "@portal/auth/models";

export const updateRegistrationProfileType = (
  state: GlobalState,
  payload: ProfileType,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    profile_type: payload,
  },
});
