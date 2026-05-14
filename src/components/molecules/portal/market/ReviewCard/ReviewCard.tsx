import Image from "next/image";

import { twMerge } from "@utils";

import { Avatar, RatingStars } from "@portal/ui/atoms";

export interface ReviewCardProps {
  id: string | number;
  name: string;
  date: string;
  rating: number;
  review: string;
  avatarSrc: string;
  images?: Array<{ src: string; alt?: string }>;
  variant?: "default" | "secondary";
  className?: string;
}

export const ReviewCard = ({
  name,
  date,
  rating,
  review,
  avatarSrc,
  images,
  className,
  variant = "default",
}: ReviewCardProps) => {
  const isSecondaryVariant = variant === "secondary";

  return (
    <div
      className={twMerge(
        "rounded-4xl bg-white",
        isSecondaryVariant && "bg-bg-light",
        className,
      )}
    >
      <div className="grid grid-cols-[auto_1fr] desktop:gap-y-2.5 max-desktop:gap-y-3 large-desktop:gap-x-8 desktop:gap-x-5 max-desktop:gap-x-4 large-desktop:p-8 desktop:p-5 max-desktop:p-4">
        <div className="shrink-0 desktop:row-span-2">
          <Avatar
            src={avatarSrc}
            alt={name}
            width={100}
            height={100}
            className="large-desktop:w-25 large-desktop:h-25 max-large-desktop:w-20 max-large-desktop:h-20"
          />
        </div>
        <div className="flex gap-2 max-desktop:flex-col">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="text-text-default truncate font-bold large-desktop:text-24 max-large-desktop:text-20">
              {name}
            </p>
            <p className="large-desktop:text-18 max-large-desktop:text-16 large-desktop:leading-6 max-large-desktop:leading-5.5 text-text-default/70 font-semibold">
              {date}
            </p>
          </div>
          <RatingStars
            rating={rating}
            slotProps={{
              star: {
                className:
                  "large-desktop:w-8 large-desktop:h-8 max-large-desktop:w-6 max-large-desktop:h-6",
              },
            }}
          />
        </div>
        <div className="flex gap-6 max-desktop:col-start-1 max-desktop:col-span-2">
          <p className="text-text-default large-desktop:text-18 large-desktop:leading-6.25 large-desktop:font-semibold desktop:text-16 desktop:leading-5.5 desktop:font-medium">
            {review}
          </p>
          {images && images.length > 0 && (
            <div className="flex shrink-0 gap-2 max-large-desktop:hidden">
              {images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img.src}
                  alt={img.alt ?? `Review image ${idx + 1}`}
                  className={twMerge(
                    "pointer-events-none box-border h-25 w-19 rounded-xl border-3 border-white object-cover",
                    idx !== 0 && "-ml-9.5",
                  )}
                  width={76}
                  height={100}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
