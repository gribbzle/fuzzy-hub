import { GlobalState } from "little-state-machine";

import { BreederPersonalInfoStepRequest } from "@portal/auth/models";

export const updateRegistrationBreederPersonalInformation = (
  state: GlobalState,
  payload: BreederPersonalInfoStepRequest,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    breederPersonalInfo: {
      ...payload,
    },
  },
});
