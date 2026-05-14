import { twMerge } from "tailwind-merge";

import { RatingStars } from "@portal/ui/atoms";

export interface SellerReview {
  /** Title of the reviewed article / product */
  title: string;
  /** Date string (will be displayed as‑is) */
  date: string;
  /** Rating from 0 to 5 (integer). Fractional values are rounded down. */
  rating: number;
  /** Review the comment body */
  comment: string;
  /** Optional reply to the review */
  reply?: string;
}

export interface SellerReviewProps extends SellerReview {
  /** Optional extra Tailwind classes for the root container */
  className?: string;
}

export const SellerReviewItem = ({
  title,
  date,
  rating,
  comment,
  reply,
  className,
}: SellerReviewProps) => (
  <article
    className={twMerge(
      "border-border-light flex w-full flex-col gap-4 rounded-4xl border p-8",
      className,
    )}
  >
    <div className="flex items-center justify-between">
      <p className="text-24 text-text-default font-bold">{title}</p>
      <time
        dateTime={date}
        className="text-18 text-text-default/70 font-semibold"
      >
        {date}
      </time>
    </div>
    <RatingStars rating={rating} />
    <p className="text-18 text-text-default font-medium">{comment}</p>
    {reply && (
      <div className="border-border-gray bg-bg-light rounded-2xl border px-6 py-4">
        <p className="text-18 font-semibold text-[#737380]">{reply}</p>
      </div>
    )}
  </article>
);
