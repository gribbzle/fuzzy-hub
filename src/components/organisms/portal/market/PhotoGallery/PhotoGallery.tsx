"use client";

import { useCallback, useState } from "react";

import Image from "next/image";

import { twMerge } from "@utils";

export interface PhotoGalleryProps {
  /**
   * List of image URLs (or static imports).
   */
  images: string[];
  /**
   * `alt` text for `<img/>` elements.
   * Default: "photo".
   */
  alt?: string;
  /**
   * Additional gallery container classes.
   */
  className?: string;
}

/**
 * Simple image viewer.
 *
 * - Preview buttons on the left (vertical list).
 * - Large image on the right (changes when you select a preview).
 */
export const PhotoGallery = ({
  images,
  alt = "photo",
  className,
}: PhotoGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  if (!images.length) {
    return null;
  }

  return (
    <div className={twMerge("flex flex-row gap-4", className)}>
      <div className="flex flex-col gap-2">
        {images.map((image, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelect(idx)}
            aria-label={`${alt} ${idx + 1} ${idx === activeIndex ? "(selected)" : ""}`}
            aria-pressed={idx === activeIndex}
            className={twMerge(
              "relative h-33 w-24.5 cursor-pointer overflow-hidden rounded-2xl border-2 border-transparent",
              idx === activeIndex && "border-aqua-green",
            )}
          >
            <Image
              src={image}
              alt={`${alt} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <div className="relative h-174.5 w-135 overflow-hidden rounded-3xl">
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
