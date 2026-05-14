"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTabs as useStepper } from "@portal/contexts";
import { useForm } from "react-hook-form";

import { Box, Button, Form } from "@portal/ui/atoms";
import { SelectField, SubmitButton, TextField } from "@portal/ui/molecules";

import { InitiatePasswordRecoveryRequest } from "@portal/auth/models";
import { passwordRecoveryByEmailSchema } from "@portal/auth/schemas";
import {
  TemplateAuthContent,
  TemplateAuthContentFooter,
  TemplateAuthContentForm,
  TemplateAuthContentHeader,
} from "@portal/auth/ui/templates";

const SECURITY_QUESTIONS = [
  { value: "first_pet", label: "What was the name of your first pet?" },
  { value: "mothers_maiden", label: "What is your mother's maiden name?" },
  { value: "birth_city", label: "What city were you born in?" },
  {
    value: "elementary_school",
    label: "What was the name of your elementary school?",
  },
  {
    value: "childhood_friend",
    label: "What was the name of your childhood best friend?",
  },
];

export interface SecretQuestionFormProps {
  onSuccess?: () => void;
}

const SecretQuestionForm = ({ onSuccess }: SecretQuestionFormProps) => {
  const { onChange: onGoToStep } = useStepper();

  const methods = useForm<InitiatePasswordRecoveryRequest>({
    resolver: zodResolver(passwordRecoveryByEmailSchema),
  });

  const handleSubmit = async () => {
    onSuccess?.();
  };

  return (
    <TemplateAuthContent className="max-tablet:py-8">
      <TemplateAuthContentHeader
        title="Password recovery"
        subtitle="Please enter your details to continue"
      />
      <TemplateAuthContentForm>
        <Form
          id="password-recovery-form"
          methods={methods}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField label="Email" type="email" name="email" />
          <SelectField
            label="Security question"
            name="question"
            placeholder="Select question"
            options={SECURITY_QUESTIONS}
          />
          <TextField label="Answer" type="text" name="answer" />
        </Form>
      </TemplateAuthContentForm>
      <TemplateAuthContentFooter>
        <Box className="gap-4">
          <SubmitButton
            form="password-recovery-form"
            formState={methods.formState}
          >
            Confirm and Continue
          </SubmitButton>
          <Button
            variant="secondary"
            fullWidth
            onClick={() => onGoToStep("email_address")}
            className="btn-medium"
          >
            Back
          </Button>
        </Box>
      </TemplateAuthContentFooter>
    </TemplateAuthContent>
  );
};

export default SecretQuestionForm;
