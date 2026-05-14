"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { useStateMachine } from "little-state-machine";
import { useForm, useWatch } from "react-hook-form";

import { Box, Form } from "@portal/ui/atoms";
import { PasswordField, SubmitButton } from "@portal/ui/molecules";

import {
  PasswordResetSuccessResponse,
  ResetPasswordRequest,
} from "@portal/auth/models";
import {
  SetUpNewPasswordFormValues,
  setUpNewPassword,
} from "@portal/auth/schemas";
import { PasswordRequirements } from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
  TemplateAuthContentHeader,
} from "@portal/auth/ui/templates";

export interface NewPasswordFormProps {
  onSubmit: (
    request: ResetPasswordRequest,
  ) => Promise<PasswordResetSuccessResponse>;
}

const NewPasswordForm = ({ onSubmit }: NewPasswordFormProps) => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { passwordRecovery: state },
  } = useStateMachine();

  const methods = useForm<SetUpNewPasswordFormValues>({
    resolver: zodResolver(setUpNewPassword),
  });

  useEffect(() => {
    methods.setFocus("password");
  }, [methods]);

  const handleSubmit = useCallback(
    async (values: SetUpNewPasswordFormValues) => {
      const { error } = await onSubmit({
        public_id: state.sessionId,
        ...values,
      });

      if (error) {
        return;
      }

      onGoToStep("finish");
    },
    [onGoToStep, onSubmit, state.sessionId],
  );

  const password = useWatch({
    name: "password",
    control: methods.control,
  });

  return (
    <TemplateAuthContent className="large-desktop:max-w-110 max-tablet:py-8">
      <TemplateAuthContentHeader
        title="New password"
        subtitle="Set a new password for your account"
      />
      <TemplateAuthContentForm className="large-desktop:mx-2.5">
        <Form
          id="new-password-form"
          methods={methods}
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <Box className="gap-4">
            <PasswordField name="password" label="Password" />
            <PasswordField
              name="password_confirmation"
              label="Confirm password"
            />
            <PasswordRequirements
              title="Your password must:"
              password={password}
            />
          </Box>
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter className="large-desktop:px-2.5">
        <SubmitButton form="new-password-form" formState={methods.formState}>
          Set Up New Password
        </SubmitButton>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default NewPasswordForm;
