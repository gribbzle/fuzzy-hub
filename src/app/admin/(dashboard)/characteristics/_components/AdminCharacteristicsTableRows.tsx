"use client";

import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import {
  type AdminCharacteristic,
  formatAdminCharacteristicGroupLabel,
  formatAdminCharacteristicTypeLabel,
} from "@/app/admin/(dashboard)/_models";

import { formatAdminTableDate } from "../../_components/adminTableUtils";
import { AdminClickableTableRow } from "../../_components/table/AdminClickableTableRow";
import { AdminTableOptionalText } from "../../_components/table/AdminTableOptionalText";
import { Button } from "../../_components/ui/button";
import { TableCell } from "../../_components/ui/table";

interface AdminCharacteristicsTableRowsProps {
  items: AdminCharacteristic[];
  navigateToEdit: (publicId: string, openInNewTab?: boolean) => void;
  actionTriggerRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  setOpenActionsId: Dispatch<SetStateAction<string | null>>;
}

export function AdminCharacteristicsTableRows({
  items,
  navigateToEdit,
  actionTriggerRefs,
  setOpenActionsId,
}: AdminCharacteristicsTableRowsProps) {
  return (
    <>
      {items.map((row) => (
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
          <TableCell>
            <span className="inline-flex rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs">
              {formatAdminCharacteristicTypeLabel(row.type)}
            </span>
          </TableCell>
          <TableCell className="max-w-0">
            <span className="line-clamp-2 text-sm text-zinc-700">
              {formatAdminCharacteristicGroupLabel(row.group)}
            </span>
          </TableCell>
          <TableCell className="max-w-0">
            <AdminTableOptionalText
              value={row.description}
              className="line-clamp-2 text-sm text-zinc-600"
            />
          </TableCell>
          <TableCell className="max-w-0 truncate text-sm text-zinc-700">
            <AdminTableOptionalText value={row.dictionary?.name ?? null} />
          </TableCell>
          <TableCell className="max-w-0 truncate text-sm text-zinc-600">
            <AdminTableOptionalText value={row.unit} />
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
              data-characteristic-actions-menu
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                aria-label={`Open actions for characteristic ${row.public_id}`}
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
    </>
  );
}
