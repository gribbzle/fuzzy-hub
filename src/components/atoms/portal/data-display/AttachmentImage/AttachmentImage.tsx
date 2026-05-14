import React from "react";

import NextImage, { ImageProps as NextImageProps } from "next/image";

import { isPlaywrightCt, twMerge } from "@utils";

import { getAttachmentUrl } from "@portal/market/utils";

interface AttachmentImageProps extends Omit<NextImageProps, "src"> {
  imageId: string;
}

export const AttachmentImage = ({
  imageId,
  className,
  ...rest
}: AttachmentImageProps) => {
  const src = getAttachmentUrl(imageId);

  return (
    <NextImage
      src={src}
      unoptimized={isPlaywrightCt()}
      className={twMerge("pointer-events-none object-contain", className)}
      {...rest}
    />
  );
};
