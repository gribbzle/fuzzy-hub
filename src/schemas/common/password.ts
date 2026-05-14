import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(1, { message: "This field is required" })
  .min(8, { message: "Be at least 8 characters long" })
  .max(25, { message: "Password must be at most 25 characters" })
  .refine((val) => /[a-z]/.test(val) && /[A-Z]/.test(val), {
    message:
      "Include both lowercase (a–z) and uppercase (A–Z) letters",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Password must contain at least one special character",
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one number",
  });
