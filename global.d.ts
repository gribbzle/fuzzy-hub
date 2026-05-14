import "little-state-machine";

import { PasswordRecoveryState, RegistrationState } from "@portal/auth/models";

declare module "little-state-machine" {
  interface GlobalState {
    registration: RegistrationState;
    passwordRecovery: PasswordRecoveryState;
  }
}
