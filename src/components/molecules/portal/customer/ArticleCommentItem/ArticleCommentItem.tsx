"use client";

import { twMerge } from "tailwind-merge";

import { RatingStars } from "@portal/ui/atoms";

interface Comment {
  /** Avatar URL (default to default avatar) */
  avatarUrl?: string;
  /** Author's name */
  authorName: string;
  /** Comment creation date (ISO string or Date) */
  createdAt: string | Date;
  /** Review the comment body */
  comment: string;
}

export interface ArticleComment {
  /** Title of the reviewed article / product */
  title: string;
  /** Date string (will be displayed as‑is) */
  date: string;
  /** Rating from 0 to 5 (integer). Fractional values are rounded down. */
  rating: number;
  /** Review the comment body (optional) */
  comment?: string;
  /** Replies to the comment (optional) */
  replies?: Comment[];
}

export interface ArticleCommentItemProps extends ArticleComment {
  /** Optional extra Tailwind classes for the root container */
  className?: string;
}

export const ArticleCommentItem = ({
  className,
  rating,
  comment,
  date,
  title,
}: ArticleCommentItemProps) => (
  <article
    className={twMerge(
      "flex w-full flex-col gap-4 rounded-4xl border border-[#E8E6EA] p-8",
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
    {comment && (
      <p className="text-18 text-text-default font-medium">{comment}</p>
    )}
  </article>
);
