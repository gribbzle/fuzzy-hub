import { fullNameSchema, phoneSchema } from "@schemas";
import * as z from "zod";

export const registrationBreederPersonalInformationSchema = z.object({
  subtype: z.enum(["breeder", "shelter"]),
  full_name: fullNameSchema,
  phone_number: phoneSchema.optional(),
  about_me: z
    .string()
    .min(1, "This field is required")
    .max(500, "This field must be 500 characters or less"),
});

export type RegistrationBreederPersonalInformationFormValues = z.infer<
  typeof registrationBreederPersonalInformationSchema
>;
