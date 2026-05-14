import * as z from "zod";

export const registrationServiceVerificationSchema = z
  .object({
    business_type: z.enum(["company", "self_employed"]),
    company_name: z
      .string()
      .max(255, "This field must be 255 characters or less")
      .optional(),
    company_address: z
      .string()
      .max(500, "This field must be 500 characters or less")
      .optional(),
    tax_id: z
      .string()
      .max(100, "This field must be 100 characters or less")
      .optional(),
    business_license_number: z
      .string()
      .max(100, "This field must be 100 characters or less")
      .optional(),
    license_image: z.any().optional(),
    liability_insurance: z.any().optional(),
    full_legal_name: z
      .string()
      .max(255, "This field must be 255 characters or less")
      .optional(),
    residential_address: z
      .string()
      .max(500, "This field must be 500 characters or less")
      .optional(),
    government_id_number: z
      .string()
      .max(100, "This field must be 100 characters or less")
      .optional(),
    id_image: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.business_type === "company") {
      if (!data.company_name) {
        ctx.addIssue({
          code: "custom",
          message: "Company Name is required",
          path: ["company_name"],
        });
      }

      if (!data.company_address) {
        ctx.addIssue({
          code: "custom",
          message: "Company Address is required",
          path: ["company_address"],
        });
      }

      if (!data.tax_id) {
        ctx.addIssue({
          code: "custom",
          message: "Tax ID is required",
          path: ["tax_id"],
        });
      }

      if (!data.business_license_number) {
        ctx.addIssue({
          code: "custom",
          message: "Business License Number is required",
          path: ["business_license_number"],
        });
      }

      if (!(data.license_image instanceof File)) {
        ctx.addIssue({
          code: "custom",
          message: "License Image is required",
          path: ["license_image"],
        });
      }

      if (!data.liability_insurance) {
        ctx.addIssue({
          code: "custom",
          message: "Liability Insurance is required",
          path: ["liability_insurance"],
        });
      }
    }

    if (data.business_type === "self_employed") {
      if (!data.full_legal_name) {
        ctx.addIssue({
          code: "custom",
          message: "Full Legal Name is required",
          path: ["full_legal_name"],
        });
      }

      if (!data.government_id_number) {
        ctx.addIssue({
          code: "custom",
          message: "Government-issued ID Number is required",
          path: ["government_id_number"],
        });
      }

      if (!(data.id_image instanceof File)) {
        ctx.addIssue({
          code: "custom",
          message: "ID Image is required",
          path: ["id_image"],
        });
      }
    }
  });

export type RegistrationServiceVerificationFormValues = z.infer<
  typeof registrationServiceVerificationSchema
>;
