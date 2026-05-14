"use client";

import { useCallback, useState } from "react";

import { useAdminUsersQuery } from "@/app/admin/(dashboard)/_hooks/useAdminUsersQuery";

import { AdminEntityListShell } from "../../_components/AdminEntityListShell";
import { AdminListPageSuspense } from "../../_components/AdminListPageSuspense";
import { AdminRowActionsPortal } from "../../_components/AdminRowActionsPortal";
import { AdminTablePagination } from "../../_components/table/AdminTablePagination";
import { useAdminEntityEditNavigation } from "../../_components/useAdminEntityEditNavigation";
import { useAdminTablePaginationDerived } from "../../_components/useAdminTablePagination";
import { useAdminUserRowActionsMenu } from "../../_components/useAdminUserRowActionsMenu";
import { getAdminSidebarTitleByPathOrFallback } from "../../_config/adminNavigation";
import { useAdminDebouncedUrlSearchSync } from "../../_hooks/useAdminDebouncedUrlSearchSync";
import { useAdminUsersTableUrlPagination } from "../_hooks/useAdminUsersTablePagination";
import { AdminUsersTableContent } from "./AdminUsersTableContent";
import { AdminUsersTableToolbar } from "./AdminUsersTableToolbar";

function AdminUsersTableInner() {
  const pageTitle = getAdminSidebarTitleByPathOrFallback(
    "/admin/users",
    "Users",
  );
  const { page, limit, filters, setQuery } = useAdminUsersTableUrlPagination();
  const { data, error, isLoading } = useAdminUsersQuery(page, limit, filters);

  const {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  } = useAdminUserRowActionsMenu();

  const {
    total,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = useAdminTablePaginationDerived(data?.data, page, limit, setQuery);

  const users = data?.data.items ?? [];
  const [searchValue, setSearchValue] = useState(filters.search);

  useAdminDebouncedUrlSearchSync(searchValue, filters.search, limit, setQuery);

  const navigateToEdit = useAdminEntityEditNavigation("/admin/users");

  const handleActionsEdit = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      navigateToEdit(publicId);
    },
    [navigateToEdit, setOpenActionsId],
  );

  const handleHasProfileTypeChange = useCallback(
    (value: string) => {
      setQuery(1, limit, { has_profile_type: value });
    },
    [limit, setQuery],
  );

  return (
    <AdminEntityListShell
      title={pageTitle}
      loadError={error}
      loadErrorFallback="Failed to load users."
      deleteError={null}
      headerActions={
        <AdminUsersTableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          hasProfileTypeValue={filters.has_profile_type}
          onHasProfileTypeChange={handleHasProfileTypeChange}
        />
      }
    >
      <AdminUsersTableContent
        users={users}
        isLoading={isLoading}
        onNavigateToEdit={navigateToEdit}
        actionTriggerRefs={actionTriggerRefs}
        setOpenActionsId={setOpenActionsId}
      />

      <AdminRowActionsPortal
        openEntityId={openActionsId}
        position={openActionsPosition}
        onEdit={handleActionsEdit}
        showDelete={false}
        menuDataAttribute="user"
      />

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

export function AdminUsersTable() {
  return (
    <AdminListPageSuspense>
      <AdminUsersTableInner />
    </AdminListPageSuspense>
  );
}
