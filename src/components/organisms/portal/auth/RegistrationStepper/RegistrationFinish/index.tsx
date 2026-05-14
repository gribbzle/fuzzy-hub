"use client";

import { useEffect, useState } from "react";

import { clearRegistrationSession } from "@store/actions";
import { useStateMachine } from "little-state-machine";

import RegistrationBreederFinish from "./RegistrationBreederFinish";
import RegistrationCustomerFinish from "./RegistrationCustomerFinish";
import RegistrationServiceFinish from "./RegistrationServiceFinish";

const RegistrationFinish = () => {
  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: {
      clearRegistrationSession,
    },
  });

  const [profileType] = useState(state.profile_type);

  useEffect(() => {
    actions.clearRegistrationSession();
  }, [actions]);

  if (profileType === "customer") {
    return <RegistrationCustomerFinish />;
  }

  if (profileType === "breeder") {
    return <RegistrationBreederFinish />;
  }

  if (profileType === "service") {
    return <RegistrationServiceFinish />;
  }

  return null;
};

export default RegistrationFinish;
