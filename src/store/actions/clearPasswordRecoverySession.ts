import { DEFAULT_PASSWORD_RECOVERY_STATE } from "@constants";
import { GlobalState } from "little-state-machine";

export const clearPasswordRecoverySession = (state: GlobalState): GlobalState => ({
  ...state,
  passwordRecovery: DEFAULT_PASSWORD_RECOVERY_STATE,
});
