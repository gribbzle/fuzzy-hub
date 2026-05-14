"use client";

import { useMemo, useState } from "react";

import {
  AdminQuizQuestionAnswerItem,
  AdminQuizQuestionItem,
} from "@/app/admin/(dashboard)/_models";

import {
  ANSWER_PROPERTY_WEIGHT_OPTIONS,
  AnswerFieldErrors,
  AnswerFormValues,
  DEFAULT_ANSWER_PROPERTY_WEIGHT,
  QuestionFieldErrors,
  QuestionFormValues,
} from "./QuizQuestionsEditor.shared";

interface UseQuizQuestionsEditorStateOptions {
  questions: AdminQuizQuestionItem[];
  defaultOrderNumber: number;
}

export function useQuizQuestionsEditorState({
  questions,
  defaultOrderNumber,
}: UseQuizQuestionsEditorStateOptions) {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null,
  );
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  );
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
  const [isAddAnswerModalOpen, setIsAddAnswerModalOpen] = useState(false);
  const [isEditAnswerModalOpen, setIsEditAnswerModalOpen] = useState(false);
  const [deleteTargetQuestionId, setDeleteTargetQuestionId] = useState<
    string | null
  >(null);
  const [deleteTargetAnswerId, setDeleteTargetAnswerId] = useState<
    string | null
  >(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [questionFieldErrors, setQuestionFieldErrors] =
    useState<QuestionFieldErrors>({});
  const [answerFieldErrors, setAnswerFieldErrors] = useState<AnswerFieldErrors>(
    {},
  );
  const [questionForm, setQuestionForm] = useState<QuestionFormValues>({
    order_number: 1,
    text: "",
    property: "",
  });
  const [answerForm, setAnswerForm] = useState<AnswerFormValues>({
    text: "",
    property_weight: DEFAULT_ANSWER_PROPERTY_WEIGHT,
  });

  const activeQuestionId = useMemo(() => {
    if (questions.length === 0) {
      return null;
    }
    if (
      selectedQuestionId &&
      questions.some((item) => item.public_id === selectedQuestionId)
    ) {
      return selectedQuestionId;
    }
    return questions[0]?.public_id ?? null;
  }, [questions, selectedQuestionId]);

  function resetQuestionForm() {
    setEditingQuestionId(null);
    setQuestionFieldErrors({});
    setQuestionForm({
      order_number: defaultOrderNumber,
      text: "",
      property: "",
    });
  }

  function resetAnswerForm() {
    setEditingAnswerId(null);
    setAnswerFieldErrors({});
    setAnswerForm({
      text: "",
      property_weight: DEFAULT_ANSWER_PROPERTY_WEIGHT,
    });
  }

  function clearActionError() {
    setActionError(null);
  }

  function handleQuestionSelectionChange(nextQuestionId: string | null) {
    const hasSelectionChanged = nextQuestionId !== activeQuestionId;
    setSelectedQuestionId(nextQuestionId);
    if (!hasSelectionChanged) {
      return;
    }

    resetAnswerForm();
    setIsAddAnswerModalOpen(false);
    setIsEditAnswerModalOpen(false);
    setDeleteTargetAnswerId(null);
  }

  function openAddQuestionModal() {
    setEditingQuestionId(null);
    setIsEditQuestionModalOpen(false);
    setQuestionFieldErrors({});
    setQuestionForm({
      order_number: defaultOrderNumber,
      text: "",
      property: "",
    });
    setIsAddQuestionModalOpen(true);
  }

  function openAddAnswerModal() {
    if (!activeQuestionId) {
      return;
    }

    setEditingAnswerId(null);
    setIsEditAnswerModalOpen(false);
    setAnswerFieldErrors({});
    setAnswerForm({
      text: "",
      property_weight: DEFAULT_ANSWER_PROPERTY_WEIGHT,
    });
    setIsAddAnswerModalOpen(true);
  }

  function startQuestionEdit(question: AdminQuizQuestionItem) {
    setIsAddQuestionModalOpen(false);
    setIsEditQuestionModalOpen(true);
    setEditingQuestionId(question.public_id);
    setQuestionFieldErrors({});
    setQuestionForm({
      order_number: question.order_number,
      text: question.text,
      property: question.property,
    });
    handleQuestionSelectionChange(question.public_id);
  }

  function startAnswerEdit(answer: AdminQuizQuestionAnswerItem) {
    setIsAddAnswerModalOpen(false);
    setIsEditAnswerModalOpen(true);
    setEditingAnswerId(answer.public_id);
    setAnswerFieldErrors({});
    setAnswerForm({
      text: answer.text,
      property_weight: ANSWER_PROPERTY_WEIGHT_OPTIONS.includes(
        answer.property_weight as (typeof ANSWER_PROPERTY_WEIGHT_OPTIONS)[number],
      )
        ? answer.property_weight
        : "",
    });
  }

  function requestDeleteQuestion(questionId: string) {
    clearActionError();
    setDeleteTargetQuestionId(questionId);
  }

  function requestDeleteAnswer(answerId: string) {
    clearActionError();
    setDeleteTargetAnswerId(answerId);
  }

  function handleQuestionDeleted(deletedQuestionId: string) {
    if (activeQuestionId === deletedQuestionId) {
      handleQuestionSelectionChange(null);
    }
    if (editingQuestionId === deletedQuestionId) {
      setIsEditQuestionModalOpen(false);
      resetQuestionForm();
    }
    setDeleteTargetQuestionId(null);
  }

  function handleAnswerDeleted(deletedAnswerId: string) {
    if (editingAnswerId === deletedAnswerId) {
      setIsEditAnswerModalOpen(false);
      resetAnswerForm();
    }
    setDeleteTargetAnswerId(null);
  }

  return {
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
    clearActionError,
    handleQuestionSelectionChange,
    openAddQuestionModal,
    openAddAnswerModal,
    startQuestionEdit,
    startAnswerEdit,
    requestDeleteQuestion,
    requestDeleteAnswer,
    handleQuestionDeleted,
    handleAnswerDeleted,
  };
}
