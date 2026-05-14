"use client";

import { Suspense, useCallback, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAdminUserProfilesQuery } from "@/app/admin/(dashboard)/_hooks/useAdminUserProfilesQuery";
import { AdminUserProfileListItem } from "@/app/admin/(dashboard)/_models";

import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { AdminRowActionsPortal } from "../../_components/AdminRowActionsPortal";
import { AdminTableListBody } from "../../_components/AdminTableListBody";
import { FormErrorAlert } from "../../_components/FormErrorAlert";
import { formatAdminTableDate } from "../../_components/adminTableUtils";
import { AdminClickableTableRow } from "../../_components/table/AdminClickableTableRow";
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
import { useAdminTablePaginationDerived } from "../../_components/useAdminTablePagination";
import { useAdminUserProfileRowActionsMenu } from "../../_components/useAdminUserProfileRowActionsMenu";
import { useAdminDebouncedUrlSearchSync } from "../../_hooks/useAdminDebouncedUrlSearchSync";
import { useAdminUserProfilesTableUrlPagination } from "../_hooks/useAdminUserProfilesTablePagination";
import { AdminUserProfileFormModal } from "./AdminUserProfileFormModal";
import { AdminUserProfilesTableToolbar } from "./AdminUserProfilesTableToolbar";

function AdminUserProfilesTableInner({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const profileFromUrl = searchParams.get("profile");

  const { page, limit, filters, setQuery } =
    useAdminUserProfilesTableUrlPagination();
  const { data, error, isLoading, mutate } = useAdminUserProfilesQuery(
    userId,
    page,
    limit,
    filters,
  );

  const {
    openActionsId,
    setOpenActionsId,
    openActionsPosition,
    actionTriggerRefs,
  } = useAdminUserProfileRowActionsMenu();

  const {
    total,
    totalPages,
    rangeStart,
    rangeEnd,
    canPrev,
    canNext,
    pageItems,
  } = useAdminTablePaginationDerived(data?.data, page, limit, setQuery);

  const profiles = data?.data.items ?? [];

  const [searchValue, setSearchValue] = useState(filters.search);

  const [profileModalPublicId, setProfileModalPublicId] = useState<
    string | null
  >(() => profileFromUrl);

  useEffect(() => {
    setProfileModalPublicId(profileFromUrl);
  }, [profileFromUrl]);

  useAdminDebouncedUrlSearchSync(searchValue, filters.search, limit, setQuery);

  const closeProfileEditor = useCallback(() => {
    setProfileModalPublicId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("profile");
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const openProfileEditor = useCallback(
    (profilePublicId: string, openInNewTab?: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("profile", profilePublicId);
      const href = `${pathname}?${params.toString()}`;
      if (openInNewTab) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      setProfileModalPublicId(profilePublicId);
      router.replace(href, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleActionsEdit = useCallback(
    (publicId: string) => {
      setOpenActionsId(null);
      openProfileEditor(publicId);
    },
    [openProfileEditor, setOpenActionsId],
  );

  const handleTypeChange = useCallback(
    (value: string) => {
      setQuery(1, limit, { type: value });
    },
    [limit, setQuery],
  );

  const handleApprovedChange = useCallback(
    (value: string) => {
      setQuery(1, limit, { approved: value });
    },
    [limit, setQuery],
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 sm:p-6">
        <div className="mb-4">
          <h3 className="text-base font-semibold tracking-tight text-zinc-900">
            Profiles
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            User profiles linked to this account.
          </p>
        </div>

        <AdminUserProfilesTableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          typeValue={filters.type}
          onTypeChange={handleTypeChange}
          approvedValue={filters.approved}
          onApprovedChange={handleApprovedChange}
        />

        {error ? (
          <FormErrorAlert className="mb-4">
            {error instanceof Error
              ? error.message
              : "Failed to load profiles."}
          </FormErrorAlert>
        ) : null}

        <AdminListTableFrame className="bg-transparent">
          <Table className="w-full min-w-[720px] table-fixed">
            <colgroup>
              <col style={{ width: "22%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "32%" }} />
            </colgroup>
            <TableHeader>
              <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                <TableHead className="text-xs uppercase">Public ID</TableHead>
                <TableHead className="text-xs uppercase">Type</TableHead>
                <TableHead className="text-xs uppercase">Approved</TableHead>
                <TableHead className="text-xs uppercase">Created</TableHead>
                <TableHead className="text-xs uppercase text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AdminTableListBody
                colSpan={5}
                isLoading={isLoading}
                isEmpty={profiles.length === 0}
                emptyMessage="No profiles found."
              >
                {profiles.map((row: AdminUserProfileListItem) => (
                  <AdminClickableTableRow
                    key={row.public_id}
                    entityPublicId={row.public_id}
                    navigateToEdit={openProfileEditor}
                  >
                    <TableCell className="max-w-0 truncate font-mono text-xs break-all text-zinc-700">
                      {row.public_id}
                    </TableCell>
                    <TableCell className="whitespace-normal text-sm font-medium text-zinc-900">
                      {row.type}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-700">
                      {row.approved ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="whitespace-normal text-sm text-zinc-600">
                      <time dateTime={row.created_at}>
                        {formatAdminTableDate(row.created_at)}
                      </time>
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className="relative inline-flex"
                        data-user-profile-actions-menu
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 cursor-pointer text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                          aria-label={`Open actions for profile ${row.public_id}`}
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
          showDelete={false}
          menuDataAttribute="user-profile"
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

        {profileModalPublicId ? (
          <AdminUserProfileFormModal
            open
            userPublicId={userId}
            profilePublicId={profileModalPublicId}
            onClose={closeProfileEditor}
            onSaveSuccess={() => {
              void mutate();
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

interface AdminUserProfilesTableProps {
  userId: string;
}

export function AdminUserProfilesTable({
  userId,
}: AdminUserProfilesTableProps) {
  return (
    <Suspense
      fallback={
        <div className="p-4 sm:p-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-500">
            Loading profiles…
          </div>
        </div>
      }
    >
      <AdminUserProfilesTableInner userId={userId} />
    </Suspense>
  );
}
