import { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

import { StarFill } from "@portal/ui/icons";

interface RatingStarsProps {
  /** Rating value from 0 to 5 (required) */
  rating: number;
  /** Size of the stars in pixels (optional) */
  size?: number;
  /** Optional extra class names for the container */
  className?: string;
  slotProps?: {
    star: {
      className?: string;
    };
  };
}

/**
 * Renders five stars, filling `rating` of them.
 * Non‑filled stars are displayed as inactive.
 */
export const RatingStars = ({
  rating,
  className,
  slotProps,
}: RatingStarsProps) => {
  const stars: ReactNode[] = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarFill
        key={i}
        className={twMerge(
          "w-8 h-8",
          slotProps?.star.className,
          i <= rating ? "text-[#F6D96F]" : "text-border-gray",
        )}
      />,
    );
  }

  return <div className={twMerge("flex items-center", className)}>{stars}</div>;
};
