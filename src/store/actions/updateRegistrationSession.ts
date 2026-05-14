import { GlobalState } from "little-state-machine";

export const updateRegistrationSession = (
  state: GlobalState,
  payload: string,
): GlobalState => ({
  ...state,
  registration: {
    ...state.registration,
    session: payload,
  },
});
