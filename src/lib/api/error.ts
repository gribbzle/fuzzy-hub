import { ApiError } from "@lib/api/types";

export interface ApiErrorPayload {
  type?: string;
  message?: string;
}

export class ApiFetchError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload: ApiErrorPayload = {},
  ) {
    super(message);
    this.name = "ApiFetchError";
  }
}

export const toApiError = (error: unknown): ApiError =>
  error instanceof ApiFetchError
    ? {
        message: error.message || "Unknown error",
        status: error.status,
        type: error.payload.type,
      }
    : { message: error instanceof Error ? error.message : "Unknown error" };
