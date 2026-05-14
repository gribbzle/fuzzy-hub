"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { Switch } from "../../_components/ui/switch";
import type { AdminUserProfileFormValues } from "../_utils/userProfileFormSubmit";

interface AdminUserProfileEditFormFieldsProps {
  control: Control<AdminUserProfileFormValues>;
  errors: FieldErrors<AdminUserProfileFormValues>;
}

export function AdminUserProfileEditFormFields({
  control,
  errors,
}: AdminUserProfileEditFormFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        id="profile-approved"
        label="Approved"
        errorMessage={errors.approved?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="approved"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2 pt-0.5">
              <Switch
                id="profile-approved"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <span className="text-sm text-zinc-600">
                {field.value ? "Approved" : "Not approved"}
              </span>
            </div>
          )}
        />
      </FormField>

      <FormField
        id="profile-full-name"
        label="Full name"
        errorMessage={errors.full_name?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="full_name"
          control={control}
          render={({ field }) => (
            <Input
              id="profile-full-name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              {...field}
            />
          )}
        />
      </FormField>

      <FormField
        id="profile-phone"
        label="Phone number"
        errorMessage={errors.phone_number?.message}
        labelClassName="text-zinc-900"
      >
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <Input
              id="profile-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 …"
              {...field}
            />
          )}
        />
      </FormField>
    </div>
  );
}
