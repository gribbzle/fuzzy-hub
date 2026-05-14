"use client";

import { useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import {
  updateRegistrationProfileType,
  updateRegistrationSession,
} from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Form, Link } from "@portal/ui/atoms";
import { SubmitButton } from "@portal/ui/molecules";

import { startRegistrationAction } from "@portal/auth/actions";
import {
  StartRegistrationFormValues,
  registrationProfileTypeSchema,
} from "@portal/auth/schemas";
import { UserTypeSelectField } from "@portal/auth/ui/molecules";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentHeader,
} from "@portal/auth/ui/templates";

const RegistrationProfileTypeForm = () => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: { updateRegistrationProfileType, updateRegistrationSession },
  });

  const methods = useForm<StartRegistrationFormValues>({
    resolver: zodResolver(registrationProfileTypeSchema),
    defaultValues: {
      profile_type: state.profile_type,
    },
  });

  const handleSubmit = useCallback(
    async (values: StartRegistrationFormValues) => {
      const { data: registrationSession, error } =
        await startRegistrationAction(values);

      if (error) {
        return;
      }

      actions.updateRegistrationProfileType(values.profile_type);
      actions.updateRegistrationSession(registrationSession.public_id);

      onGoToStep("email_address");
    },
    [actions, onGoToStep],
  );

  return (
    <TemplateAuthContent className="large-desktop:max-w-105 desktop:max-w-100 tablet:max-w-105 max-tablet:gap-6 max-tablet:py-8">
      <TemplateAuthContentHeader
        title="Get Started"
        subtitle="How do you want to use Fuzzy Hub?"
        className="max-tablet:gap-1"
      />
      <Form
        id="profile-type-form"
        methods={methods}
        onSubmit={handleSubmit}
        noValidate
      >
        <UserTypeSelectField name="profile_type" />
      </Form>
      <TemplateAuthContentFooter className="large-desktop:gap-4 tablet:gap-4 large-desktop:mx-0 tablet:mx-0">
        <SubmitButton form="profile-type-form" formState={methods.formState}>
          Continue
        </SubmitButton>
        <Box className="flex-row gap-1.5 justify-center">
          <p className="large-desktop:text-18 text-16 text-text-secondary font-semibold">
            Do you already have an account?
          </p>
          <Link href="./login" className="large-desktop:text-18 text-16">
            Log In
          </Link>
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default RegistrationProfileTypeForm;
