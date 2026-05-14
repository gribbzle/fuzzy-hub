import * as z from "zod";

export const registrationProfileTypeSchema = z.object({
  profile_type: z.enum(["customer", "breeder", "service"]),
});

export type StartRegistrationFormValues = z.infer<
  typeof registrationProfileTypeSchema
>;
