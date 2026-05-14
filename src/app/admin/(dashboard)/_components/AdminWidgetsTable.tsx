"use client";

import { useCallback } from "react";

import { useAdminWidgetsQuery } from "@/app/admin/(dashboard)/_hooks/useAdminWidgetsQuery";
import { AdminWidgetItem } from "@/app/admin/(dashboard)/_models";

import { getAdminSidebarTitleByPathOrFallback } from "../_config/adminNavigation";
import { useAdminTablePageLimitUrlPagination } from "../_hooks/useAdminSearchParamsPagination";
import { AdminEntityListShell } from "./AdminEntityListShell";
import { AdminListPageSuspense } from "./AdminListPageSuspense";
import { AdminListTableFrame } from "./AdminListTableFrame";
import { AdminResourceDeleteDialog } from "./AdminResourceDeleteDialog";
import { AdminRowActionsPortal } from "./AdminRowActionsPortal";
import { AdminTableListBody } from "./AdminTableListBody";
import { formatAdminTableDate, formatJsonPreview } from "./adminTableUtils";
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
import { useAdminTablePaginationDerived } from "./useAdminTablePagination";
import { useAdminWidgetDelete } from "./useAdminWidgetDelete";
import { useAdminWidgetRowActionsMenu } from "./useAdminWidgetRowActionsMenu";

function AdminWidgetsTableInner() {
  const pageTitle = getAdminSidebarTitleByPathOrFallback("/admin", "Widgets");
  const { page, limit, setQuery } = useAdminTablePageLimitUrlPagination();
  const { data, error, isLoading, mutate } = useAdminWidgetsQuery(page, limit);
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
  } = useAdminWidgetRowActionsMenu();

  const {
    deleteTargetWidgetId,
    isDeletingWidget,
    deleteError,
    closeDeleteDialog,
    confirmDeleteWidget,
    requestDelete,
  } = useAdminWidgetDelete(mutate);

  const widgets = data?.data.items ?? [];

  const openEditWidget = useAdminEntityEditNavigation("/admin/widgets");

  const handleActionsEdit = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      openEditWidget(publicId);
    },
    [openEditWidget, setOpenActionsId],
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
      addHref="/admin/widgets/new"
      addLabel="Add widget"
      loadError={error}
      loadErrorFallback="Failed to load widgets."
      deleteError={deleteError}
    >
      <AdminListTableFrame>
        <Table className="w-full min-w-[960px] table-fixed">
          <colgroup>
            <col style={{ width: "14%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "8%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "9%" }} />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead className="text-xs uppercase">Public ID</TableHead>
              <TableHead className="text-xs uppercase">Type</TableHead>
              <TableHead className="text-xs uppercase">Data</TableHead>
              <TableHead className="text-xs uppercase">Active</TableHead>
              <TableHead className="text-xs uppercase">Created</TableHead>
              <TableHead className="text-xs uppercase">Updated</TableHead>
              <TableHead className="text-xs uppercase text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AdminTableListBody
              colSpan={7}
              isLoading={isLoading}
              isEmpty={widgets.length === 0}
              emptyMessage="No widgets found."
            >
              {widgets.map((row: AdminWidgetItem) => (
                <AdminClickableTableRow
                  key={row.public_id}
                  entityPublicId={row.public_id}
                  navigateToEdit={openEditWidget}
                >
                  <TableCell className="max-w-0 truncate font-medium break-all">
                    {row.public_id}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    <span className="inline-flex rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs">
                      {row.type}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-0">
                    <code className="line-clamp-2 block overflow-hidden rounded bg-zinc-50 px-2 py-1 font-mono text-xs text-zinc-700">
                      {formatJsonPreview(row.data)}
                    </code>
                  </TableCell>
                  <TableCell>{row.is_active ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-sm text-zinc-600 whitespace-normal">
                    {formatAdminTableDate(row.created_at)}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-600 whitespace-normal">
                    {formatAdminTableDate(row.updated_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className="relative inline-flex"
                      data-widget-actions-menu
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                        aria-label={`Open actions for widget ${row.public_id}`}
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
        menuDataAttribute="widget"
      />

      {deleteTargetWidgetId ? (
        <AdminResourceDeleteDialog
          resourceLabel="widget"
          resourceId={deleteTargetWidgetId}
          isDeleting={isDeletingWidget}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDeleteWidget}
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

export function AdminWidgetsTable() {
  return (
    <AdminListPageSuspense>
      <AdminWidgetsTableInner />
    </AdminListPageSuspense>
  );
}
