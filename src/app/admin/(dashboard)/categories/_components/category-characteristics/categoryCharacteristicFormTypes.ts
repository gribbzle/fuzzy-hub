export interface CategoryCharacteristicFormValues {
  characteristic_id: string;
  order: number;
  is_required: boolean;
}

export interface CategoryCharacteristicFormErrors {
  characteristic_id?: string;
  order?: string;
}
