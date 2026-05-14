import { DEFAULT_REGISTRATION_STATE } from "@constants";
import { GlobalState } from "little-state-machine";

export const clearRegistrationSession = (state: GlobalState): GlobalState => ({
  ...state,
  registration: DEFAULT_REGISTRATION_STATE,
});
