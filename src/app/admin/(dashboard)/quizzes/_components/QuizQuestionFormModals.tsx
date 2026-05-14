"use client";

import {
  QuestionFormModal,
  type QuestionFormModalProps,
} from "./QuestionFormModal";

type QuestionFormModalSharedProps = Pick<
  QuestionFormModalProps,
  | "isSaving"
  | "form"
  | "fieldErrors"
  | "onClearFieldError"
  | "onSubmit"
  | "onChange"
>;

interface QuizQuestionFormModalsProps {
  shared: QuestionFormModalSharedProps;
  create: Pick<QuestionFormModalProps, "open" | "onClose">;
  edit: Pick<QuestionFormModalProps, "open" | "onClose">;
}

export function QuizQuestionFormModals({
  shared,
  create,
  edit,
}: QuizQuestionFormModalsProps) {
  return (
    <>
      <QuestionFormModal mode="create" {...shared} {...create} />
      <QuestionFormModal mode="edit" {...shared} {...edit} />
    </>
  );
}
