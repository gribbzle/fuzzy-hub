"use client";

import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import { AdminDictionary } from "@/app/admin/(dashboard)/_models";

import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { AdminTableListBody } from "../../_components/AdminTableListBody";
import { formatAdminTableDate } from "../../_components/adminTableUtils";
import { AdminClickableTableRow } from "../../_components/table/AdminClickableTableRow";
import { AdminTableOptionalText } from "../../_components/table/AdminTableOptionalText";
import { Button } from "../../_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/ui/table";

interface AdminDictionariesTableContentProps {
  dictionaries: AdminDictionary[];
  isLoading: boolean;
  onNavigateToEdit: (publicId: string, openInNewTab?: boolean) => void;
  actionTriggerRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  setOpenActionsId: Dispatch<SetStateAction<string | null>>;
}

export function AdminDictionariesTableContent({
  dictionaries,
  isLoading,
  onNavigateToEdit,
  actionTriggerRefs,
  setOpenActionsId,
}: AdminDictionariesTableContentProps) {
  return (
    <AdminListTableFrame>
      <Table className="w-full min-w-[960px] table-fixed">
        <colgroup>
          <col style={{ width: "16%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "9%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "12%" }} />
        </colgroup>
        <TableHeader>
          <TableRow className="bg-zinc-50 hover:bg-zinc-50">
            <TableHead className="text-xs uppercase">Name</TableHead>
            <TableHead className="text-xs uppercase">Slug</TableHead>
            <TableHead className="text-xs uppercase">Description</TableHead>
            <TableHead className="text-xs uppercase text-right">
              Items
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
            isEmpty={dictionaries.length === 0}
            emptyMessage="No dictionaries found."
          >
            {dictionaries.map((row: AdminDictionary) => (
              <AdminClickableTableRow
                key={row.public_id}
                entityPublicId={row.public_id}
                navigateToEdit={onNavigateToEdit}
              >
                <TableCell className="max-w-0 truncate font-medium break-all">
                  {row.name}
                </TableCell>
                <TableCell className="max-w-0 truncate font-mono text-sm text-zinc-700">
                  {row.slug}
                </TableCell>
                <TableCell className="max-w-0">
                  <AdminTableOptionalText
                    value={row.description}
                    className="line-clamp-2 text-sm text-zinc-600"
                  />
                </TableCell>
                <TableCell className="text-right tabular-nums text-sm text-zinc-700">
                  {Array.isArray(row.items) ? row.items.length : 0}
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
                    data-dictionary-actions-menu
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                      aria-label={`Open actions for dictionary ${row.public_id}`}
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
  );
}
