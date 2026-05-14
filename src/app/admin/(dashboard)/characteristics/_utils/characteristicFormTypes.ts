/** Types allowed when creating a characteristic (API excludes `range`). */
export const CHARACTERISTIC_CREATE_TYPES = [
  "text",
  "textarea",
  "number",
  "boolean",
  "select",
  "multi_select",
  "date",
] as const;

export type CharacteristicCreateType =
  (typeof CHARACTERISTIC_CREATE_TYPES)[number];

export const CHARACTERISTIC_CREATE_GROUPS = [
  "basic_information",
  "health_veterinary_care",
  "physical_characteristics",
  "behavior_temperament",
  "breeding_genetics",
  "care_maintenance",
  "training_skills",
  "history_background",
] as const;

export type CharacteristicCreateGroup =
  (typeof CHARACTERISTIC_CREATE_GROUPS)[number];

export interface CharacteristicFormValues {
  name: string;
  slug: string;
  type: CharacteristicCreateType;
  group: CharacteristicCreateGroup;
  description: string;
  dictionary_id: string;
  unit: string;
  min: string;
  max: string;
  max_length: string;
}
