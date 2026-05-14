import { FetcherResponse } from "@admin/models";

import {
  AdminCharacteristicGroup,
  AdminCharacteristicType,
} from "./adminCharacteristics";

export interface AdminCategoryCatalog {
  id: number;
  name: string;
  slug: string;
}

/** Image metadata when the category has an `image_id`. */
export interface AdminCategoryImage {
  name: string;
}

export interface AdminCategory {
  public_id: string;
  catalog_id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  catalog: AdminCategoryCatalog | null;
  image_id: string | null;
  image: AdminCategoryImage | null;
}

export interface AdminCategoryCharacteristicInfo {
  public_id: string;
  name: string;
  type: AdminCharacteristicType | string;
  group: AdminCharacteristicGroup | string;
}

export interface AdminCategoryCharacteristicItem {
  order: number;
  is_required: boolean;
  characteristic: AdminCategoryCharacteristicInfo;
}

export interface AdminCategoryCharacteristicsListData {
  items: AdminCategoryCharacteristicItem[];
  total: number;
}

export interface AdminCategoriesListData {
  items: AdminCategory[];
  total: number;
}

export type AdminCategoriesListResponse =
  FetcherResponse<AdminCategoriesListData>;

export type AdminCategoryResponse = FetcherResponse<AdminCategory>;
export type AdminCategoryCharacteristicsListResponse =
  FetcherResponse<AdminCategoryCharacteristicsListData>;
