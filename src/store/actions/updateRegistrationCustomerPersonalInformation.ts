import { GlobalState } from "little-state-machine";

import { CustomerPersonalInfoStepRequest } from "@portal/auth/models";

export const updateRegistrationCustomerPersonalInformation = (
  state: GlobalState,
  payload: CustomerPersonalInfoStepRequest,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    customerPersonalInfo: {
      ...payload,
    },
  },
});
