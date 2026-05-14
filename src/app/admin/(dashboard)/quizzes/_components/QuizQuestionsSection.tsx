"use client";

import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { AdminTablePagination } from "../../_components/table/AdminTablePagination";
import { Button } from "../../_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/ui/table";
import type { QuizQuestionsSectionProps } from "./QuizQuestionsSection.types";

export type {
  QuizQuestionsSectionActionsModel,
  QuizQuestionsSectionListModel,
  QuizQuestionsSectionPaginationModel,
  QuizQuestionsSectionProps,
} from "./QuizQuestionsSection.types";

export function QuizQuestionsSection({
  list,
  pagination,
  actions,
}: QuizQuestionsSectionProps) {
  const {
    questions,
    totalQuestions,
    isLoadingQuestions,
    activeQuestionId,
    deletingQuestionId,
  } = list;
  const {
    page,
    limit,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = pagination;
  const {
    onAddQuestion,
    onPageChange,
    onLimitChangeValue,
    onSelectQuestion,
    onEditQuestion,
    onDeleteQuestion,
  } = actions;

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-900">Questions</h3>
        <Button type="button" size="sm" onClick={onAddQuestion}>
          Add question
        </Button>
      </div>
      <p className="text-xs text-zinc-500">
        Click a question row to select it and manage its answers.
      </p>
      <AdminListTableFrame className="bg-transparent">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead className="w-20 text-xs uppercase">Order</TableHead>
              <TableHead className="text-xs uppercase">Question</TableHead>
              <TableHead className="text-xs uppercase">Property</TableHead>
              <TableHead className="w-44 text-right text-xs uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingQuestions && questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-500">
                  Loading questions...
                </TableCell>
              </TableRow>
            ) : questions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-zinc-500">
                  No questions yet.
                </TableCell>
              </TableRow>
            ) : (
              questions.map((question) => (
                <TableRow
                  key={question.public_id}
                  role="button"
                  tabIndex={0}
                  className={
                    activeQuestionId === question.public_id
                      ? "cursor-pointer bg-zinc-100 hover:bg-zinc-100"
                      : "cursor-pointer"
                  }
                  onClick={() => onSelectQuestion(question.public_id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectQuestion(question.public_id);
                    }
                  }}
                >
                  <TableCell>{question.order_number}</TableCell>
                  <TableCell className="whitespace-normal">
                    {question.text}
                  </TableCell>
                  <TableCell>{question.property || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEditQuestion(question);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={deletingQuestionId === question.public_id}
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteQuestion(question.public_id);
                        }}
                      >
                        {deletingQuestionId === question.public_id
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </AdminListTableFrame>
      <AdminTablePagination
        state={{
          total: totalQuestions,
          totalPages,
          rangeStart,
          rangeEnd,
          isLoading: isLoadingQuestions,
          page,
          limit,
          canPrev,
          canNext,
          pageItems,
        }}
        actions={{
          onLimitChangeValue,
          onPageChange,
        }}
      />
    </section>
  );
}
