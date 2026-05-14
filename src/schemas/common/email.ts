import * as z from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .regex(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/, {
    message: "Input valid email address",
  });
