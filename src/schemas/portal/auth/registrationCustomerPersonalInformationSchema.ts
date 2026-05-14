import { fullNameSchema, phoneSchema } from "@schemas";
import * as z from "zod";

export const registrationCustomerPersonalInformationSchema = z.object({
  full_name: fullNameSchema,
  phone_number: phoneSchema.nullable().optional(),
});

export type RegistrationCustomerPersonalInformationFormValues = z.infer<
  typeof registrationCustomerPersonalInformationSchema
>;
