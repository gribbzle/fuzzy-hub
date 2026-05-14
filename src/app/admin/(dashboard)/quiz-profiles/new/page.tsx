"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { QuizProfileFormFields } from "../_components/QuizProfileFormFields";
import { useAdminQuizProfileForm } from "../_hooks/useAdminQuizProfileForm";

const NewQuizProfilePage = () => {
  const { control, errors, isSubmitting, submitError, handleSubmit, onSubmit } =
    useAdminQuizProfileForm({ mode: "create" });

  return (
    <AdminEntityFormCard
      title="Add quiz profile"
      description="Create a profile with a display name. You can set property weights after saving."
      submitError={submitError}
      submitIdleLabel="Create profile"
      submitPendingLabel="Creating..."
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/quiz-profiles"
      backLabel="Back to quiz profiles"
    >
      <QuizProfileFormFields control={control} errors={errors} />
    </AdminEntityFormCard>
  );
};

export default NewQuizProfilePage;
