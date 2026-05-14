"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminLocalListPagination } from "@/app/admin/(dashboard)/_hooks/useAdminLocalListPagination";
import { useAdminQuizQuestionAnswersQuery } from "@/app/admin/(dashboard)/_hooks/useAdminQuizQuestionAnswersQuery";
import { useAdminQuizQuestionsQuery } from "@/app/admin/(dashboard)/_hooks/useAdminQuizQuestionsQuery";

import { AdminConfirmDialog } from "../../_components/AdminConfirmDialog";
import { useAdminNotifications } from "../../_components/AdminNotifications";
import { DEFAULT_ADMIN_TABLE_LIMIT } from "../../_components/adminTableUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card";
import { QuizAnswerFormModals } from "./QuizAnswerFormModals";
import { QuizAnswersSection } from "./QuizAnswersSection";
import { QuizQuestionFormModals } from "./QuizQuestionFormModals";
import type {
  AnswerFieldKey,
  AnswerFormValues,
  QuestionFieldKey,
  QuestionFormValues,
} from "./QuizQuestionsEditor.shared";
import { QuizQuestionsSection } from "./QuizQuestionsSection";
import { QuizQuestionsEditorLoadAlerts } from "./quiz-questions/QuizQuestionsEditorLoadAlerts";
import { QuizSingleChoiceNotice } from "./quiz-questions/QuizSingleChoiceNotice";
import { useQuizQuestionsCrud } from "./useQuizQuestionsCrud";
import { useQuizQuestionsEditorState } from "./useQuizQuestionsEditorState";

