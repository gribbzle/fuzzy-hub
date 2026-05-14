"use client";

import { useStateMachine } from "little-state-machine";

import RegistrationBreederVerificationForm from "./RegistrationBreederVerificationForm";
import RegistrationServiceVerificationForm from "./RegistrationServiceVerificationForm";

const RegistrationAccountVerificationForm = () => {
  const {
    state: { registration: state },
  } = useStateMachine();

  if (state.profile_type === "breeder") {
    return <RegistrationBreederVerificationForm />;
  }

  if (state.profile_type === "service") {
    return <RegistrationServiceVerificationForm />;
  }

  return null;
};

export default RegistrationAccountVerificationForm;
