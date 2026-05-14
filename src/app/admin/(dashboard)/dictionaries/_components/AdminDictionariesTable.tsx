"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";

import { useAdminDictionariesQuery } from "@/app/admin/(dashboard)/_hooks/useAdminDictionariesQuery";

import { AdminEntityListShell } from "../../_components/AdminEntityListShell";
import { AdminListPageSuspense } from "../../_components/AdminListPageSuspense";
import { AdminResourceDeleteDialog } from "../../_components/AdminResourceDeleteDialog";
import { AdminRowActionsPortal } from "../../_components/AdminRowActionsPortal";
import { AdminTablePagination } from "../../_components/table/AdminTablePagination";
import { useAdminDictionaryDelete } from "../../_components/useAdminDictionaryDelete";
import { useAdminDictionaryRowActionsMenu } from "../../_components/useAdminDictionaryRowActionsMenu";
import { useAdminEntityEditNavigation } from "../../_components/useAdminEntityEditNavigation";
import { useAdminTablePaginationDerived } from "../../_components/useAdminTablePagination";
import { getAdminSidebarTitleByPathOrFallback } from "../../_config/adminNavigation";
import { useAdminDebouncedUrlSearchSync } from "../../_hooks/useAdminDebouncedUrlSearchSync";
import { useDismissiblePopover } from "../../_hooks/useDismissiblePopover";
import { AdminDictionariesTableContent } from "./AdminDictionariesTableContent";
import {
  AdminDictionariesTableToolbar,
  type AdminDictionariesToolbarModel,
} from "./AdminDictionariesTableToolbar";
import { useAdminDictionariesTableUrlPagination } from "./useAdminDictionariesTablePagination";

function AdminDictionariesTableInner() {
  const pageTitle = getAdminSidebarTitleByPathOrFallback(
    "/admin/dictionaries",
    "Dictionaries",
  );
  const { page, limit, filters, setQuery } =
    useAdminDictionariesTableUrlPagination();
  const { data, error, isLoading, mutate } = useAdminDictionariesQuery(
    page,
    limit,
    filters,
  );

  const {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  } = useAdminDictionaryRowActionsMenu();

  const {
    deleteTargetDictionaryId,
    isDeletingDictionary,
    deleteError,
    closeDeleteDialog,
    confirmDeleteDictionary,
    requestDelete,
  } = useAdminDictionaryDelete(mutate);
  const {
    total,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = useAdminTablePaginationDerived(data?.data, page, limit, setQuery);

  const dictionaries = data?.data.items ?? [];
  const [searchValue, setSearchValue] = useState(filters.search);
  const [nameValue, setNameValue] = useState(filters.name);
  const [slugValue, setSlugValue] = useState(filters.slug);
  const {
    open: filtersPopoverOpen,
    toggle: toggleFiltersPopover,
    close: closeFiltersPopover,
    popoverRef: filtersPopoverRef,
  } = useDismissiblePopover();

  useAdminDebouncedUrlSearchSync(searchValue, filters.search, limit, setQuery);

  const navigateToEdit = useAdminEntityEditNavigation("/admin/dictionaries");

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

  const handleFiltersSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setQuery(1, limit, {
        search: searchValue,
        name: nameValue,
        slug: slugValue,
      });
      closeFiltersPopover();
    },
    [closeFiltersPopover, limit, nameValue, searchValue, setQuery, slugValue],
  );

  const handleFiltersReset = useCallback(() => {
    setSearchValue("");
    setNameValue("");
    setSlugValue("");
    closeFiltersPopover();
    setQuery(1, limit, { search: "", name: "", slug: "" });
  }, [closeFiltersPopover, limit, setQuery]);

  const hasActiveFilters =
    searchValue.trim() !== "" ||
    nameValue.trim() !== "" ||
    slugValue.trim() !== "";
  const advancedFiltersCount =
    Number(nameValue.trim() !== "") + Number(slugValue.trim() !== "");

  const toolbar: AdminDictionariesToolbarModel = useMemo(
    () => ({
      search: { value: searchValue, onChange: setSearchValue },
      filtersOpen: filtersPopoverOpen,
      onToggleFilters: toggleFiltersPopover,
      advanced: {
        name: { value: nameValue, onChange: setNameValue },
        slug: { value: slugValue, onChange: setSlugValue },
        badgeCount: advancedFiltersCount,
        hasActiveFilters,
        onSubmit: handleFiltersSubmit,
        onReset: handleFiltersReset,
      },
    }),
    [
      advancedFiltersCount,
      filtersPopoverOpen,
      handleFiltersReset,
      handleFiltersSubmit,
      hasActiveFilters,
      nameValue,
      searchValue,
      slugValue,
      toggleFiltersPopover,
    ],
  );

  return (
    <AdminEntityListShell
      title={pageTitle}
      loadError={error}
      loadErrorFallback="Failed to load dictionaries."
      deleteError={deleteError}
      headerActions={
        <AdminDictionariesTableToolbar
          toolbar={toolbar}
          filtersAnchorRef={filtersPopoverRef}
        />
      }
    >
      <AdminDictionariesTableContent
        dictionaries={dictionaries}
        isLoading={isLoading}
        onNavigateToEdit={navigateToEdit}
        actionTriggerRefs={actionTriggerRefs}
        setOpenActionsId={setOpenActionsId}
      />

      <AdminRowActionsPortal
        openEntityId={openActionsId}
        position={openActionsPosition}
        onEdit={handleActionsEdit}
        onRequestDelete={handleActionsRequestDelete}
        menuDataAttribute="dictionary"
      />

      {deleteTargetDictionaryId ? (
        <AdminResourceDeleteDialog
          resourceLabel="dictionary"
          resourceId={deleteTargetDictionaryId}
          isDeleting={isDeletingDictionary}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDeleteDictionary}
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

export function AdminDictionariesTable() {
  return (
    <AdminListPageSuspense>
      <AdminDictionariesTableInner />
    </AdminListPageSuspense>
  );
}
