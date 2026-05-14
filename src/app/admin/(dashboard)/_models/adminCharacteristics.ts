import { FetcherResponse } from "@admin/models";

import { AdminDictionary } from "./adminDictionaries";

export const ADMIN_CHARACTERISTIC_TYPES = [
  "text",
  "textarea",
  "number",
  "boolean",
  "select",
  "multi_select",
  "range",
  "date",
] as const;

export type AdminCharacteristicType =
  (typeof ADMIN_CHARACTERISTIC_TYPES)[number];

export const ADMIN_CHARACTERISTIC_GROUPS = [
  "basic_information",
  "health_veterinary_care",
  "physical_characteristics",
  "behavior_temperament",
  "breeding_genetics",
  "care_maintenance",
  "training_skills",
  "history_background",
] as const;

export type AdminCharacteristicGroup =
  (typeof ADMIN_CHARACTERISTIC_GROUPS)[number];

export const ADMIN_CHARACTERISTIC_TYPE_LABELS: Record<
  AdminCharacteristicType,
  string
> = {
  text: "Text",
  textarea: "Textarea",
  number: "Number",
  boolean: "Boolean",
  select: "Select",
  multi_select: "Multi select",
  range: "Range",
  date: "Date",
};

export const ADMIN_CHARACTERISTIC_GROUP_LABELS: Record<
  AdminCharacteristicGroup,
  string
> = {
  basic_information: "Basic information",
  health_veterinary_care: "Health & veterinary care",
  physical_characteristics: "Physical characteristics",
  behavior_temperament: "Behavior & temperament",
  breeding_genetics: "Breeding & genetics",
  care_maintenance: "Care & maintenance",
  training_skills: "Training & skills",
  history_background: "History & background",
};

export function formatAdminCharacteristicTypeLabel(value: string): string {
  const known =
    ADMIN_CHARACTERISTIC_TYPE_LABELS[value as AdminCharacteristicType];
  if (known !== undefined) {
    return known;
  }
  return value.replace(/_/g, " ");
}

export function formatAdminCharacteristicGroupLabel(value: string): string {
  const known =
    ADMIN_CHARACTERISTIC_GROUP_LABELS[value as AdminCharacteristicGroup];
  if (known !== undefined) {
    return known;
  }
  return value.replace(/_/g, " ");
}

export interface AdminCharacteristic {
  public_id: string;
  name: string;
  slug: string;
  type: AdminCharacteristicType | string;
  group: AdminCharacteristicGroup | string;
  description: string | null;
  dictionary: AdminDictionary | null;
  unit: string | null;
  min: number | null;
  max: number | null;
  max_length: number | null;
  has_dictionary: boolean;
  has_unit: boolean;
  has_min_max: boolean;
  has_max_length: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminCharacteristicsListData {
  items: AdminCharacteristic[];
  total: number;
}

export type AdminCharacteristicsListResponse =
  FetcherResponse<AdminCharacteristicsListData>;

export type AdminCharacteristicResponse = FetcherResponse<AdminCharacteristic>;
