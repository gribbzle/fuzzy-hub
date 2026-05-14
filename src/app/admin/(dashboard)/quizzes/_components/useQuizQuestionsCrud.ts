"use client";

import { FormEvent, useState } from "react";

import { adminJsonRequest } from "../../_utils/adminJsonRequest";
import {
  AnswerFieldErrors,
  AnswerFormValues,
  QuestionFieldErrors,
  QuestionFormValues,
  validateAnswerForm,
  validateQuestionForm,
} from "./QuizQuestionsEditor.shared";

interface UseQuizQuestionsCrudOptions {
  quizId: string;
  activeQuestionId: string | null;
  editingQuestionId: string | null;
  editingAnswerId: string | null;
  questionForm: QuestionFormValues;
  answerForm: AnswerFormValues;
  mutateQuestions: () => Promise<unknown>;
  mutateAnswers: () => Promise<unknown>;
  setActionError: (value: string | null) => void;
  setQuestionFieldErrors: (
    value:
      | QuestionFieldErrors
      | ((prev: QuestionFieldErrors) => QuestionFieldErrors),
  ) => void;
  setAnswerFieldErrors: (
    value: AnswerFieldErrors | ((prev: AnswerFieldErrors) => AnswerFieldErrors),
  ) => void;
  resetQuestionForm: () => void;
  resetAnswerForm: () => void;
  onQuestionSaved: (isEditing: boolean) => void;
  onQuestionDeleted: (deletedQuestionId: string) => void;
  onAnswerSaved: (isEditing: boolean) => void;
  onAnswerDeleted: (deletedAnswerId: string) => void;
  notifySuccess: (message: string) => void;
  notifyError: (message: string) => void;
}

