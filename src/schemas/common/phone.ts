import * as z from "zod";

export const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{6,14}$/, {
    message: "Invalid phone number",
  })
  .or(z.literal(""));
