"use client";

import { useCallback } from "react";

import { useAdminQuizProfilesQuery } from "@/app/admin/(dashboard)/_hooks/useAdminQuizProfilesQuery";
import { AdminQuizProfileItem } from "@/app/admin/(dashboard)/_models";

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
import { useAdminQuizProfileDelete } from "./useAdminQuizProfileDelete";
import { useAdminQuizProfileRowActionsMenu } from "./useAdminQuizProfileRowActionsMenu";
import { useAdminTablePaginationDerived } from "./useAdminTablePagination";

function AdminQuizProfilesTableInner() {
  const pageTitle = getAdminSidebarTitleByPathOrFallback(
    "/admin/quiz-profiles",
    "Quiz profiles",
  );
  const { page, limit, setQuery } = useAdminTablePageLimitUrlPagination();
  const { data, error, isLoading, mutate } = useAdminQuizProfilesQuery(
    page,
    limit,
  );

  const {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  } = useAdminQuizProfileRowActionsMenu();

  const {
    deleteTargetQuizProfileId,
    isDeletingQuizProfile,
    deleteError,
    closeDeleteDialog,
    confirmDeleteQuizProfile,
    requestDelete,
  } = useAdminQuizProfileDelete(mutate);
  const {
    total,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = useAdminTablePaginationDerived(data?.data, page, limit, setQuery);

  const profiles = data?.data.items ?? [];

  const openEditProfile = useAdminEntityEditNavigation("/admin/quiz-profiles");

  const handleActionsEdit = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      openEditProfile(publicId);
    },
    [openEditProfile, setOpenActionsId],
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
      addHref="/admin/quiz-profiles/new"
      addLabel="Add quiz profile"
      loadError={error}
      loadErrorFallback="Failed to load quiz profiles."
      deleteError={deleteError}
    >
      <AdminListTableFrame>
        <Table className="w-full min-w-[720px] table-fixed">
          <colgroup>
            <col style={{ width: "18%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "24%" }} />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead className="text-xs uppercase">Public ID</TableHead>
              <TableHead className="text-xs uppercase">Name</TableHead>
              <TableHead className="text-xs uppercase">Created</TableHead>
              <TableHead className="text-xs uppercase">Updated</TableHead>
              <TableHead className="text-xs uppercase text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AdminTableListBody
              colSpan={5}
              isLoading={isLoading}
              isEmpty={profiles.length === 0}
              emptyMessage="No quiz profiles found."
            >
              {profiles.map((row: AdminQuizProfileItem) => (
                <AdminClickableTableRow
                  key={row.public_id}
                  entityPublicId={row.public_id}
                  navigateToEdit={openEditProfile}
                >
                  <TableCell className="max-w-0 truncate font-medium break-all">
                    {row.public_id}
                  </TableCell>
                  <TableCell className="whitespace-normal font-medium text-zinc-900">
                    {row.name}
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
                      data-quiz-profile-actions-menu
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                        aria-label={`Open actions for quiz profile ${row.public_id}`}
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
        menuDataAttribute="quiz-profile"
      />

      {deleteTargetQuizProfileId ? (
        <AdminResourceDeleteDialog
          resourceLabel="quiz-profile"
          resourceId={deleteTargetQuizProfileId}
          isDeleting={isDeletingQuizProfile}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDeleteQuizProfile}
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

export function AdminQuizProfilesTable() {
  return (
    <AdminListPageSuspense>
      <AdminQuizProfilesTableInner />
    </AdminListPageSuspense>
  );
}
