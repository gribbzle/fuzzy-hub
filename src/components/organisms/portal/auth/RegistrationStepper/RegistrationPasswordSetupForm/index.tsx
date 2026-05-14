"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updateRegistrationPasswordSetup } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm, useWatch } from "react-hook-form";

import { Box, Form } from "@portal/ui/atoms";
import { PasswordField, SubmitButton } from "@portal/ui/molecules";

import { submitRegistrationStepAction } from "@portal/auth/actions";
import { useSubmitRegistration } from "@portal/auth/hooks";
import {
  SetUpNewPasswordFormValues,
  setUpNewPassword,
} from "@portal/auth/schemas";
import {
  PasswordRequirements,
  RegistrationPreviousStepButton,
  RegistrationStepHeader,
} from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
} from "@portal/auth/ui/templates";

const RegistrationPasswordSetupForm = () => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: { updateRegistrationPasswordSetup },
  });

  const methods = useForm<SetUpNewPasswordFormValues>({
    resolver: zodResolver(setUpNewPassword),
    defaultValues: state.passwordSetup,
  });

  const password = useWatch({
    name: "password",
    control: methods.control,
  });

  useEffect(() => {
    methods.setFocus("password");
  }, [methods]);

  const handleGoToPersonalInfo = useCallback(() => {
    onGoToStep("personal_info");
  }, [onGoToStep]);

  const handleGoToEmail = useCallback(() => {
    onGoToStep("email_address");
  }, [onGoToStep]);

  const handleSuccess = useCallback(
    (variables: SetUpNewPasswordFormValues) => {
      actions.updateRegistrationPasswordSetup(variables);
    },
    [actions],
  );

  const handleSubmit = useSubmitRegistration({
    queryFn: (values) =>
      submitRegistrationStepAction({
        registrationSession: state.session,
        step: "password_setup",
        data: values,
      }),
    onSuccess: handleSuccess,
    onNextStep: handleGoToPersonalInfo,
  });

  return (
    <TemplateAuthContent>
      <RegistrationStepHeader
        currentStep={3}
        title="Create a password"
        subtitle="Set a password for your account"
      />
      <TemplateAuthContentForm>
        <Form
          id="password-setup-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <PasswordField label="Password" name="password" />
          <PasswordField
            label="Confirm password"
            name="password_confirmation"
          />
          <PasswordRequirements
            password={password}
            title="Your password must:"
          />
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <Box className="gap-4">
          <SubmitButton
            form="password-setup-form"
            formState={methods.formState}
          >
            Continue
          </SubmitButton>
          <RegistrationPreviousStepButton onPrevStep={handleGoToEmail} />
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default RegistrationPasswordSetupForm;
