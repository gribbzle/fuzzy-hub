"use client";

import { Suspense, useCallback, useMemo, useState } from "react";

import { useAdminDictionaryItemsQuery } from "@/app/admin/(dashboard)/_hooks/useAdminDictionaryItemsQuery";
import { AdminDictionaryItem } from "@/app/admin/(dashboard)/_models";
import { useSWRConfig } from "swr";

import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { AdminResourceDeleteDialog } from "../../_components/AdminResourceDeleteDialog";
import { AdminRowActionsPortal } from "../../_components/AdminRowActionsPortal";
import { AdminTableListBody } from "../../_components/AdminTableListBody";
import { FormErrorAlert } from "../../_components/FormErrorAlert";
import { formatAdminTableDate } from "../../_components/adminTableUtils";
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
import { useAdminDictionaryItemDelete } from "../../_components/useAdminDictionaryItemDelete";
import { useAdminDictionaryItemRowActionsMenu } from "../../_components/useAdminDictionaryItemRowActionsMenu";
import { useAdminTablePaginationDerived } from "../../_components/useAdminTablePagination";
import { useAdminTablePageLimitUrlPagination } from "../../_hooks/useAdminSearchParamsPagination";
import { DictionaryItemFormModal } from "./DictionaryItemFormModal";

const EMPTY_DICTIONARY_ITEMS: AdminDictionaryItem[] = [];

interface AdminDictionaryItemsTableInnerProps {
  dictionaryId: string;
}

function AdminDictionaryItemsTableInner({
  dictionaryId,
}: AdminDictionaryItemsTableInnerProps) {
  const { mutate: globalMutate } = useSWRConfig();
  const { page, limit, setQuery } = useAdminTablePageLimitUrlPagination();
  const { data, error, isLoading, mutate } = useAdminDictionaryItemsQuery(
    dictionaryId,
    page,
    limit,
  );
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
  } = useAdminDictionaryItemRowActionsMenu();

  const {
    deleteTargetItemId,
    isDeletingItem,
    deleteError,
    closeDeleteDialog,
    confirmDeleteItem,
    requestDelete,
  } = useAdminDictionaryItemDelete(dictionaryId, mutate);

  const [itemModal, setItemModal] = useState<{
    open: boolean;
    mode: "create" | "edit";
    item: AdminDictionaryItem | null;
  }>({ open: false, mode: "create", item: null });

  const items = useMemo(
    () => data?.data.items ?? EMPTY_DICTIONARY_ITEMS,
    [data?.data.items],
  );

  const revalidateAfterItemChange = useCallback(async () => {
    await mutate();
    await globalMutate(
      (key) => Array.isArray(key) && key[0] === "admin-dictionaries",
      undefined,
      { revalidate: true },
    );
    await globalMutate(["admin-dictionary", dictionaryId], undefined, {
      revalidate: true,
    });
  }, [dictionaryId, globalMutate, mutate]);

  const openCreateModal = useCallback(() => {
    setItemModal({ open: true, mode: "create", item: null });
  }, []);

  const handleActionsEdit = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      const row = items.find((i) => i.public_id === publicId) ?? null;
      if (row) {
        setItemModal({ open: true, mode: "edit", item: row });
      }
    },
    [items, setOpenActionsId],
  );

  const handleActionsRequestDelete = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      requestDelete(publicId);
    },
    [requestDelete, setOpenActionsId],
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-zinc-900">
            items
          </h3>
          <Button
            type="button"
            className="h-9 shrink-0"
            onClick={openCreateModal}
          >
            Add item
          </Button>
        </div>

        {error ? (
          <FormErrorAlert className="mb-4">
            {error instanceof Error
              ? error.message
              : "Failed to load dictionary items."}
          </FormErrorAlert>
        ) : null}
        {deleteError ? (
          <FormErrorAlert className="mb-4">{deleteError}</FormErrorAlert>
        ) : null}

        <AdminListTableFrame className="bg-transparent">
          <Table className="w-full min-w-[960px] table-fixed">
            <colgroup>
              <col style={{ width: "18%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "24%" }} />
              <col style={{ width: "7%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "14%" }} />
            </colgroup>
            <TableHeader>
              <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                <TableHead className="text-xs uppercase">Public ID</TableHead>
                <TableHead className="text-xs uppercase">Value</TableHead>
                <TableHead className="text-xs uppercase">Label</TableHead>
                <TableHead className="text-xs uppercase text-right">
                  Order
                </TableHead>
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
                isEmpty={items.length === 0}
                emptyMessage="No items in this dictionary."
              >
                {items.map((row: AdminDictionaryItem) => (
                  <TableRow key={row.public_id} className="hover:bg-zinc-50/80">
                    <TableCell className="max-w-0 truncate font-mono text-xs break-all text-zinc-700">
                      {row.public_id}
                    </TableCell>
                    <TableCell className="max-w-0 truncate font-mono text-sm text-zinc-800">
                      {row.value}
                    </TableCell>
                    <TableCell className="max-w-0 whitespace-normal text-sm text-zinc-800">
                      {row.label}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-sm text-zinc-700">
                      {row.order}
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
                        data-dictionary-item-actions-menu
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                          aria-label={`Open actions for item ${row.public_id}`}
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
                  </TableRow>
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
          menuDataAttribute="dictionary-item"
        />

        {deleteTargetItemId ? (
          <AdminResourceDeleteDialog
            resourceLabel="dictionary-item"
            resourceId={deleteTargetItemId}
            isDeleting={isDeletingItem}
            onCancel={closeDeleteDialog}
            onConfirm={confirmDeleteItem}
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
      </div>

      <DictionaryItemFormModal
        open={itemModal.open}
        onClose={() =>
          setItemModal((prev) => ({ ...prev, open: false, item: null }))
        }
        dictionaryId={dictionaryId}
        mode={itemModal.mode}
        item={itemModal.item}
        onSaveSuccess={revalidateAfterItemChange}
      />
    </div>
  );
}

interface AdminDictionaryItemsTableProps {
  dictionaryId: string;
}

export function AdminDictionaryItemsTable({
  dictionaryId,
}: AdminDictionaryItemsTableProps) {
  return (
    <Suspense
      fallback={
        <div className="p-4 sm:p-6 text-sm text-zinc-500">Loading...</div>
      }
    >
      <AdminDictionaryItemsTableInner dictionaryId={dictionaryId} />
    </Suspense>
  );
}
