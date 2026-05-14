"use client";

import { FormEvent, useId } from "react";

import { cn } from "@utils";

import { AdminModal } from "../../_components/AdminModal";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import { Select } from "../../_components/ui/select";
import {
  QUESTION_PROPERTY_SELECT_OPTIONS,
  QuestionFieldErrors,
  QuestionFieldKey,
  QuestionFormValues,
} from "./QuizQuestionsEditor.shared";

function getPrimarySubmitLabel(isSaving: boolean, isCreate: boolean): string {
  if (isSaving) {
    return "Saving...";
  }
  if (isCreate) {
    return "Create question";
  }
  return "Save question";
}

export interface QuestionFormModalProps {
  mode: "create" | "edit";
  open: boolean;
  isSaving: boolean;
  form: QuestionFormValues;
  fieldErrors: QuestionFieldErrors;
  onClearFieldError: (field: QuestionFieldKey) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (updater: (prev: QuestionFormValues) => QuestionFormValues) => void;
  onClose: () => void;
}

export function QuestionFormModal({
  mode,
  open,
  isSaving,
  form,
  fieldErrors,
  onClearFieldError,
  onSubmit,
  onChange,
  onClose,
}: QuestionFormModalProps) {
  const isCreate = mode === "create";
  const propertySelectId = useId();
  const orderErrorId = useId();
  const propertyErrorId = useId();
  const textErrorId = useId();

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      backdropDismissDisabled={isSaving}
      titleId={
        isCreate ? "add-question-modal-title" : "edit-question-modal-title"
      }
      title={isCreate ? "Add question" : "Edit question"}
      description={
        isCreate
          ? "Create a new question for this quiz."
          : "Update this question for the quiz."
      }
    >
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
          <div className="space-y-1">
            <label
              htmlFor="question-order-input"
              className="text-xs font-medium uppercase text-zinc-600"
            >
              Order
            </label>
            <Input
              id="question-order-input"
              inputSize="compact"
              type="number"
              min={1}
              aria-invalid={Boolean(fieldErrors.order_number)}
              aria-describedby={
                fieldErrors.order_number ? orderErrorId : undefined
              }
              className={cn(
                fieldErrors.order_number &&
                  "border-red-500 focus:border-red-500 focus:ring-red-200",
              )}
              value={form.order_number}
              onChange={(event) => {
                onClearFieldError("order_number");
                onChange((prev) => ({
                  ...prev,
                  order_number: Number(event.target.value || 0),
                }));
              }}
            />
            {fieldErrors.order_number ? (
              <p
                id={orderErrorId}
                className="text-xs text-red-600"
                role="alert"
              >
                {fieldErrors.order_number}
              </p>
            ) : null}
          </div>
          <div className="space-y-1">
            <label
              htmlFor={propertySelectId}
              className="block text-xs font-medium uppercase text-zinc-600"
            >
              Property key
            </label>
            <Select
              id={propertySelectId}
              placeholder="Select property"
              disabled={isSaving}
              className={cn(
                "w-full",
                fieldErrors.property &&
                  "[&_button]:border-red-500 [&_button]:focus:border-red-500 [&_button]:focus:ring-red-200",
              )}
              value={form.property}
              onValueChange={(value) => {
                onClearFieldError("property");
                onChange((prev) => ({
                  ...prev,
                  property: value,
                }));
              }}
              options={[...QUESTION_PROPERTY_SELECT_OPTIONS]}
            />
            {fieldErrors.property ? (
              <p
                id={propertyErrorId}
                className="text-xs text-red-600"
                role="alert"
              >
                {fieldErrors.property}
              </p>
            ) : null}
          </div>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="question-text-input"
            className="text-xs font-medium uppercase text-zinc-600"
          >
            Question text
          </label>
          <Input
            id="question-text-input"
            inputSize="compact"
            type="text"
            aria-invalid={Boolean(fieldErrors.text)}
            aria-describedby={fieldErrors.text ? textErrorId : undefined}
            className={cn(
              fieldErrors.text &&
                "border-red-500 focus:border-red-500 focus:ring-red-200",
            )}
            value={form.text}
            onChange={(event) => {
              onClearFieldError("text");
              onChange((prev) => ({
                ...prev,
                text: event.target.value,
              }));
            }}
            placeholder="Does your pet have any allergies?"
          />
          {fieldErrors.text ? (
            <p id={textErrorId} className="text-xs text-red-600" role="alert">
              {fieldErrors.text}
            </p>
          ) : null}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {getPrimarySubmitLabel(isSaving, isCreate)}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}
