import Image from "next/image";

import { twMerge } from "@utils";

export interface BannerItem {
  id: string;
  imageSrc: string;
  alt: string;
}

interface BannersProps {
  items: BannerItem[];
  className?: string;
}

export const Banners = ({ items, className }: BannersProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <section className={twMerge("flex flex-wrap gap-8", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative h-98 min-w-130 flex-1 overflow-hidden rounded-3xl bg-[#BCDAFB]"
        >
          <Image
            src={item.imageSrc}
            alt={item.alt}
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
      ))}
    </section>
  );
};
