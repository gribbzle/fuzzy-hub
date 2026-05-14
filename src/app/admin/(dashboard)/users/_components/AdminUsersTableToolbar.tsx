"use client";

import { Input } from "../../_components/ui/input";
import type { SelectOption } from "../../_components/ui/select";
import { Select } from "../../_components/ui/select";

const PROFILE_TYPE_FILTER_OPTIONS: SelectOption[] = [
  { value: "", label: "Any profile type" },
  { value: "customer", label: "Customer" },
  { value: "breeder", label: "Breeder" },
  { value: "service", label: "Service" },
  { value: "admin", label: "Admin" },
];

interface AdminUsersTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  hasProfileTypeValue: string;
  onHasProfileTypeChange: (value: string) => void;
}

export function AdminUsersTableToolbar({
  searchValue,
  onSearchChange,
  hasProfileTypeValue,
  onHasProfileTypeChange,
}: AdminUsersTableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Input
        inputSize="compact"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by email…"
        className="w-52 min-w-[11rem]"
      />
      <Select
        value={hasProfileTypeValue}
        options={PROFILE_TYPE_FILTER_OPTIONS}
        onValueChange={onHasProfileTypeChange}
        className="w-48 min-w-[12rem]"
      />
    </div>
  );
}
