import { GlobalState } from "little-state-machine";

import { ServiceVerificationStepRequest } from "@portal/auth/models";

export const updateRegistrationServiceVerification = (
  state: GlobalState,
  payload: ServiceVerificationStepRequest,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    serviceVerification: {
      ...payload,
    },
  },
});
