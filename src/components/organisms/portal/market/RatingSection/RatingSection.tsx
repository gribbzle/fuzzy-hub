"use client";

import { useCallback, useState } from "react";

import { twMerge } from "@utils";

import { Container, Typography } from "@portal/ui/atoms";
import { StarFill } from "@portal/ui/icons";

import {
  Paginator,
  ReviewCard,
  ReviewCardProps,
} from "@portal/market/ui/molecules";

export interface RatingSectionProps {
  title: string;
  rating?: number;
  reviewsCountLabel?: string;
  items: ReviewCardProps[];
  className?: string;
  variant?: "default" | "secondary";
}

const STARS_TOTAL = 5;
const CARDS_VISIBLE = 2;

export const RatingSection = ({
  title,
  rating,
  reviewsCountLabel,
  items,
  className,
  variant,
}: RatingSectionProps) => {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - CARDS_VISIBLE);

  const handlePrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const visibleItems = items.slice(index, index + CARDS_VISIBLE);

  return (
    <section aria-label={title} className={twMerge("bg-[#5ABAB9]", className)}>
      <Container className="gap-11 py-20">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-4">
            <Typography variant="h2" className="text-white">
              {title}
            </Typography>
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="text-32 font-bold text-white"
                aria-label={`Rating: ${rating} out of ${STARS_TOTAL}`}
              >
                {rating?.toFixed(1)}
              </span>
              <div
                className="flex items-center gap-1"
                role="img"
                aria-label={`${rating} out of ${STARS_TOTAL} stars`}
              >
                {Array.from({ length: STARS_TOTAL }, (_, i) => (
                  <StarFill
                    key={i}
                    className="h-8 w-8 shrink-0 text-[#F6D96F]"
                    aria-hidden
                  />
                ))}
              </div>
              <span className="text-18 font-semibold text-white/90">
                {reviewsCountLabel}
              </span>
            </div>
          </div>
          <Paginator onNextBtnClick={handleNext} onPrevBtnClick={handlePrev} />
        </div>
        <div className="flex gap-8 overflow-hidden">
          {visibleItems.map((item) => (
            <ReviewCard
              key={item.id}
              {...item}
              className="min-w-0 flex-1 basis-0"
              variant={variant}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
