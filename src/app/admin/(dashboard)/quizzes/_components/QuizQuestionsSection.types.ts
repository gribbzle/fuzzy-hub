import type { AdminQuizQuestionItem } from "@/app/admin/(dashboard)/_models";

export interface QuizQuestionsSectionListModel {
  questions: AdminQuizQuestionItem[];
  totalQuestions: number;
  isLoadingQuestions: boolean;
  activeQuestionId: string | null;
  deletingQuestionId: string | null;
}

export interface QuizQuestionsSectionPaginationModel {
  page: number;
  limit: number;
  totalPages: number;
  rangeStart: number;
  rangeEnd: number;
  canPrev: boolean;
  canNext: boolean;
  pageItems: (number | "ellipsis")[];
}

export interface QuizQuestionsSectionActionsModel {
  onAddQuestion: () => void;
  onPageChange: (nextPage: number) => void;
  onLimitChangeValue: (nextLimit: number) => void;
  onSelectQuestion: (questionId: string) => void;
  onEditQuestion: (question: AdminQuizQuestionItem) => void;
  onDeleteQuestion: (questionId: string) => void;
}

export interface QuizQuestionsSectionProps {
  list: QuizQuestionsSectionListModel;
  pagination: QuizQuestionsSectionPaginationModel;
  actions: QuizQuestionsSectionActionsModel;
}
