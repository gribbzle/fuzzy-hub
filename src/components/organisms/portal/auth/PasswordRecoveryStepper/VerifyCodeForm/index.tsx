"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updatePasswordRecoverySessionId } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Button, Form } from "@portal/ui/atoms";
import { SubmitButton, TextField } from "@portal/ui/molecules";

import { resendCodeAction } from "@portal/auth/actions";
import {
  PasswordRecoveryCodeVerifiedResponse,
  VerifyPasswordRecoveryCodeRequest,
} from "@portal/auth/models";
import { VerifyCodeFormValues, verifyCodeSchema } from "@portal/auth/schemas";
import { ResendTimer } from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
  TemplateAuthContentHeader,
} from "@portal/auth/ui/templates";

interface VerifyCodeFormProps {
  onSubmit: (
    request: VerifyPasswordRecoveryCodeRequest,
  ) => Promise<PasswordRecoveryCodeVerifiedResponse>;
}

const VerifyCodeForm = ({ onSubmit }: VerifyCodeFormProps) => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { passwordRecovery: state },
    actions,
  } = useStateMachine({
    actions: { updatePasswordRecoverySessionId },
  });

  const methods = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: state.email,
      code: "",
    },
  });

  useEffect(() => {
    methods.setFocus("code");
  }, [methods]);

  const handleSubmit = useCallback(
    async (request: VerifyCodeFormValues) => {
      const { data, error } = await onSubmit(request);

      if (error) {
        if (error.type === "PasswordResetSessionExpired") {
          methods.setError("code", {
            type: "manual",
            message: "Password reset session has expired",
          });
        }

        if (error.type === "InvalidPasswordRecoveryCode") {
          methods.setError("code", {
            type: "manual",
            message: "Invalid verification code",
          });
        }

        return;
      }

      actions.updatePasswordRecoverySessionId(data.public_id);
      onGoToStep("password_setup");
    },
    [actions, methods, onGoToStep, onSubmit],
  );

  const handleResend = useCallback(async () => {
    await resendCodeAction({ email: state.email });
  }, [state.email]);

  return (
    <TemplateAuthContent className="large-desktop:max-w-110 max-tablet:py-8">
      <TemplateAuthContentHeader
        title="Password recovery"
        subtitle="Enter the verification code sent to your email"
      />
      <TemplateAuthContentForm className="large-desktop:mx-2.5">
        <Form
          id="verify-code-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            disabled
            value={state.email}
          />
          <Box className="gap-2">
            <TextField label="Secret code" name="code" />
            <ResendTimer textPrefix="Resend code in" onResend={handleResend} />
          </Box>
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter className="large-desktop:mx-2.5">
        <Box className="flex-col gap-4">
          <SubmitButton form="verify-code-form" formState={methods.formState}>
            Confirm and Continue
          </SubmitButton>
          <Button
            variant="secondary"
            className="btn-medium"
            fullWidth
            onClick={() => onGoToStep("email_address")}
          >
            Back
          </Button>
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default VerifyCodeForm;
