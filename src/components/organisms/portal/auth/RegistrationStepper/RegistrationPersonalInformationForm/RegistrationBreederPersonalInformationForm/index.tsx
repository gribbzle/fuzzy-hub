"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updateRegistrationBreederPersonalInformation } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Form } from "@portal/ui/atoms";
import {
  RadioField,
  RadioGroupField,
  SubmitButton,
  TextAreaField,
  TextField,
} from "@portal/ui/molecules";

import { submitRegistrationStepAction } from "@portal/auth/actions";
import { useSubmitRegistration } from "@portal/auth/hooks";
import {
  RegistrationBreederPersonalInformationFormValues,
  registrationBreederPersonalInformationSchema,
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

const RegistrationBreederPersonalInformationForm = () => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: { updateRegistrationBreederPersonalInformation },
  });

  const methods = useForm<RegistrationBreederPersonalInformationFormValues>({
    resolver: zodResolver(registrationBreederPersonalInformationSchema),
    defaultValues: state.breederPersonalInfo,
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
    (variables: RegistrationBreederPersonalInformationFormValues) => {
      actions.updateRegistrationBreederPersonalInformation(variables);
    },
    [actions],
  );

  const handleSubmit = useSubmitRegistration({
    queryFn: (values) =>
      submitRegistrationStepAction({
        registrationSession: state.session,
        step: "breeder_personal_info",
        data: values,
      }),
    onSuccess: handleSuccess,
    onNextStep: handleGoToAccountVerification,
  });

  return (
    <TemplateAuthContent>
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
          <RadioGroupField
            name="subtype"
            className="flex-row gap-8 tablet:justify-center"
            size="large"
            defaultValue="breeder"
          >
            <RadioField value="breeder" label="Breeder" />
            <RadioField value="shelter" label="Shelter" />
          </RadioGroupField>
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

export default RegistrationBreederPersonalInformationForm;
