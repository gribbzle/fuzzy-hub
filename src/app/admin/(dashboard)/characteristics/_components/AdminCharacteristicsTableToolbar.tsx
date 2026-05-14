"use client";

import type { FormEvent, RefObject } from "react";

import { AdminPrimaryAddLink } from "../../_components/AdminPrimaryAddLink";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";
import { Select, type SelectOption } from "../../_components/ui/select";

interface AdminCharacteristicsTableToolbarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

interface AdminCharacteristicsTableToolbarAdvancedProps {
  popoverRef: RefObject<HTMLDivElement | null>;
  open: boolean;
  onToggle: () => void;
  badgeCount: number;
  hasActiveFilters: boolean;
  typeDraft: string;
  onTypeDraftChange: (value: string) => void;
  groupDraft: string;
  onGroupDraftChange: (value: string) => void;
  typeOptions: SelectOption[];
  groupOptions: SelectOption[];
  onFiltersSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFiltersReset: () => void;
}

interface AdminCharacteristicsTableToolbarProps {
  search: AdminCharacteristicsTableToolbarSearchProps;
  filtersPanel: AdminCharacteristicsTableToolbarAdvancedProps;
}

export function AdminCharacteristicsTableToolbar({
  search,
  filtersPanel,
}: AdminCharacteristicsTableToolbarProps) {
  const {
    popoverRef,
    open: filtersPopoverOpen,
    onToggle: onFiltersToggle,
    badgeCount,
    hasActiveFilters,
    typeDraft,
    onTypeDraftChange,
    groupDraft,
    onGroupDraftChange,
    typeOptions,
    groupOptions,
    onFiltersSubmit,
    onFiltersReset,
  } = filtersPanel;

  return (
    <div className="flex items-center justify-end gap-2">
      <Input
        inputSize="compact"
        value={search.value}
        onChange={(event) => search.onChange(event.target.value)}
        placeholder="Search characteristics..."
        className="w-44"
      />
      <div className="relative" ref={popoverRef}>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="relative h-9 w-9"
          aria-label="Open advanced filters"
          onClick={onFiltersToggle}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 5h18" />
            <path d="M6 12h12" />
            <path d="M10 19h4" />
          </svg>
          {badgeCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] leading-4 text-white">
              {badgeCount}
            </span>
          ) : null}
        </Button>

        {filtersPopoverOpen ? (
          <form
            onSubmit={onFiltersSubmit}
            className="absolute right-0 top-full z-20 mt-2 w-80 rounded-md border border-zinc-200 bg-white p-3"
          >
            <div className="space-y-2">
              <div>
                <span className="mb-1 block text-xs font-medium text-zinc-600">
                  Type
                </span>
                <Select
                  value={typeDraft}
                  options={typeOptions}
                  placeholder="All types"
                  minimal
                  className="w-full"
                  onValueChange={onTypeDraftChange}
                />
              </div>
              <div>
                <span className="mb-1 block text-xs font-medium text-zinc-600">
                  Group
                </span>
                <Select
                  value={groupDraft}
                  options={groupOptions}
                  placeholder="All groups"
                  minimal
                  className="w-full"
                  onValueChange={onGroupDraftChange}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onFiltersReset}
                >
                  Clear
                </Button>
              ) : null}
              <Button type="submit" size="sm">
                Apply
              </Button>
            </div>
          </form>
        ) : null}
      </div>
      <AdminPrimaryAddLink href="/admin/characteristics/new">
        Add characteristic
      </AdminPrimaryAddLink>
    </div>
  );
}
