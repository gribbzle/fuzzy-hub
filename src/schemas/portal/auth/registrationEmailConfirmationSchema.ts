import * as z from "zod";

export const registrationEmailConfirmationSchema = z.object({
  verification_code: z
    .string()
    .length(6, "The verification code field must be 6 characters.")
    .nonempty("This field is required"),
});

export type RegistrationEmailConfirmationFormValues = z.infer<
  typeof registrationEmailConfirmationSchema
>;
