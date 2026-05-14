"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Form } from "@portal/ui/atoms";
import { SubmitButton, TextField } from "@portal/ui/molecules";

import {
  resendVerificationCodeAction,
  submitRegistrationStepAction,
} from "@portal/auth/actions";
import { useSubmitRegistration } from "@portal/auth/hooks";
import { RegistrationSessionResponse } from "@portal/auth/models";
import {
  RegistrationEmailConfirmationFormValues,
  registrationEmailConfirmationSchema,
} from "@portal/auth/schemas";
import {
  RegistrationPreviousStepButton,
  RegistrationStepHeader,
  ResendTimer,
} from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
} from "@portal/auth/ui/templates";

const RegistrationEmailConfirmationForm = () => {
  const {
    state: { registration: state },
  } = useStateMachine();
  const { onChange: onGoToStep } = useStepper();

  const methods = useForm<RegistrationEmailConfirmationFormValues>({
    resolver: zodResolver(registrationEmailConfirmationSchema),
    defaultValues: {
      verification_code: "",
    },
  });

  useEffect(() => {
    methods.setFocus("verification_code");
  }, [methods]);

  const handleGoToPasswordSetup = useCallback(() => {
    onGoToStep("password_setup");
  }, [onGoToStep]);

  const handleGoToEmail = useCallback(() => {
    onGoToStep("email_address");
  }, [onGoToStep]);

  const handleSuccess = useCallback(
    async (
      _variables: RegistrationEmailConfirmationFormValues,
      { error }: RegistrationSessionResponse,
    ) => {
      if (error?.type === "InvalidVerificationCode") {
        methods.setError("verification_code", {
          type: "manual",
          message: "Invalid verification code",
        });
      }
    },
    [methods],
  );

  const handleSubmit =
    useSubmitRegistration<RegistrationEmailConfirmationFormValues>({
      queryFn: (values) =>
        submitRegistrationStepAction({
          registrationSession: state.session,
          step: "email_confirmation",
          data: values,
        }),
      onSuccess: handleSuccess,
      onNextStep: handleGoToPasswordSetup,
    });

  const handleResend = useCallback(async () => {
    await resendVerificationCodeAction({ registrationSession: state.session });
  }, [state.session]);

  return (
    <TemplateAuthContent>
      <RegistrationStepHeader
        currentStep={2}
        title="Email confirmation"
        subtitle="Enter the verification code sent to your email"
      />
      <TemplateAuthContentForm>
        <Form
          id="email-confirmation-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            disabled
            value={state.emailAddress.email}
          />
          <Box className="gap-2">
            <TextField label="Secret code" name="verification_code" />
            <ResendTimer textPrefix="Resend code in" onResend={handleResend} />
          </Box>
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <Box className="gap-4">
          <SubmitButton
            form="email-confirmation-form"
            formState={methods.formState}
          >
            Confirm and Continue
          </SubmitButton>
          <RegistrationPreviousStepButton onPrevStep={handleGoToEmail} />
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default RegistrationEmailConfirmationForm;
