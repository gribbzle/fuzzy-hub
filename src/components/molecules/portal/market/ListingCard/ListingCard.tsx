"use client";

import React, { useCallback } from "react";

import Link from "next/link";

import { twMerge } from "@utils";

import {
  AttachmentImage,
  FavoriteButton,
  RatingChip,
  Tag,
} from "@portal/ui/atoms";
import { CallFill, ClockFill } from "@portal/ui/icons";

type BaseItem = {
  id: string | number;
  imageSrc: string;
  title: string;
  rating?: number | string;
  tags?: string[];
  isFavorite?: boolean;
};

export type Service = BaseItem & {
  __typename: "Service";
  location: string;
  hours?: string;
  phone?: string;
};

export type Pet = BaseItem & {
  __typename: "Pet";
  price?: string;
  description: string;
};

export type ListingItem = Pet | Service;

export interface ListingCardProps {
  item: ListingItem;
  variant?: "outlined" | "text";
  onFavoriteClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const ListingCard = ({
  className,
  onFavoriteClick,
  variant = "text",
  item,
}: ListingCardProps) => {
  const { id, imageSrc, title, rating, tags = [], isFavorite = false } = item;

  const isService = item.__typename === "Service";
  const isPet = item.__typename === "Pet";
  const href = `${isPet ? "pets" : "services"}/${id}`;

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onFavoriteClick?.(e);
    },
    [onFavoriteClick],
  );

  return (
    <Link prefetch={false} href={href} aria-label={title}>
      <article
        className={twMerge(
          "flex h-full w-77.5 flex-col gap-2 overflow-hidden",
          variant === "outlined" && "rounded-3xl bg-white p-2 pb-4",
          className,
        )}
      >
        <div className="relative">
          <AttachmentImage
            imageId={imageSrc}
            alt={title}
            width={310}
            height={isPet ? 400 : 220}
            className={twMerge(
              "w-full rounded-[20px] object-cover",
              isPet && "h-100",
              isService && "h-55",
            )}
          />
          <FavoriteButton
            selected={isFavorite}
            className="absolute top-2 right-2"
            onClick={handleFavoriteClick}
          />
          {!!rating && (
            <RatingChip
              label={String(rating)}
              className="absolute top-2 left-2"
              slotProps={{ icon: { className: "text-[#F78E30]" } }}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 px-3">
          <div className="flex gap-2">
            <h3 className="text-18 text-text-default flex-1 font-bold">
              {title}
            </h3>
            {isPet && !!item.price && (
              <span className="text-16 text-text-default font-extrabold">
                {item.price}
              </span>
            )}
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <p className="text-16 font-medium text-[#2B2B2E]/65">
            {isPet ? item.description : item.location}
          </p>
          {isService && (
            <div className="flex flex-col gap-1.5">
              {item.hours && (
                <div className="flex items-center gap-2">
                  <ClockFill className="text-aqua-green" />
                  <span className="text-16 text-text-default/65 font-medium">
                    {item.hours}
                  </span>
                </div>
              )}
              {item.phone && (
                <div className="flex items-center gap-2">
                  <CallFill className="text-aqua-green" />
                  <span className="text-16 text-text-default/65 font-medium">
                    {item.phone}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
