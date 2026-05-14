"use client";

import { DEFAULT_STATE } from "@constants";
import { TabsProvider as Stepper } from "@portal/contexts";
import { createStore } from "little-state-machine";

import { TabPanel as StepPanel } from "@portal/ui/atoms";

import RegistrationAccountVerificationForm from "./RegistrationAccountVerificationForm";
import RegistrationEmailConfirmationForm from "./RegistrationEmailConfirmationForm";
import RegistrationEmailForm from "./RegistrationEmailForm";
import RegistrationFinish from "./RegistrationFinish";
import RegistrationPasswordSetupForm from "./RegistrationPasswordSetupForm";
import RegistrationPersonalInformationForm from "./RegistrationPersonalInformationForm";
import RegistrationProfileTypeForm from "./RegistrationProfileTypeForm";

createStore(DEFAULT_STATE, { persist: "none" });

export const RegistrationStepper = () => (
  <Stepper defaultValue="profile_type">
    <StepPanel value="profile_type">
      <RegistrationProfileTypeForm />
    </StepPanel>
    <StepPanel value="email_address">
      <RegistrationEmailForm />
    </StepPanel>
    <StepPanel value="email_confirmation">
      <RegistrationEmailConfirmationForm />
    </StepPanel>
    <StepPanel value="password_setup">
      <RegistrationPasswordSetupForm />
    </StepPanel>
    <StepPanel value="personal_info">
      <RegistrationPersonalInformationForm />
    </StepPanel>
    <StepPanel value="account_verification">
      <RegistrationAccountVerificationForm />
    </StepPanel>
    <StepPanel value="finish">
      <RegistrationFinish />
    </StepPanel>
  </Stepper>
);
