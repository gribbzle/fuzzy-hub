import { emailSchema } from "@schemas";
import * as z from "zod";

export const verifyCodeSchema = z.object({
  email: emailSchema,
  code: z
    .string()
    .length(6, "The verification code field must be 6 characters.")
    .nonempty("This field is required"),
});

export type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;
