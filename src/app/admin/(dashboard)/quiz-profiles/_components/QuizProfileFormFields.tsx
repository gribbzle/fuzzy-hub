"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import type { QuizProfileFormValues } from "../_utils/quizProfileFormSubmit";

interface QuizProfileFormFieldsProps {
  control: Control<QuizProfileFormValues>;
  errors: FieldErrors<QuizProfileFormValues>;
  quizProfileId?: string;
  showQuizProfileId?: boolean;
}

export function QuizProfileFormFields({
  control,
  errors,
  quizProfileId,
  showQuizProfileId,
}: QuizProfileFormFieldsProps) {
  return (
    <div className="space-y-4">
      {showQuizProfileId && quizProfileId ? (
        <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          Profile ID:{" "}
          <span className="font-mono text-xs break-all">{quizProfileId}</span>
        </div>
      ) : null}

      <FormField
        id="quiz-profile-name"
        label="Name"
        errorMessage={errors.name?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <Input
              id="quiz-profile-name"
              type="text"
              autoComplete="off"
              placeholder="Profile name"
              {...field}
            />
          )}
        />
      </FormField>
    </div>
  );
}
