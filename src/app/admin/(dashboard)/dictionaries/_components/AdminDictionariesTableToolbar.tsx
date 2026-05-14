"use client";

import type { FormEvent, RefObject } from "react";

import { AdminPrimaryAddLink } from "../../_components/AdminPrimaryAddLink";
import { Button } from "../../_components/ui/button";
import { Input } from "../../_components/ui/input";

export interface AdminDictionariesToolbarModel {
  search: { value: string; onChange: (value: string) => void };
  filtersOpen: boolean;
  onToggleFilters: () => void;
  advanced: {
    name: { value: string; onChange: (value: string) => void };
    slug: { value: string; onChange: (value: string) => void };
    badgeCount: number;
    hasActiveFilters: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onReset: () => void;
  };
}

interface AdminDictionariesTableToolbarProps {
  toolbar: AdminDictionariesToolbarModel;
  filtersAnchorRef: RefObject<HTMLDivElement | null>;
}

export function AdminDictionariesTableToolbar({
  toolbar,
  filtersAnchorRef,
}: AdminDictionariesTableToolbarProps) {
  const { search, filtersOpen, onToggleFilters, advanced } = toolbar;

  return (
    <div className="flex items-center justify-end gap-2">
      <Input
        inputSize="compact"
        value={search.value}
        onChange={(event) => search.onChange(event.target.value)}
        placeholder="Search dictionaries..."
        className="w-44"
      />
      <div className="relative" ref={filtersAnchorRef}>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="relative h-9 w-9"
          aria-label="Open advanced filters"
          onClick={onToggleFilters}
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
          {advanced.badgeCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] leading-4 text-white">
              {advanced.badgeCount}
            </span>
          ) : null}
        </Button>

        {filtersOpen ? (
          <form
            onSubmit={advanced.onSubmit}
            className="absolute right-0 top-full z-20 mt-2 w-80 rounded-md border border-zinc-200 bg-white p-3"
          >
            <div className="space-y-2">
              <div>
                <span className="mb-1 block text-xs font-medium text-zinc-600">
                  Name
                </span>
                <Input
                  inputSize="compact"
                  value={advanced.name.value}
                  onChange={(event) =>
                    advanced.name.onChange(event.target.value)
                  }
                  placeholder="Dictionary name"
                />
              </div>
              <div>
                <span className="mb-1 block text-xs font-medium text-zinc-600">
                  Slug
                </span>
                <Input
                  inputSize="compact"
                  value={advanced.slug.value}
                  onChange={(event) =>
                    advanced.slug.onChange(event.target.value)
                  }
                  placeholder="dictionary-slug"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              {advanced.hasActiveFilters ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={advanced.onReset}
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
      <AdminPrimaryAddLink href="/admin/dictionaries/new">
        Add dictionary
      </AdminPrimaryAddLink>
    </div>
  );
}
