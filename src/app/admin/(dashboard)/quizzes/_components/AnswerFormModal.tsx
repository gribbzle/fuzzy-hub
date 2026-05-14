"use client";

import { FormEvent, useId } from "react";

import { cn } from "@utils";

import { AdminModal } from "../../_components/AdminModal";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import {
  AnswerFieldErrors,
  AnswerFieldKey,
  AnswerFormValues,
  AnswerPropertyWeightField,
} from "./QuizQuestionsEditor.shared";

function getPrimarySubmitLabel(isSaving: boolean, isCreate: boolean): string {
  if (isSaving) {
    return "Saving...";
  }
  if (isCreate) {
    return "Create answer";
  }
  return "Save answer";
}

export interface AnswerFormModalProps {
  mode: "create" | "edit";
  open: boolean;
  isSaving: boolean;
  form: AnswerFormValues;
  fieldErrors: AnswerFieldErrors;
  onClearFieldError: (field: AnswerFieldKey) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (updater: (prev: AnswerFormValues) => AnswerFormValues) => void;
  onClose: () => void;
}

export function AnswerFormModal({
  mode,
  open,
  isSaving,
  form,
  fieldErrors,
  onClearFieldError,
  onSubmit,
  onChange,
  onClose,
}: AnswerFormModalProps) {
  const isCreate = mode === "create";
  const textErrorId = useId();

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      backdropDismissDisabled={isSaving}
      titleId={isCreate ? "add-answer-modal-title" : "edit-answer-modal-title"}
      title={isCreate ? "Add answer" : "Edit answer"}
      description={
        isCreate
          ? "Create a new answer for the selected question."
          : "Update this answer for the selected question."
      }
    >
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label
              htmlFor="answer-text-input"
              className="text-xs font-medium uppercase text-zinc-600"
            >
              Answer text
            </label>
            <Input
              id="answer-text-input"
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
              placeholder="Yes, my pet has allergies"
            />
            {fieldErrors.text ? (
              <p id={textErrorId} className="text-xs text-red-600" role="alert">
                {fieldErrors.text}
              </p>
            ) : null}
          </div>
          <div>
            <AnswerPropertyWeightField
              value={form.property_weight}
              errorMessage={fieldErrors.property_weight}
              onChange={(nextWeight) => {
                onClearFieldError("property_weight");
                onChange((prev) => ({
                  ...prev,
                  property_weight: nextWeight,
                }));
              }}
            />
          </div>
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
