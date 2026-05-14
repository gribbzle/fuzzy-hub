import * as z from "zod";

export const fullNameSchema = z
  .string()
  .min(1, { message: "This field is required" })
  .min(2, { message: "Wrong format" })
  .max(50, { message: "Wrong format" })
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, { message: "Wrong format" })
  .refine((value) => (value.match(/-/g) || []).length <= 2, {
    message: "Wrong format",
  })
  .refine((value) => !value.includes("--"), { message: "Wrong format" });
