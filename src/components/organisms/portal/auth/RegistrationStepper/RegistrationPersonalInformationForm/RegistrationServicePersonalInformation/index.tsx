"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updateRegistrationServicePersonalInformation } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Form } from "@portal/ui/atoms";
import { SubmitButton, TextAreaField, TextField } from "@portal/ui/molecules";

import { submitRegistrationStepAction } from "@portal/auth/actions";
import { useSubmitRegistration } from "@portal/auth/hooks";
import {
  RegistrationServicePersonalInformationFormValues,
  registrationServicePersonalInformationSchema,
} from "@portal/auth/schemas";
import {
  RegistrationPreviousStepButton,
  RegistrationStepHeader,
} from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
} from "@portal/auth/ui/templates";

const RegistrationServicePersonalInformation = () => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: { updateRegistrationServicePersonalInformation },
  });

  const methods = useForm<RegistrationServicePersonalInformationFormValues>({
    resolver: zodResolver(registrationServicePersonalInformationSchema),
    defaultValues: state.servicePersonalInfo,
  });

  useEffect(() => {
    methods.setFocus("full_name");
  }, [methods]);

  const handleGoToAccountVerification = useCallback(() => {
    onGoToStep("account_verification");
  }, [onGoToStep]);

  const handleGoToPasswordSetup = useCallback(() => {
    onGoToStep("password_setup");
  }, [onGoToStep]);

  const handleSuccess = useCallback(
    (variables: RegistrationServicePersonalInformationFormValues) => {
      actions.updateRegistrationServicePersonalInformation(variables);
    },
    [actions],
  );

  const handleSubmit = useSubmitRegistration({
    queryFn: (values) =>
      submitRegistrationStepAction({
        registrationSession: state.session,
        step: "service_personal_info",
        data: values,
      }),
    onSuccess: handleSuccess,
    onNextStep: handleGoToAccountVerification,
  });

  return (
    <TemplateAuthContent className="max-tablet:pb-30.5">
      <RegistrationStepHeader
        currentStep={4}
        title="Personal Information"
        subtitle="Enter your full name, phone number and a short description about yourself"
      />
      <TemplateAuthContentForm>
        <Form
          id="personal-information-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField label="Full name" name="full_name" />
          <TextField
            label="Phone number"
            name="phone_number"
            placeholder="+1 (XXX) XXX-XXXX"
          />
          <TextAreaField
            label="About you"
            name="about_me"
            className="min-h-30"
          />
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <Box className="gap-4">
          <SubmitButton
            form="personal-information-form"
            formState={methods.formState}
          >
            Continue
          </SubmitButton>
          <RegistrationPreviousStepButton
            onPrevStep={handleGoToPasswordSetup}
          />
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default RegistrationServicePersonalInformation;
