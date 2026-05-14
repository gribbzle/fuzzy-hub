import { GlobalState } from "little-state-machine";

export const updatePasswordRecoveryEmailAddress = (
  state: GlobalState,
  payload: string,
): GlobalState => ({
  ...state,
  passwordRecovery: {
    ...state.passwordRecovery,
    email: payload,
  },
});
