import { ApiResponse } from "@lib/api/types";

export interface DictionaryItemResource {
  public_id: string;
  value: string;
  label: string;
  order: number;
}

export type DictionaryItemListResponse =
  ApiResponse<DictionaryItemListResource>;

export interface DictionaryItemListResource {
  items: DictionaryItemResource[];
  total: number;
}
