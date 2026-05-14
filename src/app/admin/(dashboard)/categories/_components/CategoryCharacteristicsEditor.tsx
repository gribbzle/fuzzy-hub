"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminCategoryCharacteristicsQuery } from "@/app/admin/(dashboard)/_hooks/useAdminCategoryCharacteristicsQuery";
import { useAdminLocalListPagination } from "@/app/admin/(dashboard)/_hooks/useAdminLocalListPagination";
import { type AdminCategoryCharacteristicItem } from "@/app/admin/(dashboard)/_models";

import { AdminConfirmDialog } from "../../_components/AdminConfirmDialog";
import { useAdminNotifications } from "../../_components/AdminNotifications";
import { FormErrorAlert } from "../../_components/FormErrorAlert";
import { DEFAULT_ADMIN_TABLE_LIMIT } from "../../_components/adminTableUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card";
import { useAdminCategoryCharacteristicModalsForms } from "../_hooks/useAdminCategoryCharacteristicModalsForms";
import {
  CategoryCharacteristicCreateModal,
  CategoryCharacteristicEditModal,
} from "./category-characteristics/CategoryCharacteristicModals";
import { CategoryCharacteristicsAssignedTable } from "./category-characteristics/CategoryCharacteristicsAssignedTable";
import type { CategoryCharacteristicFormValues } from "./category-characteristics/categoryCharacteristicFormTypes";
import {
  createCategoryCharacteristic,
  deleteCategoryCharacteristic,
  updateCategoryCharacteristic,
} from "./category-characteristics/categoryCharacteristicsApi";

interface CategoryCharacteristicsEditorProps {
  categoryId: string;
}

function loadErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

