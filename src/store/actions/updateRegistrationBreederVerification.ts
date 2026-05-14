import { GlobalState } from "little-state-machine";

import { BreederVerificationStepRequest } from "@portal/auth/models";

export const updateRegistrationBreederVerification = (
  state: GlobalState,
  payload: BreederVerificationStepRequest,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    breederVerification: {
      ...payload,
    },
  },
});
