import { FetcherResponse } from "@admin/models";

export interface AdminDictionaryItem {
  public_id: string;
  value: string;
  label: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface AdminDictionary {
  id?: number | string;
  public_id: string;
  name: string;
  slug: string;
  description: string | null;
  items: AdminDictionaryItem[];
  created_at: string;
  updated_at: string;
}

export interface AdminDictionariesListData {
  items: AdminDictionary[];
  total: number;
}

export type AdminDictionariesListResponse =
  FetcherResponse<AdminDictionariesListData>;

export interface AdminDictionaryItemsListData {
  items: AdminDictionaryItem[];
  total: number;
}

export type AdminDictionaryItemsListResponse =
  FetcherResponse<AdminDictionaryItemsListData>;
