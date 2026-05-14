import Image from "next/image";

import { twMerge } from "@utils";

export interface SellerGalleryProps {
  images: string[];
  className?: string;
}

export const SellerGallery = ({ images, className }: SellerGalleryProps) => {
  const [mainImage, secondImage, thirdImage] = images;

  return (
    <div
      className={twMerge("flex w-full max-w-166 flex-wrap gap-4", className)}
    >
      {mainImage && (
        <Image
          src={mainImage}
          alt="Gallery image 1"
          width={653}
          height={414}
          className="pointer-events-none h-103.5 w-full rounded-3xl object-cover"
        />
      )}
      {secondImage && (
        <Image
          src={secondImage}
          alt="Gallery image 2"
          width={318}
          height={402}
          className="pointer-events-none h-100.5 min-w-79.5 flex-1 rounded-3xl object-cover"
        />
      )}
      {thirdImage && (
        <Image
          src={thirdImage}
          alt="Gallery image 3"
          width={318}
          height={402}
          className="pointer-events-none h-100.5 min-w-79.5 flex-1 rounded-3xl object-cover"
        />
      )}
    </div>
  );
};
