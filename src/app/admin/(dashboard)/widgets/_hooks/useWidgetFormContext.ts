"use client";

import { useFormContext } from "react-hook-form";

import type { WidgetFormValues } from "../_utils/widgetFormTypes";

export function useWidgetFormContext() {
  return useFormContext<WidgetFormValues>();
}
