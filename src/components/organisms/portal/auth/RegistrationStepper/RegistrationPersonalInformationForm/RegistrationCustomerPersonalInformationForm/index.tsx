"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updateRegistrationCustomerPersonalInformation } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Form } from "@portal/ui/atoms";
import { SubmitButton, TextField } from "@portal/ui/molecules";

import { submitRegistrationStepAction } from "@portal/auth/actions";
import { useSubmitRegistration } from "@portal/auth/hooks";
import {
  RegistrationCustomerPersonalInformationFormValues,
  registrationCustomerPersonalInformationSchema,
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

const RegistrationCustomerPersonalInformationForm = () => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: {
      updateRegistrationCustomerPersonalInformation,
    },
  });

  const methods = useForm<RegistrationCustomerPersonalInformationFormValues>({
    resolver: zodResolver(registrationCustomerPersonalInformationSchema),
    defaultValues: state.customerPersonalInfo,
  });

  useEffect(() => {
    methods.setFocus("full_name");
  }, [methods]);

  const handleGoToFinish = useCallback(() => {
    onGoToStep("finish");
  }, [onGoToStep]);

  const handleGoToPasswordSetup = useCallback(() => {
    onGoToStep("password_setup");
  }, [onGoToStep]);

  const handleSuccess = useCallback(
    (variables: RegistrationCustomerPersonalInformationFormValues) => {
      actions.updateRegistrationCustomerPersonalInformation({
        phone_number: null,
        ...variables,
      });
    },
    [actions],
  );

  const handleSubmit = useSubmitRegistration({
    queryFn: (values) =>
      submitRegistrationStepAction({
        registrationSession: state.session,
        step: "customer_personal_info",
        data: values,
      }),
    onSuccess: handleSuccess,
    onNextStep: handleGoToFinish,
  });

  return (
    <TemplateAuthContent>
      <RegistrationStepHeader
        currentStep={4}
        title="Personal Information"
        subtitle="Input your full name and phone number"
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
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <Box className="gap-4">
          <SubmitButton
            form="personal-information-form"
            formState={methods.formState}
          >
            Finish
          </SubmitButton>
          <RegistrationPreviousStepButton
            onPrevStep={handleGoToPasswordSetup}
          />
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default RegistrationCustomerPersonalInformationForm;
