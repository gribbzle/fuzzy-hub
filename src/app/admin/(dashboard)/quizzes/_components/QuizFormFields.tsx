"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { TabSelect } from "../../_components/ui/tab-select";
import type { QuizFormValues } from "../_utils/quizFormSubmit";

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;

interface QuizFormFieldsProps {
  control: Control<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  quizId?: string;
  showQuizId?: boolean;
}

export function QuizFormFields({
  control,
  errors,
  quizId,
  showQuizId,
}: QuizFormFieldsProps) {
  return (
    <div className="space-y-4">
      {showQuizId && quizId ? (
        <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          Quiz ID: <span className="font-mono text-xs break-all">{quizId}</span>
        </div>
      ) : null}

      <FormField
        id="quiz-name"
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
              id="quiz-name"
              type="text"
              autoComplete="off"
              placeholder="Quiz name"
              {...field}
            />
          )}
        />
      </FormField>

      <div className="space-y-2">
        <p id="quiz-status-label" className="text-sm font-medium text-zinc-900">
          Status
        </p>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TabSelect
              value={field.value}
              onValueChange={field.onChange}
              options={[...STATUS_OPTIONS]}
              ariaLabelledBy="quiz-status-label"
            />
          )}
        />
      </div>
    </div>
  );
}
