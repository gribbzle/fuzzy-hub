"use client";

import type { ReactNode } from "react";

import { FormErrorAlert } from "./FormErrorAlert";
import { Button } from "./ui/button";

interface AdminEntityFormQueryStateProps {
  loadError: unknown;
  loadErrorFallback: string;
  isLoading: boolean;
  loadingMessage: string;
  canRender: boolean;
  onRetry?: () => void;
  showNonBlockingError?: boolean;
  showLoadingWhileRenderable?: boolean;
  children: ReactNode;
}

export function AdminEntityFormQueryState({
  loadError,
  loadErrorFallback,
  isLoading,
  loadingMessage,
  canRender,
  onRetry,
  showNonBlockingError = false,
  showLoadingWhileRenderable = false,
  children,
}: AdminEntityFormQueryStateProps) {
  const showBlockingError = Boolean(loadError) && !canRender && !isLoading;
  const showInlineError =
    Boolean(loadError) && (showNonBlockingError || showBlockingError);
  const showLoading = isLoading && (!canRender || showLoadingWhileRenderable);

  return (
    <>
      {showInlineError ? (
        <FormErrorAlert className={showBlockingError ? undefined : "mb-4"}>
          {loadError instanceof Error ? loadError.message : loadErrorFallback}
        </FormErrorAlert>
      ) : null}

      {showBlockingError && onRetry ? (
        <div className="mt-3">
          <Button type="button" variant="outline" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : null}

      {showLoading ? (
        <p className="text-sm text-zinc-500">{loadingMessage}</p>
      ) : null}

      {canRender ? children : null}
    </>
  );
}
