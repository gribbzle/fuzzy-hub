"use client";

import { useParams } from "next/navigation";

import { AdminEntityFormCard } from "../../../_components/AdminEntityFormCard";
import { AdminEntityFormQueryState } from "../../../_components/AdminEntityFormQueryState";
import { QuizFormFields } from "../../_components/QuizFormFields";
import { QuizQuestionsEditor } from "../../_components/QuizQuestionsEditor";
import { useAdminQuizForm } from "../../_hooks/useAdminQuizForm";

const EditQuizPage = () => {
  const params = useParams<{ quizId: string }>();
  const quizId = decodeURIComponent(params.quizId ?? "");

  const {
    control,
    errors,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    loadError,
    isLoading,
  } = useAdminQuizForm({ mode: "edit", quizId });

  return (
    <>
      <AdminEntityFormCard
        title="Edit quiz"
        description="Update quiz name and status."
        submitError={submitError}
        submitIdleLabel="Save changes"
        submitPendingLabel="Saving..."
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        backHref="/admin/quizzes"
        backLabel="Back to quizzes"
      >
        <AdminEntityFormQueryState
          loadError={loadError}
          loadErrorFallback="Failed to load quiz."
          isLoading={isLoading}
          loadingMessage="Loading quiz details..."
          canRender
          showNonBlockingError
          showLoadingWhileRenderable
        >
          <QuizFormFields
            control={control}
            errors={errors}
            quizId={quizId}
            showQuizId
          />
        </AdminEntityFormQueryState>
      </AdminEntityFormCard>

      <QuizQuestionsEditor quizId={quizId} />
    </>
  );
};

export default EditQuizPage;
