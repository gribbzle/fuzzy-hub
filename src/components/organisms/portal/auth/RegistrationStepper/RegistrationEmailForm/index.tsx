"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updateRegistrationEmailAddress } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Form, Link } from "@portal/ui/atoms";
import { CheckboxField, SubmitButton, TextField } from "@portal/ui/molecules";

import {
  oauthRegistrationAction,
  submitRegistrationStepAction,
} from "@portal/auth/actions";
import { useSubmitRegistration } from "@portal/auth/hooks";
import { RegistrationSessionResponse } from "@portal/auth/models";
import {
  RegistrationEmailFormValues,
  registrationEmailSchema,
} from "@portal/auth/schemas";
import {
  FacebookButton,
  GoogleButton,
  RegistrationPreviousStepButton,
  RegistrationStepHeader,
} from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
} from "@portal/auth/ui/templates";

const RegistrationEmailForm = () => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: { updateRegistrationEmailAddress },
  });

  const methods = useForm<RegistrationEmailFormValues>({
    resolver: zodResolver(registrationEmailSchema),
    defaultValues: state.emailAddress,
  });

  useEffect(() => {
    methods.setFocus("email");
  }, [methods]);

  const handleSuccess = useCallback(
    (
      variables: RegistrationEmailFormValues,
      { error }: RegistrationSessionResponse,
    ) => {
      if (error) {
        if (error?.status === 422) {
          methods.setError("email", {
            type: "manual",
            message:
              "User with this email already exists. Please, use another Email.",
          });
        }

        return;
      }

      actions.updateRegistrationEmailAddress({ email: variables.email });
    },
    [actions, methods],
  );

  const handleGoToEmailConfirmation = useCallback(
    () => onGoToStep("email_confirmation"),
    [onGoToStep],
  );

  const handleGoToProfileType = useCallback(() => {
    onGoToStep("profile_type");
  }, [onGoToStep]);

  const handleSubmit = useSubmitRegistration({
    queryFn: (values) =>
      submitRegistrationStepAction({
        registrationSession: state.session,
        step: "email_address",
        data: values,
      }),
    onSuccess: handleSuccess,
    onNextStep: handleGoToEmailConfirmation,
  });

  const handleOAuthRegister = useCallback(
    async (provider: "google" | "meta", accessToken: string) => {
      await oauthRegistrationAction({
        provider,
        registrationSession: state.session,
        oauth_token: accessToken,
        profile_type: state.profile_type,
      });
    },
    [state.profile_type, state.session],
  );

  return (
    <TemplateAuthContent>
      <RegistrationStepHeader
        currentStep={1}
        title="Email address"
        subtitle="Enter your email address to receive a verification code"
      />
      <TemplateAuthContentForm>
        <Form
          id="email-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField label="Email" type="email" name="email" />
          <CheckboxField
            name="privacy_policy"
            className="font-medium -translate-y-px"
            label={
              <>
                I agree to the{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[0.5px]">
                  processing of my personal data
                </span>{" "}
                and confirm that I have read the{" "}
                <span className="font-semibold underline underline-offset-2 decoration-[0.5px]">
                  Privacy Policy
                </span>
                .
              </>
            }
          />
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <Box className="gap-4">
          <SubmitButton form="email-form" formState={methods.formState}>
            Confirm and Continue
          </SubmitButton>
          <RegistrationPreviousStepButton onPrevStep={handleGoToProfileType} />
        </Box>
        <span className="text-16 text-text-secondary font-semibold text-center max-tablet:text-14">
          -&nbsp;&nbsp;OR&nbsp;&nbsp;-
        </span>
        <Box className="flex-row justify-center gap-5">
          <GoogleButton onSuccess={handleOAuthRegister} />
          <FacebookButton />
        </Box>
        <Box className="flex-row gap-1.5 justify-center">
          <p className="large-desktop:text-18 text-16 text-text-secondary text-center font-semibold">
            Do you already have an account?
          </p>
          <Link
            className="large-desktop:text-18 text-16 text-center"
            href="./login"
          >
            Log In
          </Link>
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default RegistrationEmailForm;
