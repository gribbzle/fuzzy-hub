"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";

import { useAdminCharacteristicsQuery } from "@/app/admin/(dashboard)/_hooks/useAdminCharacteristicsQuery";
import {
  ADMIN_CHARACTERISTIC_GROUPS,
  ADMIN_CHARACTERISTIC_GROUP_LABELS,
  ADMIN_CHARACTERISTIC_TYPES,
  ADMIN_CHARACTERISTIC_TYPE_LABELS,
} from "@/app/admin/(dashboard)/_models";

import { AdminEntityListShell } from "../../_components/AdminEntityListShell";
import { AdminListPageSuspense } from "../../_components/AdminListPageSuspense";
import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { AdminResourceDeleteDialog } from "../../_components/AdminResourceDeleteDialog";
import { AdminRowActionsPortal } from "../../_components/AdminRowActionsPortal";
import { AdminTableListBody } from "../../_components/AdminTableListBody";
import { AdminTablePagination } from "../../_components/table/AdminTablePagination";
import type { SelectOption } from "../../_components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/ui/table";
import { useAdminCharacteristicDelete } from "../../_components/useAdminCharacteristicDelete";
import { useAdminCharacteristicRowActionsMenu } from "../../_components/useAdminCharacteristicRowActionsMenu";
import { useAdminEntityEditNavigation } from "../../_components/useAdminEntityEditNavigation";
import { useAdminTablePaginationDerived } from "../../_components/useAdminTablePagination";
import { getAdminSidebarTitleByPathOrFallback } from "../../_config/adminNavigation";
import { useAdminDebouncedUrlSearchSync } from "../../_hooks/useAdminDebouncedUrlSearchSync";
import { useDismissiblePopover } from "../../_hooks/useDismissiblePopover";
import { AdminCharacteristicsTableRows } from "./AdminCharacteristicsTableRows";
import { AdminCharacteristicsTableToolbar } from "./AdminCharacteristicsTableToolbar";
import { useAdminCharacteristicsTableUrlPagination } from "./useAdminCharacteristicsTablePagination";

