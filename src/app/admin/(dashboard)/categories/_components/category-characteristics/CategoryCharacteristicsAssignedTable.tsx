"use client";

import {
  type AdminCategoryCharacteristicItem,
  formatAdminCharacteristicGroupLabel,
  formatAdminCharacteristicTypeLabel,
} from "@/app/admin/(dashboard)/_models";

import { AdminListTableFrame } from "../../../_components/AdminListTableFrame";
import { AdminTablePagination } from "../../../_components/table/AdminTablePagination";
import { Button } from "../../../_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../_components/ui/table";

interface CategoryCharacteristicsAssignedTableProps {
  assignedCharacteristics: AdminCategoryCharacteristicItem[];
  isLoadingCharacteristics: boolean;
  onAddClick: () => void;
  onEdit: (item: AdminCategoryCharacteristicItem) => void;
  onRequestDelete: (characteristicPublicId: string) => void;
  deletingCharacteristicId: string | null;
  pagination: {
    total: number;
    totalPages: number;
    rangeStart: number;
    rangeEnd: number;
    isLoading: boolean;
    page: number;
    limit: number;
    canPrev: boolean;
    canNext: boolean;
    pageItems: (number | "ellipsis")[];
    onPageChange: (nextPage: number) => void;
    onLimitChangeValue: (nextLimit: number) => void;
  };
}

export function CategoryCharacteristicsAssignedTable({
  assignedCharacteristics,
  isLoadingCharacteristics,
  onAddClick,
  onEdit,
  onRequestDelete,
  deletingCharacteristicId,
  pagination,
}: CategoryCharacteristicsAssignedTableProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          Set ordering and required characteristics for this category.
        </p>
        <Button type="button" size="sm" onClick={onAddClick}>
          Add characteristic
        </Button>
      </div>

      <AdminListTableFrame className="bg-transparent">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50 hover:bg-zinc-50">
              <TableHead className="w-20 text-xs uppercase">Order</TableHead>
              <TableHead className="text-xs uppercase">
                Characteristic
              </TableHead>
              <TableHead className="text-xs uppercase">Type</TableHead>
              <TableHead className="text-xs uppercase">Group</TableHead>
              <TableHead className="w-28 text-xs uppercase">Required</TableHead>
              <TableHead className="w-44 text-right text-xs uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingCharacteristics &&
            assignedCharacteristics.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-zinc-500">
                  Loading characteristics...
                </TableCell>
              </TableRow>
            ) : null}
            {!isLoadingCharacteristics &&
            assignedCharacteristics.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-zinc-500">
                  No characteristics assigned yet.
                </TableCell>
              </TableRow>
            ) : null}
            {assignedCharacteristics.length > 0
              ? assignedCharacteristics.map((item) => (
                  <TableRow key={item.characteristic.public_id}>
                    <TableCell>{item.order}</TableCell>
                    <TableCell className="font-medium">
                      {item.characteristic.name}
                    </TableCell>
                    <TableCell>
                      {formatAdminCharacteristicTypeLabel(
                        item.characteristic.type,
                      )}
                    </TableCell>
                    <TableCell>
                      {formatAdminCharacteristicGroupLabel(
                        item.characteristic.group,
                      )}
                    </TableCell>
                    <TableCell>{item.is_required ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={
                            deletingCharacteristicId ===
                            item.characteristic.public_id
                          }
                          onClick={() =>
                            onRequestDelete(item.characteristic.public_id)
                          }
                        >
                          {deletingCharacteristicId ===
                          item.characteristic.public_id
                            ? "Deleting..."
                            : "Delete"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </AdminListTableFrame>

      <AdminTablePagination
        state={{
          total: pagination.total,
          totalPages: pagination.totalPages,
          rangeStart: pagination.rangeStart,
          rangeEnd: pagination.rangeEnd,
          isLoading: pagination.isLoading,
          page: pagination.page,
          limit: pagination.limit,
          canPrev: pagination.canPrev,
          canNext: pagination.canNext,
          pageItems: pagination.pageItems,
        }}
        actions={{
          onLimitChangeValue: pagination.onLimitChangeValue,
          onPageChange: pagination.onPageChange,
        }}
      />
    </>
  );
}
