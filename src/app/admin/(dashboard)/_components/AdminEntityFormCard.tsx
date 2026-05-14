"use client";

import type { FormEventHandler, ReactNode } from "react";

import NextLink from "next/link";

import { cn } from "@utils";

import { FormErrorAlert } from "./FormErrorAlert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface AdminEntityFormCardProps {
  title: string;
  description: string;
  submitError: string | null;
  submitIdleLabel: string;
  submitPendingLabel: string;
  isSubmitting: boolean;
  /** When true, the primary submit control stays disabled (e.g. edit form still loading). */
  submitDisabled?: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  backHref: string;
  backLabel: string;
  /** When true, the card spans the full main width (no max-width cap). */
  fullWidth?: boolean;
  children: ReactNode;
}

export function AdminEntityFormCard({
  title,
  description,
  submitError,
  submitIdleLabel,
  submitPendingLabel,
  isSubmitting,
  submitDisabled = false,
  onSubmit,
  backHref,
  backLabel,
  fullWidth = false,
  children,
}: AdminEntityFormCardProps) {
  return (
    <div className="p-4 sm:p-6">
      <div
        className={cn("mx-auto w-full", fullWidth ? "max-w-none" : "max-w-3xl")}
      >
        <form onSubmit={onSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {submitError ? (
                <FormErrorAlert className="whitespace-pre-line">
                  {submitError}
                </FormErrorAlert>
              ) : null}
              {children}
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <NextLink href={backHref}>
                <Button type="button" variant="outline">
                  {backLabel}
                </Button>
              </NextLink>
              <Button type="submit" disabled={isSubmitting || submitDisabled}>
                {isSubmitting ? submitPendingLabel : submitIdleLabel}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
