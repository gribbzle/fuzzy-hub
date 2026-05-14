import { GlobalState } from "little-state-machine";

import { EmailAddressStepRequest } from "@portal/auth/models";

export const updateRegistrationEmailAddress = (
  state: GlobalState,
  payload: EmailAddressStepRequest,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    emailAddress: {
      ...payload,
    },
  },
});
