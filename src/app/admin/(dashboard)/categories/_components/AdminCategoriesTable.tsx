"use client";

import { useCallback, useState } from "react";

import { useAdminCategoriesQuery } from "@/app/admin/(dashboard)/_hooks/useAdminCategoriesQuery";
import { AdminCategory } from "@/app/admin/(dashboard)/_models";

import { AdminEntityListShell } from "../../_components/AdminEntityListShell";
import { AdminListPageSuspense } from "../../_components/AdminListPageSuspense";
import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { AdminPrimaryAddLink } from "../../_components/AdminPrimaryAddLink";
import { AdminResourceDeleteDialog } from "../../_components/AdminResourceDeleteDialog";
import { AdminRowActionsPortal } from "../../_components/AdminRowActionsPortal";
import { AdminTableListBody } from "../../_components/AdminTableListBody";
import {
  formatAdminCatalogDisplayName,
  formatAdminTableDate,
} from "../../_components/adminTableUtils";
import { AdminClickableTableRow } from "../../_components/table/AdminClickableTableRow";
import { AdminTableOptionalText } from "../../_components/table/AdminTableOptionalText";
import { AdminTablePagination } from "../../_components/table/AdminTablePagination";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/ui/table";
import { useAdminCategoryDelete } from "../../_components/useAdminCategoryDelete";
import { useAdminCategoryRowActionsMenu } from "../../_components/useAdminCategoryRowActionsMenu";
import { useAdminEntityEditNavigation } from "../../_components/useAdminEntityEditNavigation";
import { useAdminTablePaginationDerived } from "../../_components/useAdminTablePagination";
import { getAdminSidebarTitleByPathOrFallback } from "../../_config/adminNavigation";
import { useAdminDebouncedUrlSearchSync } from "../../_hooks/useAdminDebouncedUrlSearchSync";
import { useAdminCategoriesTableUrlPagination } from "./useAdminCategoriesTablePagination";

function AdminCategoriesTableInner() {
  const pageTitle = getAdminSidebarTitleByPathOrFallback(
    "/admin/categories",
    "Categories",
  );
  const { page, limit, filters, setQuery } =
    useAdminCategoriesTableUrlPagination();
  const { data, error, isLoading, mutate } = useAdminCategoriesQuery(
    page,
    limit,
    filters,
  );
  const {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  } = useAdminCategoryRowActionsMenu();
  const {
    deleteTargetCategoryId,
    isDeletingCategory,
    deleteError,
    closeDeleteDialog,
    confirmDeleteCategory,
    requestDelete,
  } = useAdminCategoryDelete(mutate);

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

  useAdminDebouncedUrlSearchSync(searchValue, filters.search, limit, setQuery);

  const navigateToEdit = useAdminEntityEditNavigation("/admin/categories");

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
      loadErrorFallback="Failed to load categories."
      deleteError={deleteError}
      headerActions={
        <div className="flex items-center justify-end gap-2">
          <Input
            inputSize="compact"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search categories..."
            className="w-52"
          />
          <AdminPrimaryAddLink href="/admin/categories/new">
            Add category
          </AdminPrimaryAddLink>
        </div>
      }
    >
      <AdminListTableFrame>
        <Table className="w-full min-w-[1140px] table-fixed">
          <colgroup>
            <col style={{ width: "14%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "9%" }} />
            <col style={{ width: "8%" }} />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead className="text-xs uppercase">Name</TableHead>
              <TableHead className="text-xs uppercase">Slug</TableHead>
              <TableHead className="text-xs uppercase">Catalog</TableHead>
              <TableHead className="text-xs uppercase">Description</TableHead>
              <TableHead className="text-xs uppercase">Attachment</TableHead>
              <TableHead className="text-xs uppercase">Created</TableHead>
              <TableHead className="text-xs uppercase">Updated</TableHead>
              <TableHead className="text-xs uppercase text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AdminTableListBody
              colSpan={8}
              isLoading={isLoading}
              isEmpty={items.length === 0}
              emptyMessage="No categories found."
            >
              {items.map((row: AdminCategory) => (
                <AdminClickableTableRow
                  key={row.public_id}
                  entityPublicId={row.public_id}
                  navigateToEdit={navigateToEdit}
                >
                  <TableCell className="max-w-0 truncate font-medium break-all">
                    {row.name}
                  </TableCell>
                  <TableCell className="max-w-0 truncate font-mono text-sm text-zinc-700">
                    {row.slug}
                  </TableCell>
                  <TableCell className="max-w-0">
                    <span className="line-clamp-2 text-sm text-zinc-700">
                      {formatAdminCatalogDisplayName({
                        name: row.catalog?.name,
                        catalogId: row.catalog_id,
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-0">
                    <AdminTableOptionalText
                      value={row.description}
                      className="line-clamp-2 text-sm text-zinc-600"
                    />
                  </TableCell>
                  <TableCell className="max-w-0">
                    <AdminTableOptionalText
                      value={row.image?.name ?? null}
                      className="line-clamp-2 text-sm text-zinc-600"
                    />
                  </TableCell>
                  <TableCell className="whitespace-normal text-sm text-zinc-600">
                    {formatAdminTableDate(row.created_at)}
                  </TableCell>
                  <TableCell className="whitespace-normal text-sm text-zinc-600">
                    {formatAdminTableDate(row.updated_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className="relative inline-flex"
                      data-category-actions-menu
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                        aria-label={`Open actions for category ${row.public_id}`}
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
        menuDataAttribute="category"
      />

      {deleteTargetCategoryId ? (
        <AdminResourceDeleteDialog
          resourceLabel="category"
          resourceId={deleteTargetCategoryId}
          isDeleting={isDeletingCategory}
          onCancel={closeDeleteDialog}
          onConfirm={confirmDeleteCategory}
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

export function AdminCategoriesTable() {
  return (
    <AdminListPageSuspense>
      <AdminCategoriesTableInner />
    </AdminListPageSuspense>
  );
}
