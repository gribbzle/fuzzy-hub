"use client";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { useWidgetFormContext } from "../_hooks/useWidgetFormContext";

export const ContactUsContentFields = () => {
  const {
    register,
    formState: { errors },
  } = useWidgetFormContext();
  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 p-3">
      <p className="text-sm font-medium text-zinc-900">Contact us content</p>
      <FormField
        id="contact-us-title"
        label="Title"
        errorMessage={errors.contact_us?.title?.message}
      >
        <Input
          id="contact-us-title"
          type="text"
          {...register("contact_us.title", {
            required: "Title is required",
          })}
        />
      </FormField>
      <FormField
        id="contact-us-email"
        label="Email"
        errorMessage={errors.contact_us?.email?.message}
      >
        <Input
          id="contact-us-email"
          type="text"
          {...register("contact_us.email", {
            required: "Email is required",
          })}
        />
      </FormField>
      <FormField
        id="contact-us-phone"
        label="Phone"
        errorMessage={errors.contact_us?.phone?.message}
      >
        <Input
          id="contact-us-phone"
          type="text"
          {...register("contact_us.phone", {
            required: "Phone is required",
          })}
        />
      </FormField>
      <FormField
        id="contact-us-address"
        label="Address"
        errorMessage={errors.contact_us?.address?.message}
      >
        <Input
          id="contact-us-address"
          type="text"
          {...register("contact_us.address", {
            required: "Address is required",
          })}
        />
      </FormField>
    </div>
  );
};
