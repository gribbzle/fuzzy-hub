import Image from "next/image";

import { twMerge } from "@utils";

export interface TopPickCardProps {
  title: string;
  description: string;
  price?: string;
  imageUrl: string;
  className?: string;
}

export const TopPickCard = ({
  title,
  description,
  price,
  imageUrl,
  className,
}: TopPickCardProps) => (
  <div
    className={twMerge("flex items-center gap-3", className)}
    role="group"
    aria-label="Top Pick Card"
  >
    <div className="relative h-30 w-24.5 overflow-hidden rounded-xl">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        priority
      />
    </div>
    <div className="flex flex-1 flex-col justify-center gap-1">
      <span className="text-16 text-text-default leading-snug font-semibold">
        {title}
      </span>
      <span className="text-14 leading-snug font-medium text-[#737376]">
        {description}
      </span>
      {price && (
        <span className="text-16 text-text-default font-extrabold">
          {price}
        </span>
      )}
    </div>
  </div>
);
