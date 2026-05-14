"use server";

import { actionClient } from "@lib/api/api-client";
import { ApiResponse } from "@lib/api/types";

import {
  FooterResource,
  WidgetListResource,
  WidgetsParams,
} from "@portal/market/models";

const getWidgets = async <T = WidgetListResource>(
  params: WidgetsParams,
): Promise<ApiResponse<T>> => {
  const searchParams = new URLSearchParams();

  (Object.entries(params) as [string, string][]).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });

  const query = searchParams.toString();
  const url = `/portal/widgets?${query}`;

  return actionClient<T>(url, {
    method: "GET",
  });
};

export const getMainPageWidgetsAction = async (): Promise<
  ApiResponse<WidgetListResource>
> => getWidgets({ group: "main_page" });

export const getFooterWidgetAction = async (): Promise<
  FooterResource | undefined
> => {
  const response = await getWidgets<WidgetListResource<FooterResource>>({
    type: "footer",
  });

  return response.data?.items[0];
};
