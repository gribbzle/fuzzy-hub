import { GlobalState } from "little-state-machine";

import { PasswordSetupStepRequest } from "@portal/auth/models";

export const updateRegistrationPasswordSetup = (
  state: GlobalState,
  payload: PasswordSetupStepRequest,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    passwordSetup: {
      ...payload,
    },
  },
});
