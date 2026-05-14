import { FetcherResponse } from "@admin/models";

export interface AdminWidgetItem {
  public_id: string;
  type: string;
  data: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminWidgetsListData {
  items: AdminWidgetItem[];
  total: number;
}

export type AdminWidgetsListResponse = FetcherResponse<AdminWidgetsListData>;
