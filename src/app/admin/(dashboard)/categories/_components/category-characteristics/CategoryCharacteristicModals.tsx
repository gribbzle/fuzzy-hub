"use client";

import type { FormEventHandler } from "react";

import type { AdminCategoryCharacteristicItem } from "@/app/admin/(dashboard)/_models";
import { type Control, Controller, type FieldErrors } from "react-hook-form";

import { AdminModal } from "../../../_components/AdminModal";
import { Button } from "../../../_components/ui/button";
import { Input } from "../../../_components/ui/input";
import { Switch } from "../../../_components/ui/switch";
import { CharacteristicIdSelect } from "./CharacteristicIdSelect";
import type { CategoryCharacteristicFormValues } from "./categoryCharacteristicFormTypes";

interface CreateModalProps {
  open: boolean;
  isSaving: boolean;
  control: Control<CategoryCharacteristicFormValues>;
  errors: FieldErrors<CategoryCharacteristicFormValues>;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function CategoryCharacteristicCreateModal({
  open,
  isSaving,
  control,
  errors,
  onClose,
  onSubmit,
}: CreateModalProps) {
  return (
    <AdminModal
      open={open}
      onClose={onClose}
      backdropDismissDisabled={isSaving}
      titleId="add-category-characteristic-modal-title"
      title="Add characteristic"
      description="Attach an existing characteristic to this category."
    >
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label
            className="text-xs font-medium uppercase text-zinc-600"
            htmlFor="category-characteristic-id"
          >
            Characteristic
          </label>
          <Controller
            name="characteristic_id"
            control={control}
            render={({ field }) => (
              <CharacteristicIdSelect
                id="category-characteristic-id"
                value={field.value}
                disabled={isSaving}
                onValueChange={field.onChange}
              />
            )}
          />
          {errors.characteristic_id?.message ? (
            <p className="text-xs text-red-600">
              {String(errors.characteristic_id.message)}
            </p>
          ) : null}
        </div>
        <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
          <div className="space-y-1">
            <label
              className="text-xs font-medium uppercase text-zinc-600"
              htmlFor="category-characteristic-order"
            >
              Order
            </label>
            <Controller
              name="order"
              control={control}
              render={({ field }) => (
                <Input
                  id="category-characteristic-order"
                  inputSize="compact"
                  type="number"
                  min={1}
                  value={field.value}
                  disabled={isSaving}
                  onChange={(event) => {
                    field.onChange(Number(event.target.value || 0));
                  }}
                />
              )}
            />
            {errors.order?.message ? (
              <p className="text-xs text-red-600">
                {String(errors.order.message)}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <span className="text-xs font-medium uppercase text-zinc-600">
              Required
            </span>
            <div className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2">
              <Controller
                name="is_required"
                control={control}
                render={({ field }) => (
                  <>
                    <Switch
                      checked={field.value}
                      disabled={isSaving}
                      onCheckedChange={field.onChange}
                    />
                    <span className="text-sm text-zinc-700">
                      {field.value
                        ? "Is required"
                        : "Optional for listing creation"}
                    </span>
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Add characteristic"}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}

interface EditModalProps {
  open: boolean;
  isSaving: boolean;
  control: Control<CategoryCharacteristicFormValues>;
  errors: FieldErrors<CategoryCharacteristicFormValues>;
  editingItem: AdminCategoryCharacteristicItem | null;
  onClose: () => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function CategoryCharacteristicEditModal({
  open,
  isSaving,
  control,
  errors,
  editingItem,
  onClose,
  onSubmit,
}: EditModalProps) {
  return (
    <AdminModal
      open={open}
      onClose={onClose}
      backdropDismissDisabled={isSaving}
      titleId="edit-category-characteristic-modal-title"
      title="Edit characteristic"
      description="Update ordering and requirement settings."
    >
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <div className="space-y-1">
          <span className="block text-xs font-medium uppercase text-zinc-600">
            Characteristic
          </span>
          <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
            {editingItem?.characteristic.name ?? "Unknown characteristic"}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
          <div className="space-y-1">
            <label
              className="text-xs font-medium uppercase text-zinc-600"
              htmlFor="category-characteristic-edit-order"
            >
              Order
            </label>
            <Controller
              name="order"
              control={control}
              render={({ field }) => (
                <Input
                  id="category-characteristic-edit-order"
                  inputSize="compact"
                  type="number"
                  min={1}
                  value={field.value}
                  disabled={isSaving}
                  onChange={(event) => {
                    field.onChange(Number(event.target.value || 0));
                  }}
                />
              )}
            />
            {errors.order?.message ? (
              <p className="text-xs text-red-600">
                {String(errors.order.message)}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <span className="text-xs font-medium uppercase text-zinc-600">
              Required
            </span>
            <div className="flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2">
              <Controller
                name="is_required"
                control={control}
                render={({ field }) => (
                  <>
                    <Switch
                      checked={field.value}
                      disabled={isSaving}
                      onCheckedChange={field.onChange}
                    />
                    <span className="text-sm text-zinc-700">
                      {field.value
                        ? "Is required"
                        : "Optional for listing creation"}
                    </span>
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save characteristic"}
          </Button>
        </div>
      </form>
    </AdminModal>
  );
}
