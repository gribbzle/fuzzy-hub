import { GlobalState } from "little-state-machine";

export const updatePasswordRecoverySessionId = (
  state: GlobalState,
  payload: string,
): GlobalState => ({
  ...state,
  passwordRecovery: {
    ...state.passwordRecovery,
    sessionId: payload,
  },
});
