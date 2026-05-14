"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  categoryCharacteristicCreateFormSchema,
  categoryCharacteristicEditFormSchema,
} from "../_components/category-characteristics/categoryCharacteristicFormSchemas";
import type { CategoryCharacteristicFormValues } from "../_components/category-characteristics/categoryCharacteristicFormTypes";

const emptyCharacteristicForm: CategoryCharacteristicFormValues = {
  characteristic_id: "",
  order: 1,
  is_required: true,
};

export function useAdminCategoryCharacteristicModalsForms() {
  const createForm = useForm<CategoryCharacteristicFormValues>({
    resolver: zodResolver(categoryCharacteristicCreateFormSchema),
    defaultValues: emptyCharacteristicForm,
  });

  const editForm = useForm<CategoryCharacteristicFormValues>({
    resolver: zodResolver(categoryCharacteristicEditFormSchema),
    defaultValues: emptyCharacteristicForm,
  });

  return { createForm, editForm };
}
