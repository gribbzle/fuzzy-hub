import { fetcher } from "@utils";
import useSWR from "swr";

import { DictionaryItemListResource } from "@portal/market/models";

export function useServiceCategoriesQuery() {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR("/portal/dictionaries/service-categories", (url: string) =>
    fetcher<DictionaryItemListResource>(url),
  );

  return {
    data: response,
    isLoading,
    isError: !!error,
  };
}
