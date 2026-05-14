"use client";

import { DEFAULT_STATE } from "@constants";
import { TabsProvider as Stepper } from "@portal/contexts";
import { createStore } from "little-state-machine";

import { TabPanel as StepPanel } from "@portal/ui/atoms";

import {
  initiatePasswordRecoveryAction,
  resetPasswordRecoveryAction,
  verifyCodeAction,
} from "@portal/auth/actions";

import Finish from "./Finish";
import InitiatePasswordRecoveryForm from "./InitiatePasswordRecoveryForm";
import NewPasswordForm from "./NewPasswordForm";
import SecretQuestionForm from "./SecretQuestionForm";
import VerifyCodeForm from "./VerifyCodeForm";

createStore(DEFAULT_STATE, { persist: "none" });

export const PasswordRecoveryStepper = () => (
  <Stepper defaultValue="email_address">
    <StepPanel value="email_address">
      <InitiatePasswordRecoveryForm onSubmit={initiatePasswordRecoveryAction} />
    </StepPanel>
    <StepPanel value="code">
      <VerifyCodeForm onSubmit={verifyCodeAction} />
    </StepPanel>
    <StepPanel value="password_setup">
      <NewPasswordForm onSubmit={resetPasswordRecoveryAction} />
    </StepPanel>
    <StepPanel value="finish">
      <Finish />
    </StepPanel>
    <StepPanel value="secret_question">
      <SecretQuestionForm />
    </StepPanel>
  </Stepper>
);