export function useQuizQuestionsCrud({
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
  onQuestionSaved,
  onQuestionDeleted,
  onAnswerSaved,
  onAnswerDeleted,
  notifySuccess,
  notifyError,
}: UseQuizQuestionsCrudOptions) {
  const [isSavingQuestion, setIsSavingQuestion] = useState(false);
  const [isSavingAnswer, setIsSavingAnswer] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(
    null,
  );
  const [deletingAnswerId, setDeletingAnswerId] = useState<string | null>(null);

  function showActionError(message: string) {
    setActionError(message);
    notifyError(message);
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fieldErrors = validateQuestionForm(questionForm);
    if (Object.keys(fieldErrors).length > 0) {
      setQuestionFieldErrors(fieldErrors);
      return;
    }

    setQuestionFieldErrors({});
    setActionError(null);
    setIsSavingQuestion(true);
    const isEditingQuestion = Boolean(editingQuestionId);

    const questionPath =
      isEditingQuestion && editingQuestionId
        ? `/admin/quizzes/${encodeURIComponent(quizId)}/questions/${encodeURIComponent(editingQuestionId)}`
        : `/admin/quizzes/${encodeURIComponent(quizId)}/questions`;
    const method = isEditingQuestion ? "PATCH" : "POST";

    const result = await adminJsonRequest({
      path: questionPath,
      method,
      body: {
        order_number: questionForm.order_number,
        text: questionForm.text.trim(),
        property: questionForm.property.trim(),
      },
      networkErrorMessage: "Failed to save question.",
      httpErrorFallback: "Failed to save question.",
    });

    if (!result.ok) {
      setQuestionFieldErrors({});
      if (result.kind === "unauthorized") {
        setIsSavingQuestion(false);
        return;
      }
      showActionError(result.message);
      setIsSavingQuestion(false);
      return;
    }

    await mutateQuestions();
    resetQuestionForm();
    onQuestionSaved(isEditingQuestion);
    setIsSavingQuestion(false);
    notifySuccess(
      isEditingQuestion
        ? "Question updated successfully."
        : "Question created successfully.",
    );
  }

  async function confirmDeleteQuestion(deleteTargetQuestionId: string | null) {
    if (!deleteTargetQuestionId) {
      return;
    }

    setActionError(null);
    setDeletingQuestionId(deleteTargetQuestionId);

    const questionDeletePath = `/admin/quizzes/${encodeURIComponent(quizId)}/questions/${encodeURIComponent(deleteTargetQuestionId)}`;

    const result = await adminJsonRequest({
      path: questionDeletePath,
      method: "DELETE",
      networkErrorMessage: "Failed to delete question.",
      httpErrorFallback: "Failed to delete question.",
    });

    if (!result.ok) {
      if (result.kind === "unauthorized") {
        setDeletingQuestionId(null);
        return;
      }
      showActionError(result.message);
      setDeletingQuestionId(null);
      return;
    }

    onQuestionDeleted(deleteTargetQuestionId);
    await mutateQuestions();
    setDeletingQuestionId(null);
    notifySuccess("Question deleted successfully.");
  }

  async function submitAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeQuestionId) {
      return;
    }

    const answerFieldErrors = validateAnswerForm(answerForm);
    if (Object.keys(answerFieldErrors).length > 0) {
      setAnswerFieldErrors(answerFieldErrors);
      return;
    }

    setAnswerFieldErrors({});
    setActionError(null);
    setIsSavingAnswer(true);
    const isEditingAnswer = Boolean(editingAnswerId);

    const answerPath =
      isEditingAnswer && editingAnswerId
        ? `/admin/quizzes/${encodeURIComponent(quizId)}/questions/${encodeURIComponent(activeQuestionId)}/answers/${encodeURIComponent(editingAnswerId)}`
        : `/admin/quizzes/${encodeURIComponent(quizId)}/questions/${encodeURIComponent(activeQuestionId)}/answers`;
    const method = isEditingAnswer ? "PATCH" : "POST";

    const result = await adminJsonRequest({
      path: answerPath,
      method,
      body: {
        text: answerForm.text.trim(),
        property_weight: answerForm.property_weight.trim(),
      },
      networkErrorMessage: "Failed to save answer.",
      httpErrorFallback: "Failed to save answer.",
    });

    if (!result.ok) {
      setAnswerFieldErrors({});
      if (result.kind === "unauthorized") {
        setIsSavingAnswer(false);
        return;
      }
      showActionError(result.message);
      setIsSavingAnswer(false);
      return;
    }

    await mutateAnswers();
    resetAnswerForm();
    onAnswerSaved(isEditingAnswer);
    setIsSavingAnswer(false);
    notifySuccess(
      isEditingAnswer
        ? "Answer updated successfully."
        : "Answer created successfully.",
    );
  }

  async function confirmDeleteAnswer(deleteTargetAnswerId: string | null) {
    if (!activeQuestionId || !deleteTargetAnswerId) {
      return;
    }

    setActionError(null);
    setDeletingAnswerId(deleteTargetAnswerId);

    const answerDeletePath = `/admin/quizzes/${encodeURIComponent(quizId)}/questions/${encodeURIComponent(activeQuestionId)}/answers/${encodeURIComponent(deleteTargetAnswerId)}`;

    const result = await adminJsonRequest({
      path: answerDeletePath,
      method: "DELETE",
      networkErrorMessage: "Failed to delete answer.",
      httpErrorFallback: "Failed to delete answer.",
    });

    if (!result.ok) {
      if (result.kind === "unauthorized") {
        setDeletingAnswerId(null);
        return;
      }
      showActionError(result.message);
      setDeletingAnswerId(null);
      return;
    }

    onAnswerDeleted(deleteTargetAnswerId);
    await mutateAnswers();
    setDeletingAnswerId(null);
    notifySuccess("Answer deleted successfully.");
  }

  return {
    isSavingQuestion,
    isSavingAnswer,
    deletingQuestionId,
    deletingAnswerId,
    submitQuestion,
    confirmDeleteQuestion,
    submitAnswer,
    confirmDeleteAnswer,
  };
}
