import { GlobalState } from "little-state-machine";

import { PasswordRecoveryState, RegistrationState } from "@portal/auth/models";

export const DEFAULT_REGISTRATION_STATE: RegistrationState = {
  session: "",
  profile_type: "customer",
  emailAddress: {
    email: "",
  },
  passwordSetup: {
    password: "",
    password_confirmation: "",
  },
  customerPersonalInfo: {
    full_name: "",
    phone_number: "",
  },
  breederPersonalInfo: {
    subtype: "breeder",
    full_name: "",
    phone_number: "",
    about_me: "",
  },
  servicePersonalInfo: {
    full_name: "",
    phone_number: "",
    about_me: "",
  },
  breederVerification: {
    business_type: "company",
    company_name: "",
    company_address: "",
    tax_id: "",
    business_license_number: "",
    license_image: null,
    liability_insurance_image: null,
    full_legal_name: "",
    residential_address: "",
    government_id_number: "",
    id_image: null,
  },
  serviceVerification: {
    business_type: "company",
    company_name: "",
    company_address: "",
    tax_id: "",
    business_license_number: "",
    license_image: null,
    liability_insurance: "",
    full_legal_name: "",
    residential_address: "",
    government_id_number: "",
    id_image: null,
  },
};

export const DEFAULT_PASSWORD_RECOVERY_STATE: PasswordRecoveryState = {
  sessionId: "",
  email: "",
};

export const DEFAULT_STATE: GlobalState = {
  registration: DEFAULT_REGISTRATION_STATE,
  passwordRecovery: DEFAULT_PASSWORD_RECOVERY_STATE,
};
