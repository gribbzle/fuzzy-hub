"use client";

import { AdminQuizQuestionAnswerItem } from "@/app/admin/(dashboard)/_models";

import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { Button } from "../../_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/ui/table";
import { formatAdminDate } from "./QuizQuestionsEditor.shared";

interface QuizAnswersSectionProps {
  activeQuestionId: string | null;
  answers: AdminQuizQuestionAnswerItem[];
  isLoadingAnswers: boolean;
  deletingAnswerId: string | null;
  onAddAnswer: () => void;
  onEditAnswer: (answer: AdminQuizQuestionAnswerItem) => void;
  onDeleteAnswer: (answerId: string) => void;
}

export function QuizAnswersSection({
  activeQuestionId,
  answers,
  isLoadingAnswers,
  deletingAnswerId,
  onAddAnswer,
  onEditAnswer,
  onDeleteAnswer,
}: QuizAnswersSectionProps) {
  return (
    <section className="space-y-3 border-t border-zinc-200 pt-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-900">
          {activeQuestionId ? "Answers (single choice)" : "Answers"}
        </h3>
        <Button
          type="button"
          size="sm"
          disabled={!activeQuestionId}
          onClick={onAddAnswer}
        >
          Add answer
        </Button>
      </div>
      {!activeQuestionId ? (
        <p className="text-sm text-zinc-500">
          Select a question to manage its answers.
        </p>
      ) : (
        <AdminListTableFrame className="bg-transparent">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                <TableHead className="text-xs uppercase">Text</TableHead>
                <TableHead className="w-40 text-xs uppercase">Weight</TableHead>
                <TableHead className="w-48 text-xs uppercase">
                  Updated
                </TableHead>
                <TableHead className="w-36 text-right text-xs uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingAnswers && answers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-zinc-500">
                    Loading answers...
                  </TableCell>
                </TableRow>
              ) : answers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-zinc-500">
                    No answers yet. Add at least two options.
                  </TableCell>
                </TableRow>
              ) : (
                answers.map((answer) => (
                  <TableRow key={answer.public_id}>
                    <TableCell className="whitespace-normal">
                      {answer.text}
                    </TableCell>
                    <TableCell>{answer.property_weight || "-"}</TableCell>
                    <TableCell className="text-zinc-600">
                      {formatAdminDate(answer.updated_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => onEditAnswer(answer)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={deletingAnswerId === answer.public_id}
                          onClick={() => onDeleteAnswer(answer.public_id)}
                        >
                          {deletingAnswerId === answer.public_id
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
      )}
    </section>
  );
}