export function QuizQuestionsEditor({ quizId }: { quizId: string }) {
  const { notifySuccess, notifyError } = useAdminNotifications();
  const [questionsPage, setQuestionsPage] = useState(1);
  const [questionsLimit, setQuestionsLimit] = useState(
    DEFAULT_ADMIN_TABLE_LIMIT,
  );

  const {
    data: questionsResponse,
    error: questionsError,
    isLoading: isLoadingQuestions,
    mutate: mutateQuestions,
  } = useAdminQuizQuestionsQuery(quizId, questionsPage, questionsLimit);

  const totalQuestions = questionsResponse?.data.total ?? 0;
  const hasListData = Boolean(questionsResponse?.data);

  const {
    pageForDisplay: questionsPageForDisplay,
    totalPages: questionsTotalPages,
    rangeStart: questionsRangeStart,
    rangeEnd: questionsRangeEnd,
    canPrev: canPrevQuestionsPage,
    canNext: canNextQuestionsPage,
    pageItems: questionPageItems,
  } = useAdminLocalListPagination({
    hasListData,
    total: totalQuestions,
    page: questionsPage,
    setPage: setQuestionsPage,
    limit: questionsLimit,
  });

  const questions = useMemo(
    () => questionsResponse?.data.items ?? [],
    [questionsResponse?.data.items],
  );

  const defaultOrderNumber = useMemo(() => {
    if (questions.length === 0) {
      return 1;
    }
    return Math.max(...questions.map((item) => item.order_number || 0)) + 1;
  }, [questions]);

  const {
    activeQuestionId,
    editingQuestionId,
    editingAnswerId,
    isAddQuestionModalOpen,
    isEditQuestionModalOpen,
    isAddAnswerModalOpen,
    isEditAnswerModalOpen,
    deleteTargetQuestionId,
    deleteTargetAnswerId,
    actionError,
    questionFieldErrors,
    setQuestionFieldErrors,
    answerFieldErrors,
    setAnswerFieldErrors,
    questionForm,
    answerForm,
    setActionError,
    setQuestionForm,
    setAnswerForm,
    setIsAddQuestionModalOpen,
    setIsEditQuestionModalOpen,
    setIsAddAnswerModalOpen,
    setIsEditAnswerModalOpen,
    setDeleteTargetQuestionId,
    setDeleteTargetAnswerId,
    resetQuestionForm,
    resetAnswerForm,
    handleQuestionSelectionChange,
    openAddQuestionModal,
    openAddAnswerModal,
    startQuestionEdit,
    startAnswerEdit,
    requestDeleteQuestion,
    requestDeleteAnswer,
    handleQuestionDeleted,
    handleAnswerDeleted,
  } = useQuizQuestionsEditorState({
    questions,
    defaultOrderNumber,
  });

  const clearQuestionFieldError = useCallback(
    (field: QuestionFieldKey) => {
      setQuestionFieldErrors((prev) => {
        if (!prev[field]) {
          return prev;
        }
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [setQuestionFieldErrors],
  );

  const clearAnswerFieldError = useCallback(
    (field: AnswerFieldKey) => {
      setAnswerFieldErrors((prev) => {
        if (!prev[field]) {
          return prev;
        }
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [setAnswerFieldErrors],
  );

  const {
    data: answersResponse,
    error: answersError,
    isLoading: isLoadingAnswers,
    mutate: mutateAnswers,
  } = useAdminQuizQuestionAnswersQuery(quizId, activeQuestionId);
  const answers = answersResponse?.data.items ?? [];

  const {
    isSavingQuestion,
    isSavingAnswer,
    deletingQuestionId,
    deletingAnswerId,
    submitQuestion,
    confirmDeleteQuestion,
    submitAnswer,
    confirmDeleteAnswer,
  } = useQuizQuestionsCrud({
    quizId,
    activeQuestionId,
    editingQuestionId,
    editingAnswerId,
    questionForm,
    answerForm,
    mutateQuestions,
    mutateAnswers,
    setActionError,
    setQuestionFieldErrors,
    setAnswerFieldErrors,
    resetQuestionForm,
    resetAnswerForm,
    onQuestionSaved: (isEditing) => {
      if (isEditing) {
        setIsEditQuestionModalOpen(false);
        return;
      }
      setIsAddQuestionModalOpen(false);
    },
    onQuestionDeleted: handleQuestionDeleted,
    onAnswerSaved: (isEditing) => {
      if (isEditing) {
        setIsEditAnswerModalOpen(false);
        return;
      }
      setIsAddAnswerModalOpen(false);
    },
    onAnswerDeleted: handleAnswerDeleted,
    notifySuccess,
    notifyError,
  });

  const questionFormShared = useMemo(
    () => ({
      isSaving: isSavingQuestion,
      form: questionForm,
      fieldErrors: questionFieldErrors,
      onClearFieldError: clearQuestionFieldError,
      onSubmit: submitQuestion,
      onChange: (updater: (prev: QuestionFormValues) => QuestionFormValues) =>
        setQuestionForm((prev) => updater(prev)),
    }),
    [
      clearQuestionFieldError,
      isSavingQuestion,
      questionFieldErrors,
      questionForm,
      setQuestionForm,
      submitQuestion,
    ],
  );

  const answerFormShared = useMemo(
    () => ({
      isSaving: isSavingAnswer,
      form: answerForm,
      fieldErrors: answerFieldErrors,
      onClearFieldError: clearAnswerFieldError,
      onSubmit: submitAnswer,
      onChange: (updater: (prev: AnswerFormValues) => AnswerFormValues) =>
        setAnswerForm((prev) => updater(prev)),
    }),
    [
      answerFieldErrors,
      answerForm,
      clearAnswerFieldError,
      isSavingAnswer,
      setAnswerForm,
      submitAnswer,
    ],
  );

  return (
    <div className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Questions and answers</CardTitle>
            <CardDescription>
              Configure quiz questions and single-choice answers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <QuizSingleChoiceNotice />

            <QuizQuestionsEditorLoadAlerts
              questionsError={questionsError}
              answersError={answersError}
              actionError={actionError}
            />

            <QuizQuestionsSection
              list={{
                questions,
                totalQuestions,
                isLoadingQuestions,
                activeQuestionId,
                deletingQuestionId,
              }}
              pagination={{
                page: questionsPageForDisplay,
                limit: questionsLimit,
                totalPages: questionsTotalPages,
                rangeStart: questionsRangeStart,
                rangeEnd: questionsRangeEnd,
                canPrev: canPrevQuestionsPage,
                canNext: canNextQuestionsPage,
                pageItems: questionPageItems,
              }}
              actions={{
                onAddQuestion: openAddQuestionModal,
                onPageChange: (nextPage) =>
                  setQuestionsPage(Math.max(1, nextPage)),
                onLimitChangeValue: (nextLimit) => {
                  setQuestionsLimit(nextLimit);
                  setQuestionsPage(1);
                },
                onSelectQuestion: handleQuestionSelectionChange,
                onEditQuestion: startQuestionEdit,
                onDeleteQuestion: requestDeleteQuestion,
              }}
            />

            <QuizAnswersSection
              activeQuestionId={activeQuestionId}
              answers={answers}
              isLoadingAnswers={isLoadingAnswers}
              deletingAnswerId={deletingAnswerId}
              onAddAnswer={openAddAnswerModal}
              onEditAnswer={startAnswerEdit}
              onDeleteAnswer={requestDeleteAnswer}
            />
          </CardContent>
        </Card>
      </div>

      <AdminConfirmDialog
        open={Boolean(deleteTargetQuestionId)}
        title="Delete question?"
        titleId="delete-question-title"
        descriptionId="delete-question-description"
        description="This action cannot be undone. The question and all its answers will be permanently removed."
        onCancel={() => setDeleteTargetQuestionId(null)}
        onConfirm={() => confirmDeleteQuestion(deleteTargetQuestionId)}
        isProcessing={Boolean(
          deleteTargetQuestionId &&
          deletingQuestionId === deleteTargetQuestionId,
        )}
        backdropDismissDisabled={Boolean(
          deleteTargetQuestionId &&
          deletingQuestionId === deleteTargetQuestionId,
        )}
      />

      <AdminConfirmDialog
        open={Boolean(deleteTargetAnswerId)}
        title="Delete answer?"
        titleId="delete-answer-title"
        descriptionId="delete-answer-description"
        description="This action cannot be undone. The selected answer will be permanently removed."
        onCancel={() => setDeleteTargetAnswerId(null)}
        onConfirm={() => confirmDeleteAnswer(deleteTargetAnswerId)}
        isProcessing={Boolean(
          deleteTargetAnswerId && deletingAnswerId === deleteTargetAnswerId,
        )}
        backdropDismissDisabled={Boolean(
          deleteTargetAnswerId && deletingAnswerId === deleteTargetAnswerId,
        )}
      />

      <QuizQuestionFormModals
        shared={questionFormShared}
        create={{
          open: isAddQuestionModalOpen,
          onClose: () => setIsAddQuestionModalOpen(false),
        }}
        edit={{
          open: isEditQuestionModalOpen && Boolean(editingQuestionId),
          onClose: () => {
            setIsEditQuestionModalOpen(false);
            resetQuestionForm();
          },
        }}
      />

      <QuizAnswerFormModals
        shared={answerFormShared}
        create={{
          open: isAddAnswerModalOpen,
          onClose: () => setIsAddAnswerModalOpen(false),
        }}
        edit={{
          open: isEditAnswerModalOpen && Boolean(editingAnswerId),
          onClose: () => {
            setIsEditAnswerModalOpen(false);
            resetAnswerForm();
          },
        }}
      />
    </div>
  );
}
