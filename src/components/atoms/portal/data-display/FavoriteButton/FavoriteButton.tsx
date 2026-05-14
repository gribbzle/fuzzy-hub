"use client";

import { MouseEvent } from "react";

import { twMerge } from "@utils";

import { Heart as HeartIcon } from "@portal/ui/icons";

/**
 * Props for {@link FavoriteButton}.
 */
interface FavoriteButtonProps {
  /**
   * Initial state (selected/not selected).
   * Default: false.
   */
  selected?: boolean;
  /**
   * Callback on click.
   */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Additional custom classes.
   */
  className?: string;
  /**
   * Add a little shadow.
   * Default: false.
   */
  shadow?: boolean;
}

/**
 * The state is controlled externally via `selected`.
 */
export const FavoriteButton = ({
  selected = false,
  onClick,
  className,
  shadow = false,
}: FavoriteButtonProps) => (
  <button
    className={twMerge(
      "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/80",
      selected && "bg-red",
      shadow && "shadow-button",
      className,
    )}
    onClick={onClick}
    type="button"
    aria-label="Add to favorites"
    aria-pressed={selected}
  >
    <HeartIcon
      width={24}
      height={24}
      className={twMerge(
        "text-text-default",
        selected && "fill-white text-white",
      )}
    />
  </button>
);
