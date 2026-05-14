"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  ADMIN_TABLE_LIMIT_OPTIONS,
  DEFAULT_ADMIN_TABLE_LIMIT,
} from "../_components/adminTableUtils";

type AdminTableLimit = (typeof ADMIN_TABLE_LIMIT_OPTIONS)[number];

function parsePageFromSearchParams(searchParams: URLSearchParams): number {
  const raw = parseInt(searchParams.get("page") || "1", 10);
  return Number.isFinite(raw) && raw >= 1 ? raw : 1;
}

function parseLimitFromSearchParams(
  searchParams: URLSearchParams,
): AdminTableLimit {
  const raw = parseInt(
    searchParams.get("limit") || String(DEFAULT_ADMIN_TABLE_LIMIT),
    10,
  );
  if (
    Number.isFinite(raw) &&
    ADMIN_TABLE_LIMIT_OPTIONS.includes(raw as AdminTableLimit)
  ) {
    return raw as AdminTableLimit;
  }
  return DEFAULT_ADMIN_TABLE_LIMIT;
}

function readStringFilters<K extends string>(
  keys: readonly K[],
  searchParams: URLSearchParams,
): Record<K, string> {
  const out = {} as Record<K, string>;
  for (const key of keys) {
    out[key] = searchParams.get(key) ?? "";
  }
  return out;
}

/**
 * URL-synced page, limit, and arbitrary string query params (trimmed; empty omitted).
 */
export function useAdminSearchParamsPagination<
  const K extends readonly string[],
>(filterKeys: K) {
  type FilterKey = K[number];
  type Filters = Record<FilterKey, string>;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Latest URL params so deferred `setQuery` (e.g. debounced search) merges with current filters. */
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const page = useMemo(
    () => parsePageFromSearchParams(searchParams),
    [searchParams],
  );

  const limit = useMemo(
    () => parseLimitFromSearchParams(searchParams),
    [searchParams],
  );

  const filters = useMemo(
    () => readStringFilters(filterKeys, searchParams),
    [filterKeys, searchParams],
  );

  const setQuery = useCallback(
    (nextPage: number, nextLimit: number, nextFilters?: Partial<Filters>) => {
      const currentFilters = readStringFilters(
        filterKeys,
        searchParamsRef.current,
      );
      const merged = { ...currentFilters, ...nextFilters } as Filters;
      const params = new URLSearchParams();
      params.set("page", String(Math.max(1, nextPage)));
      params.set("limit", String(nextLimit));

      for (const key of filterKeys as readonly FilterKey[]) {
        const trimmed = merged[key].trim();
        if (trimmed !== "") {
          params.set(key, trimmed);
        }
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [filterKeys, pathname, router],
  );

  const onLimitChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const nextLimit = parseInt(e.target.value, 10);
      if (
        Number.isFinite(nextLimit) &&
        ADMIN_TABLE_LIMIT_OPTIONS.includes(nextLimit as AdminTableLimit)
      ) {
        setQuery(1, nextLimit as AdminTableLimit);
      }
    },
    [setQuery],
  );

  return { page, limit, filters, setQuery, onLimitChange };
}

const ADMIN_TABLE_PAGE_LIMIT_ONLY_FILTERS = [] as const;

/** URL-synced `page` and `limit` only (no extra filter query params). */
export function useAdminTablePageLimitUrlPagination() {
  return useAdminSearchParamsPagination(ADMIN_TABLE_PAGE_LIMIT_ONLY_FILTERS);
}
