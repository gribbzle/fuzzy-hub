"use client";

import { AnswerFormModal, type AnswerFormModalProps } from "./AnswerFormModal";

type AnswerFormModalSharedProps = Pick<
  AnswerFormModalProps,
  | "isSaving"
  | "form"
  | "fieldErrors"
  | "onClearFieldError"
  | "onSubmit"
  | "onChange"
>;

interface QuizAnswerFormModalsProps {
  shared: AnswerFormModalSharedProps;
  create: Pick<AnswerFormModalProps, "open" | "onClose">;
  edit: Pick<AnswerFormModalProps, "open" | "onClose">;
}

export function QuizAnswerFormModals({
  shared,
  create,
  edit,
}: QuizAnswerFormModalsProps) {
  return (
    <>
      <AnswerFormModal mode="create" {...shared} {...create} />
      <AnswerFormModal mode="edit" {...shared} {...edit} />
    </>
  );
}
