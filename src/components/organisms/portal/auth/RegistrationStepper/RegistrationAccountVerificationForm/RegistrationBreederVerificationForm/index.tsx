"use client";

import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { updateRegistrationBreederVerification } from "@store/actions";
import { useStateMachine } from "little-state-machine";
import { useForm } from "react-hook-form";

import { Box, Form } from "@portal/ui/atoms";
import {
  RadioField,
  RadioGroupField,
  SubmitButton,
} from "@portal/ui/molecules";

import { submitRegistrationStepAction } from "@portal/auth/actions";
import { useSubmitRegistration } from "@portal/auth/hooks";
import { RegistrationSessionResponse } from "@portal/auth/models";
import {
  RegistrationBreederVerificationFormValues,
  registrationBreederVerificationSchema,
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

import CompanyRegistrationTypeForm from "./CompanyRegistrationTypeForm";
import SelfEmployedRegistrationTypeForm from "./SelfEmployedRegistrationTypeForm";

const RegistrationBreederVerificationForm = () => {
  const { onChange: onGoToStep } = useStepper();

  const {
    state: { registration: state },
    actions,
  } = useStateMachine({
    actions: {
      updateRegistrationBreederVerification,
    },
  });

  const methods = useForm<RegistrationBreederVerificationFormValues>({
    resolver: zodResolver(registrationBreederVerificationSchema),
    defaultValues: state.breederVerification,
  });

  useEffect(() => {
    methods.setFocus("company_name");
  }, [methods]);

  const handleGoToFinish = useCallback(() => {
    onGoToStep("finish");
  }, [onGoToStep]);

  const handleGoToPrevious = useCallback(() => {
    onGoToStep("personal_info");
  }, [onGoToStep]);

  const handleSuccess = useCallback(
    (
      variables: RegistrationBreederVerificationFormValues,
      { error }: RegistrationSessionResponse,
    ) => {
      if (error) {
        return;
      }

      actions.updateRegistrationBreederVerification(variables);
    },
    [actions],
  );

  const handleSubmit = useSubmitRegistration({
    queryFn: (values) =>
      submitRegistrationStepAction({
        registrationSession: state.session,
        step: "breeder_verification",
        data: values,
      }),
    onSuccess: handleSuccess,
    onNextStep: handleGoToFinish,
  });

  const handleBusinessTypeChange = useCallback(
    (value: string) => {
      methods.reset({ business_type: value as "company" | "self_employed" });
    },
    [methods],
  );

  return (
    <TemplateAuthContent className="max-tablet:pb-12.25">
      <RegistrationStepHeader
        currentStep={5}
        title="Account Verification"
        subtitle="Select your registration type"
      />
      <TemplateAuthContentForm className="tablet:mx-0">
        <Form
          id="account-verification-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <RadioGroupField
            name="business_type"
            className="flex-row gap-8 tablet:justify-center"
            size="large"
            defaultValue="company"
            onChange={handleBusinessTypeChange}
          >
            <RadioField value="company" label="Company" />
            <RadioField value="self_employed" label="Self-employed" />
          </RadioGroupField>
          {methods.getValues("business_type") === "company" && (
            <CompanyRegistrationTypeForm />
          )}
          {methods.getValues("business_type") === "self_employed" && (
            <SelfEmployedRegistrationTypeForm />
          )}
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <Box className="gap-4">
          <SubmitButton
            form="account-verification-form"
            formState={methods.formState}
          >
            Finish
          </SubmitButton>
          <RegistrationPreviousStepButton onPrevStep={handleGoToPrevious} />
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default RegistrationBreederVerificationForm;
