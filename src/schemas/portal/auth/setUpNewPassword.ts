import { passwordSchema } from "@schemas";
import * as z from "zod";

export const setUpNewPassword = z
  .object({
    password: passwordSchema,
    password_confirmation: z.string().min(1, "Please repeat your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type SetUpNewPasswordFormValues = z.infer<typeof setUpNewPassword>;
