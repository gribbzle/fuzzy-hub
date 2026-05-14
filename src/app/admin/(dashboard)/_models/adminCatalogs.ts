import { FetcherResponse } from "@admin/models";

export interface AdminCatalog {
  public_id: string;
  name: string;
  label: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminCatalogsListData {
  items: AdminCatalog[];
  total: number;
}

export type AdminCatalogsListResponse = FetcherResponse<AdminCatalogsListData>;
