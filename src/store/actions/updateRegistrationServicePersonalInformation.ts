import { GlobalState } from "little-state-machine";

import { ServicePersonalInfoStepRequest } from "@portal/auth/models";

export const updateRegistrationServicePersonalInformation = (
  state: GlobalState,
  payload: ServicePersonalInfoStepRequest,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    servicePersonalInfo: {
      ...payload,
    },
  },
});
