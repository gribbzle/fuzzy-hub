import { emailSchema } from "@schemas";
import * as z from "zod";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().nonempty("Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
