"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updatePasswordRecoveryEmailAddress } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, ButtonLink, Form, Link } from "@portal/ui/atoms";
import { SubmitButton, TextField } from "@portal/ui/molecules";

import {
  InitiatePasswordRecoveryRequest,
  PasswordRecoveryCodeSentResponse,
} from "@portal/auth/models";
import {
  PasswordRecoveryFormValues,
  passwordRecoveryByEmailSchema,
} from "@portal/auth/schemas";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
  TemplateAuthContentHeader,
} from "@portal/auth/ui/templates";

interface InitiatePasswordRecoveryFormProps {
  onSubmit: (
    request: InitiatePasswordRecoveryRequest,
  ) => Promise<PasswordRecoveryCodeSentResponse>;
  prefixHref?: string;
}

const InitiatePasswordRecoveryForm = ({
  onSubmit,
  prefixHref = "",
}: InitiatePasswordRecoveryFormProps) => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { passwordRecovery: state },
    actions,
  } = useStateMachine({
    actions: { updatePasswordRecoveryEmailAddress },
  });

  const methods = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(passwordRecoveryByEmailSchema),
    defaultValues: {
      email: state.email,
    },
  });

  useEffect(() => {
    methods.setFocus("email");
  }, [methods]);

  const handleSubmit = useCallback(
    async (request: PasswordRecoveryFormValues) => {
      const { error } = await onSubmit(request);

      if (error) {
        if (error.type === "InvalidEmail") {
          methods.setError("email", {
            type: "manual",
            message: "Invalid email",
          });
        }

        return;
      }

      actions.updatePasswordRecoveryEmailAddress(request.email);
      onGoToStep("code");
    },
    [actions, methods, onGoToStep, onSubmit],
  );

  return (
    <TemplateAuthContent className="large-desktop:max-w-110 max-tablet:py-8">
      <TemplateAuthContentHeader
        title="Password recovery"
        subtitle="Please enter your email to continue"
      />
      <TemplateAuthContentForm className="large-desktop:mx-2.5">
        <Form
          id="password-recovery-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField label="Email" type="email" name="email" />
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter className="large-desktop:mx-2.5">
        <Box className="gap-4">
          <SubmitButton
            formState={methods.formState}
            form="password-recovery-form"
          >
            Recover Password
          </SubmitButton>
          <ButtonLink
            variant="secondary"
            fullWidth
            href={`${prefixHref}/login`}
          >
            Back
          </ButtonLink>
          <Box className="w-full items-center">
            <Link
              href="#"
              className="large-desktop:text-18 text-16"
              onClick={() => onGoToStep("secret_question")}
            >
              Recover by secret question
            </Link>
          </Box>
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default InitiatePasswordRecoveryForm;
