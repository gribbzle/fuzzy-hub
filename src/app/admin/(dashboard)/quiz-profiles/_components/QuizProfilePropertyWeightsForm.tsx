"use client";

import { useId, useMemo, useState } from "react";

import { useAdminQuizProfilePropertyWeightsQuery } from "@/app/admin/(dashboard)/_hooks/useAdminQuizProfilePropertyWeightsQuery";
import {
  type AdminQuizProfilePropertyWeightsData,
  QUIZ_PROFILE_PROPERTY_WEIGHT_KEYS,
} from "@/app/admin/(dashboard)/_models";
import { Controller, useForm } from "react-hook-form";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { useAdminNotifications } from "../../_components/AdminNotifications";
import { FormErrorAlert } from "../../_components/FormErrorAlert";
import {
  TabSelect,
  type TabSelectOption,
} from "../../_components/ui/tab-select";
import { useSubmitErrorWithToast } from "../../_components/useSubmitErrorWithToast";
import {
  labelForQuizProfilePropertyWeightKey,
  normalizeQuizProfilePropertyWeights,
  submitQuizProfilePropertyWeightsRequest,
} from "../_utils/quizProfilePropertyWeightsSubmit";

const WEIGHT_SEGMENT_OPTIONS: TabSelectOption[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

function QuizProfileWeightRow({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  disabled: boolean;
}) {
  const labelId = useId();

  return (
    <div className="space-y-2">
      <p id={labelId} className="text-xs font-medium uppercase text-zinc-600">
        {label}
      </p>
      <TabSelect
        ariaLabelledBy={labelId}
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        options={WEIGHT_SEGMENT_OPTIONS}
      />
    </div>
  );
}

interface QuizProfilePropertyWeightsFormProps {
  quizProfileId: string;
}

export function QuizProfilePropertyWeightsForm({
  quizProfileId,
}: QuizProfilePropertyWeightsFormProps) {
  const {
    data,
    error: loadError,
    isLoading,
    mutate,
  } = useAdminQuizProfilePropertyWeightsQuery(quizProfileId);

  const defaultWeights = useMemo(
    (): AdminQuizProfilePropertyWeightsData =>
      normalizeQuizProfilePropertyWeights(undefined),
    [],
  );

  const formValues = useMemo((): AdminQuizProfilePropertyWeightsData => {
    return normalizeQuizProfilePropertyWeights(
      data?.data as Record<string, unknown>,
    );
  }, [data?.data]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AdminQuizProfilePropertyWeightsData>({
    defaultValues: defaultWeights,
    values: formValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const { notifySuccess } = useAdminNotifications();
  const setSubmitErrorWithToast = useSubmitErrorWithToast(setSubmitError);

  return (
    <AdminEntityFormCard
      title="Property weights"
      description="Adjust how strongly each lifestyle dimension influences matching for this profile."
      fullWidth
      submitError={submitError}
      submitIdleLabel="Save weights"
      submitPendingLabel="Saving..."
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(async (values) => {
        const ok = await submitQuizProfilePropertyWeightsRequest({
          quizProfileId,
          values,
          setSubmitError: setSubmitErrorWithToast,
        });
        if (!ok) {
          return;
        }
        await mutate();
        notifySuccess("Property weights saved successfully.");
      })}
      backHref="/admin/quiz-profiles"
      backLabel="Back to quiz profiles"
    >
      {loadError ? (
        <FormErrorAlert className="mb-4">
          {loadError instanceof Error
            ? loadError.message
            : "Failed to load property weights."}
        </FormErrorAlert>
      ) : null}
      {isLoading && !data ? (
        <p className="text-sm text-zinc-500">Loading property weights...</p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {QUIZ_PROFILE_PROPERTY_WEIGHT_KEYS.map((key) => (
          <Controller
            key={key}
            name={key}
            control={control}
            render={({ field }) => (
              <QuizProfileWeightRow
                label={labelForQuizProfilePropertyWeightKey(key)}
                value={field.value}
                disabled={isLoading && !data}
                onChange={field.onChange}
              />
            )}
          />
        ))}
      </div>
    </AdminEntityFormCard>
  );
}