function AdminCharacteristicsTableInner() {
  const pageTitle = getAdminSidebarTitleByPathOrFallback(
    "/admin/characteristics",
    "Characteristics",
  );
  const { page, limit, filters, setQuery } =
    useAdminCharacteristicsTableUrlPagination();
  const { data, error, isLoading, mutate } = useAdminCharacteristicsQuery(
    page,
    limit,
    filters,
  );
  const {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  } = useAdminCharacteristicRowActionsMenu();
  const {
    deleteTargetCharacteristicId,
    isDeletingCharacteristic,
    deleteError,
    closeDeleteDialog,
    confirmDeleteCharacteristic,
    requestDelete,
  } = useAdminCharacteristicDelete(mutate);

  const {
    total,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = useAdminTablePaginationDerived(data?.data, page, limit, setQuery);

  const items = data?.data.items ?? [];

  const [searchValue, setSearchValue] = useState(filters.search);
  const [typeDraft, setTypeDraft] = useState(filters.type);
  const [groupDraft, setGroupDraft] = useState(filters.group);
  const {
    open: filtersPopoverOpen,
    toggle: toggleFiltersPopover,
    close: closeFiltersPopover,
    popoverRef: filtersPopoverRef,
  } = useDismissiblePopover();

  useAdminDebouncedUrlSearchSync(searchValue, filters.search, limit, setQuery);

  const typeOptions = useMemo<SelectOption[]>(
    () => [
      { value: "", label: "All types" },
      ...ADMIN_CHARACTERISTIC_TYPES.map((t) => ({
        value: t,
        label: ADMIN_CHARACTERISTIC_TYPE_LABELS[t],
      })),
    ],
    [],
  );

  const groupOptions = useMemo<SelectOption[]>(
    () => [
      { value: "", label: "All groups" },
      ...ADMIN_CHARACTERISTIC_GROUPS.map((g) => ({
        value: g,
        label: ADMIN_CHARACTERISTIC_GROUP_LABELS[g],
      })),
    ],
    [],
  );

  const handleFiltersSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setQuery(1, limit, {
        search: searchValue,
        type: typeDraft,
        group: groupDraft,
      });
      closeFiltersPopover();
    },
    [closeFiltersPopover, groupDraft, limit, searchValue, setQuery, typeDraft],
  );

  const handleFiltersReset = useCallback(() => {
    setSearchValue("");
    setTypeDraft("");
    setGroupDraft("");
    closeFiltersPopover();
    setQuery(1, limit, { search: "", type: "", group: "" });
  }, [closeFiltersPopover, limit, setQuery]);

  const hasActiveFilters =
    searchValue.trim() !== "" ||
    typeDraft.trim() !== "" ||
    groupDraft.trim() !== "";
  const advancedFiltersCount =
    Number(typeDraft.trim() !== "") + Number(groupDraft.trim() !== "");

  const navigateToEdit = useAdminEntityEditNavigation("/admin/characteristics");

  const handleActionsEdit = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      navigateToEdit(publicId);
    },
    [navigateToEdit, setOpenActionsId],
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
      loadError={error}
      loadErrorFallback="Failed to load characteristics."
      deleteError={deleteError}
      headerActions={
        <AdminCharacteristicsTableToolbar
          search={{
            value: searchValue,
            onChange: setSearchValue,
          }}
          filtersPanel={{
            popoverRef: filtersPopoverRef,
            open: filtersPopoverOpen,
            onToggle: toggleFiltersPopover,
            badgeCount: advancedFiltersCount,
            hasActiveFilters,
            typeDraft,
            onTypeDraftChange: setTypeDraft,
            groupDraft,
            onGroupDraftChange: setGroupDraft,
            typeOptions,
            groupOptions,
            onFiltersSubmit: handleFiltersSubmit,
            onFiltersReset: handleFiltersReset,
          }}
        />
      }
    >
      <AdminListTableFrame>
        <Table className="w-full min-w-[1180px] table-fixed">
          <colgroup>
            <col style={{ width: "14%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "18%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "8%" }} />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead className="text-xs uppercase">Name</TableHead>
              <TableHead className="text-xs uppercase">Slug</TableHead>
              <TableHead className="text-xs uppercase">Type</TableHead>
              <TableHead className="text-xs uppercase">Group</TableHead>
              <TableHead className="text-xs uppercase">Description</TableHead>
              <TableHead className="text-xs uppercase">Dictionary</TableHead>
              <TableHead className="text-xs uppercase">Unit</TableHead>
              <TableHead className="text-xs uppercase">Created</TableHead>
              <TableHead className="text-xs uppercase">Updated</TableHead>
              <TableHead className="text-xs uppercase text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AdminTableListBody
              colSpan={10}
              isLoading={isLoading}
              isEmpty={items.length === 0}
              emptyMessage="No characteristics found."
            >
              <AdminCharacteristicsTableRows
                items={items}
                navigateToEdit={navigateToEdit}
                actionTriggerRefs={actionTriggerRefs}
                setOpenActionsId={setOpenActionsId}
              />
            </AdminTableListBody>
          </TableBody>
        </Table>
      </AdminListTableFrame>

      <AdminRowActionsPortal
        openEntityId={openActionsId}
        position={openActionsPosition}
        onEdit={handleActionsEdit}
        onRequestDelete={handleActionsRequestDelete}
        menuDataAttribute="characteristic"
      />

      {deleteTargetCharacteristicId ? (
        <AdminResourceDeleteDialog
          resourceLabel="characteristic"
          resourceId={deleteTargetCharacteristicId}
          isDeleting={isDeletingCharacteristic}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDeleteCharacteristic}
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

export function AdminCharacteristicsTable() {
  return (
    <AdminListPageSuspense>
      <AdminCharacteristicsTableInner />
    </AdminListPageSuspense>
  );
}
