import { emailSchema } from "@schemas";
import * as z from "zod";

export const passwordRecoveryByEmailSchema = z.object({
  email: emailSchema,
});

export type PasswordRecoveryFormValues = z.infer<
  typeof passwordRecoveryByEmailSchema
>;
