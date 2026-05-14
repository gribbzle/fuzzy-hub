import { actionClient } from "@lib/api/api-client";

import {
  DictionaryItemListResource,
  DictionaryItemListResponse,
} from "@portal/market/models";

export const getServiceCategoriesAction =
  async (): Promise<DictionaryItemListResponse> =>
    actionClient<DictionaryItemListResource>(
      "/portal/dictionaries/service-categories",
      {
        method: "GET",
      },
    );
