"use client";

import { Input } from "../../_components/ui/input";
import type { SelectOption } from "../../_components/ui/select";
import { Select } from "../../_components/ui/select";

const TYPE_OPTIONS: SelectOption[] = [
  { value: "", label: "Any type" },
  { value: "customer", label: "Customer" },
  { value: "breeder", label: "Breeder" },
  { value: "service", label: "Service" },
  { value: "admin", label: "Admin" },
];

const APPROVED_OPTIONS: SelectOption[] = [
  { value: "", label: "Any status" },
  { value: "true", label: "Approved" },
  { value: "false", label: "Not approved" },
];

interface AdminUserProfilesTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  typeValue: string;
  onTypeChange: (value: string) => void;
  approvedValue: string;
  onApprovedChange: (value: string) => void;
}

export function AdminUserProfilesTableToolbar({
  searchValue,
  onSearchChange,
  typeValue,
  onTypeChange,
  approvedValue,
  onApprovedChange,
}: AdminUserProfilesTableToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
      <Input
        inputSize="compact"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search profiles…"
        className="w-44 min-w-[10rem]"
      />
      <Select
        value={typeValue}
        options={TYPE_OPTIONS}
        onValueChange={onTypeChange}
        className="w-40 min-w-[10rem]"
      />
      <Select
        value={approvedValue}
        options={APPROVED_OPTIONS}
        onValueChange={onApprovedChange}
        className="w-44 min-w-[11rem]"
      />
    </div>
  );
}
