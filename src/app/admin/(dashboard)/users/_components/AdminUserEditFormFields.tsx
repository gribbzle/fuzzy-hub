"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import type { AdminUserFormValues } from "../_utils/userFormSubmit";

interface AdminUserEditFormFieldsProps {
  control: Control<AdminUserFormValues>;
  errors: FieldErrors<AdminUserFormValues>;
}

export function AdminUserEditFormFields({
  control,
  errors,
}: AdminUserEditFormFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        id="admin-user-email"
        label="Email"
        errorMessage={errors.email?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input
              id="admin-user-email"
              type="email"
              autoComplete="email"
              placeholder="user@example.com"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="admin-user-password"
        label="New password"
        errorMessage={errors.password?.message}
        labelClassName="text-zinc-900"
        helperText="Leave blank to keep the current password."
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              id="admin-user-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              {...field}
            />
          )}
        />
      </FormField>
    </div>
  );
}
