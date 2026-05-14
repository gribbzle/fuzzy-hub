"use client";

import { useId } from "react";

import { cn } from "@utils";
import { z } from "zod";

import { TabSelect } from "../../_components/ui/tab-select";

export const QUESTION_PROPERTY_OPTIONS = [
  "time",
  "activity",
  "space",
  "kids",
  "allergy",
  "grooming",
  "interaction",
  "travel",
  "budget",
] as const;

export const QUESTION_PROPERTY_SELECT_OPTIONS = QUESTION_PROPERTY_OPTIONS.map(
  (value) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }),
);

export const ANSWER_PROPERTY_WEIGHT_OPTIONS = [
  "low",
  "medium",
  "high",
] as const;
export const DEFAULT_ANSWER_PROPERTY_WEIGHT = "medium";

export interface QuestionFormValues {
  order_number: number;
  text: string;
  property: string;
}

export type QuestionFieldKey = "text" | "order_number" | "property";

export type QuestionFieldErrors = Partial<Record<QuestionFieldKey, string>>;

const questionFormSchema = z
  .object({
    text: z.string(),
    order_number: z.number(),
    property: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.text.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["text"],
        message: "Question text is required.",
      });
    }
    if (!Number.isFinite(data.order_number) || data.order_number < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["order_number"],
        message: "Order number must be at least 1.",
      });
    }
    if (!data.property) {
      ctx.addIssue({
        code: "custom",
        path: ["property"],
        message: "Property is required.",
      });
      return;
    }
    if (
      !QUESTION_PROPERTY_OPTIONS.includes(
        data.property as (typeof QUESTION_PROPERTY_OPTIONS)[number],
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["property"],
        message: "Property must be selected from the allowed options.",
      });
    }
  });

function firstIssuePerPath(issues: z.core.$ZodIssue[]): QuestionFieldErrors {
  const out: QuestionFieldErrors = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key !== "string") {
      continue;
    }
    if (!(key in out) || out[key as QuestionFieldKey] === undefined) {
      out[key as QuestionFieldKey] = issue.message;
    }
  }
  return out;
}

export function validateQuestionForm(
  form: QuestionFormValues,
): QuestionFieldErrors {
  const result = questionFormSchema.safeParse(form);
  if (result.success) {
    return {};
  }
  return firstIssuePerPath(result.error.issues);
}

export interface AnswerFormValues {
  text: string;
  property_weight: string;
}

export type AnswerFieldKey = "text" | "property_weight";

export type AnswerFieldErrors = Partial<Record<AnswerFieldKey, string>>;

const answerFormSchema = z
  .object({
    text: z.string(),
    property_weight: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.text.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["text"],
        message: "Answer text is required.",
      });
    }
    if (
      !ANSWER_PROPERTY_WEIGHT_OPTIONS.includes(
        data.property_weight as (typeof ANSWER_PROPERTY_WEIGHT_OPTIONS)[number],
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["property_weight"],
        message: "Property weight must be low, medium, or high.",
      });
    }
  });

function firstAnswerIssuePerPath(
  issues: z.core.$ZodIssue[],
): AnswerFieldErrors {
  const out: AnswerFieldErrors = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key !== "string") {
      continue;
    }
    if (!(key in out) || out[key as AnswerFieldKey] === undefined) {
      out[key as AnswerFieldKey] = issue.message;
    }
  }
  return out;
}

export function validateAnswerForm(form: AnswerFormValues): AnswerFieldErrors {
  const result = answerFormSchema.safeParse(form);
  if (result.success) {
    return {};
  }
  return firstAnswerIssuePerPath(result.error.issues);
}

export function AnswerPropertyWeightField({
  value,
  onChange,
  label = "Property weight",
  disabled = false,
  errorMessage,
}: {
  value: string;
  onChange: (next: string) => void;
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
}) {
  const labelId = useId();
  const errorId = useId();

  return (
    <div className="space-y-2">
      <p id={labelId} className="text-xs font-medium uppercase text-zinc-600">
        {label}
      </p>
      <TabSelect
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        ariaLabelledBy={labelId}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? errorId : undefined}
        className={cn(errorMessage && "border-red-500 ring-1 ring-red-200")}
        options={ANSWER_PROPERTY_WEIGHT_OPTIONS.map((option) => ({
          value: option,
          label: option.charAt(0).toUpperCase() + option.slice(1),
        }))}
      />
      {errorMessage ? (
        <p id={errorId} className="text-xs text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

export { getResponseErrorMessage } from "@/utils/apiResponseError";

export function formatAdminDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString();
}
