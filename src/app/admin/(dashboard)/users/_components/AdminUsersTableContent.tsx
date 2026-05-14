"use client";

import type { Dispatch, MutableRefObject, SetStateAction } from "react";

import { AdminUserListItem } from "@/app/admin/(dashboard)/_models";

import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { AdminTableListBody } from "../../_components/AdminTableListBody";
import { formatAdminTableDate } from "../../_components/adminTableUtils";
import { AdminClickableTableRow } from "../../_components/table/AdminClickableTableRow";
import { Button } from "../../_components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/ui/table";

interface AdminUsersTableContentProps {
  users: AdminUserListItem[];
  isLoading: boolean;
  onNavigateToEdit: (publicId: string, openInNewTab?: boolean) => void;
  actionTriggerRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>;
  setOpenActionsId: Dispatch<SetStateAction<string | null>>;
}

export function AdminUsersTableContent({
  users,
  isLoading,
  onNavigateToEdit,
  actionTriggerRefs,
  setOpenActionsId,
}: AdminUsersTableContentProps) {
  return (
    <AdminListTableFrame>
      <Table className="w-full min-w-[720px] table-fixed">
        <colgroup>
          <col style={{ width: "34%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "22%" }} />
        </colgroup>
        <TableHeader>
          <TableRow className="bg-zinc-50 hover:bg-zinc-50">
            <TableHead className="text-xs uppercase">Email</TableHead>
            <TableHead className="text-xs uppercase">Verified</TableHead>
            <TableHead className="text-xs uppercase">Created</TableHead>
            <TableHead className="text-xs uppercase text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AdminTableListBody
            colSpan={4}
            isLoading={isLoading}
            isEmpty={users.length === 0}
            emptyMessage="No users found."
          >
            {users.map((row: AdminUserListItem) => (
              <AdminClickableTableRow
                key={row.public_id}
                entityPublicId={row.public_id}
                navigateToEdit={onNavigateToEdit}
              >
                <TableCell className="max-w-0 truncate font-medium break-all">
                  {row.email}
                </TableCell>
                <TableCell className="text-sm text-zinc-600 whitespace-normal">
                  {row.email_verified_at ? (
                    <time dateTime={row.email_verified_at}>
                      {formatAdminTableDate(row.email_verified_at)}
                    </time>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-zinc-600 whitespace-normal">
                  <time dateTime={row.created_at}>
                    {formatAdminTableDate(row.created_at)}
                  </time>
                </TableCell>
                <TableCell className="text-right">
                  <div className="relative inline-flex" data-user-actions-menu>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                      aria-label={`Open actions for user ${row.public_id}`}
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
