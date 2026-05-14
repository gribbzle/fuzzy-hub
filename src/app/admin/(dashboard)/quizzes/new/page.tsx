"use client";

import { AdminEntityFormCard } from "../../_components/AdminEntityFormCard";
import { QuizFormFields } from "../_components/QuizFormFields";
import { useAdminQuizForm } from "../_hooks/useAdminQuizForm";

const NewQuizPage = () => {
  const { control, errors, isSubmitting, submitError, handleSubmit, onSubmit } =
    useAdminQuizForm({ mode: "create" });

  return (
    <AdminEntityFormCard
      title="Add new quiz"
      description="Set a name and status for the quiz."
      submitError={submitError}
      submitIdleLabel="Create quiz"
      submitPendingLabel="Creating..."
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      backHref="/admin/quizzes"
      backLabel="Back to quizzes"
    >
      <QuizFormFields control={control} errors={errors} />
    </AdminEntityFormCard>
  );
};

export default NewQuizPage;
