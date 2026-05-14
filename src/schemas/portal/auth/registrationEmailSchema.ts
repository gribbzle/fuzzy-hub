import { emailSchema } from "@schemas";
import * as z from "zod";

export const registrationEmailSchema = z.object({
  email: emailSchema,
  privacy_policy: z.boolean().refine((val) => val, {
    message: "You must agree to the Privacy Policy",
  }),
});

export type RegistrationEmailFormValues = z.infer<
  typeof registrationEmailSchema
>;
