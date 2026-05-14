import Image, { ImageProps } from "next/image";

import { isPlaywrightCt, twMerge } from "@utils";

import { BreederFill } from "@portal/ui/icons";

interface AvatarProps extends Omit<ImageProps, "src" | "alt"> {
  alt?: string;
  src?: string | null;
  variant?: "circle" | "square";
}

export const Avatar = ({
  alt = "avatar",
  src,
  variant = "circle",
  className,
}: AvatarProps) => (
  <div
    className={twMerge(
      "relative flex justify-center items-center bg-bg-default w-12 h-12 overflow-hidden",
      variant === "circle" && "rounded-full",
      className,
    )}
  >
    {!src && <BreederFill className="absolute text-text-light w-1/2 h-1/2" />}
    {!!src && (
      <Image
        src={src}
        alt={alt}
        fill
        className="pointer-events-none shrink-0 object-contain"
        unoptimized={isPlaywrightCt()}
      />
    )}
  </div>
);
