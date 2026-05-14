import { z } from "zod";

const orderField = z.number().int().min(1, "Order must be greater than 0.");

export const categoryCharacteristicCreateFormSchema = z.object({
  characteristic_id: z.string().trim().min(1, "Characteristic is required."),
  order: orderField,
  is_required: z.boolean(),
});

export const categoryCharacteristicEditFormSchema = z.object({
  characteristic_id: z.string(),
  order: orderField,
  is_required: z.boolean(),
});
