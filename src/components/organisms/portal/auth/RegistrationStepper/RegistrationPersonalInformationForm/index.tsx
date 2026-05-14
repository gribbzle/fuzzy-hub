"use client";

import { useStateMachine } from "little-state-machine";

import RegistrationBreederPersonalInformationForm from "./RegistrationBreederPersonalInformationForm";
import RegistrationCustomerPersonalInformationForm from "./RegistrationCustomerPersonalInformationForm";
import RegistrationServicePersonalInformation from "./RegistrationServicePersonalInformation";

const RegistrationPersonalInformationForm = () => {
  const {
    state: { registration: state },
  } = useStateMachine();

  if (state.profile_type === "customer") {
    return <RegistrationCustomerPersonalInformationForm />;
  }

  if (state.profile_type === "breeder") {
    return <RegistrationBreederPersonalInformationForm />;
  }

  if (state.profile_type === "service") {
    return <RegistrationServicePersonalInformation />;
  }

  return null;
};

export default RegistrationPersonalInformationForm;
