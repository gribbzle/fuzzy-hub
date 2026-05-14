"use client";

import { useCallback } from "react";

import { useAdminQuizzesQuery } from "@/app/admin/(dashboard)/_hooks/useAdminQuizzesQuery";
import { AdminQuizItem } from "@/app/admin/(dashboard)/_models";

import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";
import { useAdminTablePageLimitUrlPagination } from "../_hooks/useAdminSearchParamsPagination";
import { AdminEntityListShell } from "./AdminEntityListShell";
import { AdminListPageSuspense } from "./AdminListPageSuspense";
import { AdminListTableFrame } from "./AdminListTableFrame";
import { AdminResourceDeleteDialog } from "./AdminResourceDeleteDialog";
import { AdminRowActionsPortal } from "./AdminRowActionsPortal";
import { AdminTableListBody } from "./AdminTableListBody";
import { formatAdminTableDate } from "./adminTableUtils";
import { AdminClickableTableRow } from "./table/AdminClickableTableRow";
import { AdminTablePagination } from "./table/AdminTablePagination";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useAdminEntityEditNavigation } from "./useAdminEntityEditNavigation";
import { useAdminQuizDelete } from "./useAdminQuizDelete";
import { useAdminQuizRowActionsMenu } from "./useAdminQuizRowActionsMenu";
import { useAdminTablePaginationDerived } from "./useAdminTablePagination";

function AdminQuizzesTableInner() {
  const pageTitle = getAdminSidebarTitleByPathOrFallback(
    "/admin/quizzes",
    "Quizzes",
  );
  const { page, limit, setQuery } = useAdminTablePageLimitUrlPagination();
  const { data, error, isLoading, mutate } = useAdminQuizzesQuery(page, limit);
  const {
    total,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = useAdminTablePaginationDerived(data?.data, page, limit, setQuery);

  const {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  } = useAdminQuizRowActionsMenu();

  const {
    deleteTargetQuizId,
    isDeletingQuiz,
    deleteError,
    closeDeleteDialog,
    confirmDeleteQuiz,
    requestDelete,
  } = useAdminQuizDelete(mutate);

  const quizzes = data?.data.items ?? [];

  const openEditQuiz = useAdminEntityEditNavigation("/admin/quizzes");

  const handleActionsEdit = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      openEditQuiz(publicId);
    },
    [openEditQuiz, setOpenActionsId],
  );

  const handleActionsRequestDelete = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      requestDelete(publicId);
    },
    [requestDelete, setOpenActionsId],
  );

  return (
    <AdminEntityListShell
      title={pageTitle}
      addHref="/admin/quizzes/new"
      addLabel="Add quiz"
      loadError={error}
      loadErrorFallback="Failed to load quizzes."
      deleteError={deleteError}
    >
      <AdminListTableFrame>
        <Table className="w-full min-w-[720px] table-fixed">
          <colgroup>
            <col style={{ width: "18%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "16%" }} />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead className="text-xs uppercase">Public ID</TableHead>
              <TableHead className="text-xs uppercase">Name</TableHead>
              <TableHead className="text-xs uppercase">Status</TableHead>
              <TableHead className="text-xs uppercase">Created</TableHead>
              <TableHead className="text-xs uppercase">Updated</TableHead>
              <TableHead className="text-xs uppercase text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AdminTableListBody
              colSpan={6}
              isLoading={isLoading}
              isEmpty={quizzes.length === 0}
              emptyMessage="No quizzes found."
            >
              {quizzes.map((row: AdminQuizItem) => (
                <AdminClickableTableRow
                  key={row.public_id}
                  entityPublicId={row.public_id}
                  navigateToEdit={openEditQuiz}
                >
                  <TableCell className="max-w-0 truncate font-medium break-all">
                    {row.public_id}
                  </TableCell>
                  <TableCell className="whitespace-normal font-medium text-zinc-900">
                    {row.name}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs">
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-600 whitespace-normal">
                    {formatAdminTableDate(row.created_at)}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-600 whitespace-normal">
                    {formatAdminTableDate(row.updated_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className="relative inline-flex"
                      data-quiz-actions-menu
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                        aria-label={`Open actions for quiz ${row.public_id}`}
                        ref={(element) => {
                          actionTriggerRefs.current[row.public_id] = element;
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenActionsId((prev) =>
                            prev === row.public_id ? null : row.public_id,
                          );
                        }}
                      >
                        ...
                      </Button>
                    </div>
                  </TableCell>
                </AdminClickableTableRow>
              ))}
            </AdminTableListBody>
          </TableBody>
        </Table>
      </AdminListTableFrame>

      <AdminRowActionsPortal
        openEntityId={openActionsId}
        position={openActionsPosition}
        onEdit={handleActionsEdit}
        onRequestDelete={handleActionsRequestDelete}
        menuDataAttribute="quiz"
      />

      {deleteTargetQuizId ? (
        <AdminResourceDeleteDialog
          resourceLabel="quiz"
          resourceId={deleteTargetQuizId}
          isDeleting={isDeletingQuiz}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDeleteQuiz}
        />
      ) : null}

      <AdminTablePagination
        state={{
          total,
          totalPages,
          rangeStart,
          rangeEnd,
          isLoading,
          page,
          limit,
          canPrev,
          canNext,
          pageItems,
        }}
        actions={{
          onLimitChangeValue: (nextLimit) => setQuery(1, nextLimit),
          onPageChange: (nextPage) => setQuery(nextPage, limit),
        }}
      />
    </AdminEntityListShell>
  );
}

export function AdminQuizzesTable() {
  return (
    <AdminListPageSuspense>
      <AdminQuizzesTableInner />
    </AdminListPageSuspense>
  );
}
