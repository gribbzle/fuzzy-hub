"use client";

import {
  ADMIN_TABLE_LIMIT_OPTIONS,
  getAdminPaginationSummary,
} from "../adminTableUtils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Select } from "../ui/select";

export interface AdminTablePaginationState {
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
}

export interface AdminTablePaginationActions {
  onPageChange: (nextPage: number) => void;
  onLimitChangeValue: (nextLimit: number) => void;
}

interface AdminTablePaginationProps {
  state: AdminTablePaginationState;
  actions: AdminTablePaginationActions;
}

export function AdminTablePagination({
  state,
  actions,
}: AdminTablePaginationProps) {
  const {
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
  } = state;
  const { onPageChange, onLimitChangeValue } = actions;

  const paginationSummary = getAdminPaginationSummary(
    total,
    rangeStart,
    rangeEnd,
    isLoading,
  );

  return (
    <div className="mt-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="min-w-0 text-xs text-zinc-600">
          <span aria-live="polite" className="font-medium text-zinc-700">
            {paginationSummary}
          </span>
          <span className="ml-3 text-zinc-500">
            Page {Math.min(page, totalPages)} of {totalPages}
          </span>
        </div>

        <Pagination className="mx-auto w-auto justify-center">
          <PaginationContent>
            <PaginationItem className="hidden sm:list-item">
              <PaginationLink
                aria-label="Go to first page"
                disabled={!canPrev}
                onClick={() => canPrev && onPageChange(1)}
                className="px-2 text-xs"
              >
                First
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                disabled={!canPrev}
                onClick={() => canPrev && onPageChange(page - 1)}
              />
            </PaginationItem>

            {pageItems.map((item, idx) => {
              if (item === "ellipsis") {
                return (
                  <PaginationItem
                    key={`ellipsis-${idx}`}
                    className="hidden sm:list-item"
                  >
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={page === item}
                    aria-label={`Go to page ${item}`}
                    onClick={() => onPageChange(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                disabled={!canNext}
                onClick={() => canNext && onPageChange(page + 1)}
              />
            </PaginationItem>
            <PaginationItem className="hidden sm:list-item">
              <PaginationLink
                aria-label="Go to last page"
                disabled={!canNext}
                onClick={() => canNext && onPageChange(totalPages)}
                className="px-2 text-xs"
              >
                Last
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="flex justify-end">
          <label className="inline-flex items-center gap-2 text-xs text-zinc-600">
            Rows per page
            <Select
              value={String(limit)}
              onValueChange={(value) => onLimitChangeValue(Number(value))}
              options={ADMIN_TABLE_LIMIT_OPTIONS.map((n) => ({
                value: String(n),
                label: String(n),
              }))}
              minimal
              className="w-[60px]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