export function CategoryCharacteristicsEditor({
  categoryId,
}: CategoryCharacteristicsEditorProps) {
  const { notifySuccess, notifyError } = useAdminNotifications();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_ADMIN_TABLE_LIMIT);

  const {
    data: characteristicsResponse,
    error: characteristicsError,
    isLoading: isLoadingCharacteristics,
    mutate: mutateCharacteristics,
  } = useAdminCategoryCharacteristicsQuery(categoryId, page, limit);

  const assignedCharacteristics = useMemo(
    () => characteristicsResponse?.data.items ?? [],
    [characteristicsResponse?.data.items],
  );
  const total = characteristicsResponse?.data.total ?? 0;
  const hasListData = Boolean(characteristicsResponse?.data);

  const {
    pageForDisplay,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = useAdminLocalListPagination({
    hasListData,
    total,
    page,
    setPage,
    limit,
  });

  const defaultOrder = useMemo(() => {
    if (assignedCharacteristics.length === 0) {
      return 1;
    }
    return (
      Math.max(...assignedCharacteristics.map((item) => item.order || 0)) + 1
    );
  }, [assignedCharacteristics]);

  const { createForm, editForm } = useAdminCategoryCharacteristicModalsForms();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCharacteristicId, setEditingCharacteristicId] = useState<
    string | null
  >(null);
  const [deleteTargetCharacteristicId, setDeleteTargetCharacteristicId] =
    useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingCharacteristicId, setDeletingCharacteristicId] = useState<
    string | null
  >(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const editingItem = useMemo(
    () =>
      assignedCharacteristics.find(
        (item) => item.characteristic.public_id === editingCharacteristicId,
      ) ?? null,
    [assignedCharacteristics, editingCharacteristicId],
  );

  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setEditingCharacteristicId(null);
  }, []);

  const openCreateModal = useCallback(() => {
    setActionError(null);
    createForm.reset({
      characteristic_id: "",
      order: defaultOrder,
      is_required: true,
    });
    setIsCreateModalOpen(true);
  }, [createForm, defaultOrder]);

  const openEditModal = useCallback(
    (item: AdminCategoryCharacteristicItem) => {
      setActionError(null);
      setEditingCharacteristicId(item.characteristic.public_id);
      editForm.reset({
        characteristic_id: item.characteristic.public_id,
        order: item.order,
        is_required: item.is_required,
      });
      setIsEditModalOpen(true);
    },
    [editForm],
  );

  const onCreateValid = useCallback(
    async (formValues: CategoryCharacteristicFormValues) => {
      setActionError(null);
      setIsSaving(true);

      const result = await createCategoryCharacteristic(categoryId, {
        characteristic_id: formValues.characteristic_id,
        order: formValues.order,
        is_required: formValues.is_required,
      });

      if (!result.ok) {
        if (result.kind !== "unauthorized") {
          setActionError(result.message);
          notifyError(result.message);
        }
        setIsSaving(false);
        return;
      }

      await mutateCharacteristics();
      setIsSaving(false);
      closeCreateModal();
      createForm.reset({
        characteristic_id: "",
        order: defaultOrder + 1,
        is_required: true,
      });
      notifySuccess("Category characteristic added successfully.");
    },
    [
      categoryId,
      closeCreateModal,
      createForm,
      defaultOrder,
      mutateCharacteristics,
      notifyError,
      notifySuccess,
    ],
  );

  const onEditValid = useCallback(
    async (formValues: CategoryCharacteristicFormValues) => {
      if (!editingCharacteristicId) {
        return;
      }

      setActionError(null);
      setIsSaving(true);

      const result = await updateCategoryCharacteristic(
        categoryId,
        editingCharacteristicId,
        {
          order: formValues.order,
          is_required: formValues.is_required,
        },
      );

      if (!result.ok) {
        if (result.kind !== "unauthorized") {
          setActionError(result.message);
          notifyError(result.message);
        }
        setIsSaving(false);
        return;
      }

      await mutateCharacteristics();
      setIsSaving(false);
      closeEditModal();
      editForm.reset({
        characteristic_id: "",
        order: 1,
        is_required: true,
      });
      notifySuccess("Category characteristic updated successfully.");
    },
    [
      categoryId,
      closeEditModal,
      editForm,
      editingCharacteristicId,
      mutateCharacteristics,
      notifyError,
      notifySuccess,
    ],
  );

  const confirmDelete = useCallback(async () => {
    if (!deleteTargetCharacteristicId) {
      return;
    }

    setActionError(null);
    setDeletingCharacteristicId(deleteTargetCharacteristicId);
    const result = await deleteCategoryCharacteristic(
      categoryId,
      deleteTargetCharacteristicId,
    );

    if (!result.ok) {
      if (result.kind !== "unauthorized") {
        setActionError(result.message);
        notifyError(result.message);
      }
      setDeletingCharacteristicId(null);
      return;
    }

    await mutateCharacteristics();
    setDeletingCharacteristicId(null);
    setDeleteTargetCharacteristicId(null);
    notifySuccess("Category characteristic removed successfully.");
  }, [
    categoryId,
    deleteTargetCharacteristicId,
    mutateCharacteristics,
    notifyError,
    notifySuccess,
  ]);

  return (
    <div className="p-4 pt-0 sm:p-6 sm:pt-0">
      <div className="mx-auto w-full max-w-none">
        <Card>
          <CardHeader>
            <CardTitle>Characteristics</CardTitle>
            <CardDescription>
              Configure which characteristics are available for this category.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {characteristicsError ? (
              <FormErrorAlert>
                {loadErrorMessage(
                  characteristicsError,
                  "Failed to load category characteristics.",
                )}
              </FormErrorAlert>
            ) : null}
            {actionError ? (
              <FormErrorAlert>{actionError}</FormErrorAlert>
            ) : null}

            <CategoryCharacteristicsAssignedTable
              assignedCharacteristics={assignedCharacteristics}
              isLoadingCharacteristics={isLoadingCharacteristics}
              onAddClick={openCreateModal}
              onEdit={openEditModal}
              onRequestDelete={setDeleteTargetCharacteristicId}
              deletingCharacteristicId={deletingCharacteristicId}
              pagination={{
                total,
                totalPages,
                rangeStart,
                rangeEnd,
                isLoading: isLoadingCharacteristics,
                page: pageForDisplay,
                limit,
                canPrev,
                canNext,
                pageItems,
                onPageChange: (nextPage) => setPage(nextPage),
                onLimitChangeValue: (nextLimit) => {
                  setLimit(nextLimit);
                  setPage(1);
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <CategoryCharacteristicCreateModal
        open={isCreateModalOpen}
        isSaving={isSaving}
        control={createForm.control}
        errors={createForm.formState.errors}
        onClose={closeCreateModal}
        onSubmit={createForm.handleSubmit(onCreateValid)}
      />

      <CategoryCharacteristicEditModal
        open={isEditModalOpen && Boolean(editingCharacteristicId)}
        isSaving={isSaving}
        control={editForm.control}
        errors={editForm.formState.errors}
        editingItem={editingItem}
        onClose={closeEditModal}
        onSubmit={editForm.handleSubmit(onEditValid)}
      />

      <AdminConfirmDialog
        open={Boolean(deleteTargetCharacteristicId)}
        title="Delete characteristic?"
        titleId="delete-category-characteristic-title"
        descriptionId="delete-category-characteristic-description"
        description="This characteristic will be removed from the category."
        onCancel={() => setDeleteTargetCharacteristicId(null)}
        onConfirm={() => {
          void confirmDelete();
        }}
        isProcessing={Boolean(
          deleteTargetCharacteristicId &&
          deletingCharacteristicId === deleteTargetCharacteristicId,
        )}
        backdropDismissDisabled={Boolean(
          deleteTargetCharacteristicId &&
          deletingCharacteristicId === deleteTargetCharacteristicId,
        )}
      />
    </div>
  );
}
