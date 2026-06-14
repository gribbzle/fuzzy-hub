import { getImageProps } from "next/image";

import { isPlaywrightCt, twMerge } from "@utils";

import { getAttachmentUrl } from "@portal/market/utils";

export interface ArtDirectionImageSrc {
  mobile: string;
  tablet: string;
  desktop: string;
  largeDesktop: string;
}

interface ArtDirectionImageProps {
  src: ArtDirectionImageSrc;
  className?: string;
}

export const ArtDirectionImage = ({
  className,
  src,
}: ArtDirectionImageProps) => {
  const getSrcSetForAttachment = (attachmentSrc: string) => {
    if (isPlaywrightCt()) {
      return getAttachmentUrl(attachmentSrc);
    }

    const { props } = getImageProps({
      alt: "",
      sizes: "100vw",
      fill: true,
      loading: "eager",
      src: getAttachmentUrl(attachmentSrc),
    });

    return props.srcSet;
  };

  const largeDesktop = getSrcSetForAttachment(src.largeDesktop);
  const desktop = getSrcSetForAttachment(src.desktop);
  const tablet = getSrcSetForAttachment(src.tablet);
  const mobile = getSrcSetForAttachment(src.mobile);

  return (
    <picture>
      <source media="(min-width: 1919px)" srcSet={largeDesktop} />
      <source media="(min-width: 1280px)" srcSet={desktop} />
      <source media="(min-width: 768px)" srcSet={tablet} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img
        alt=""
        className={twMerge("w-full h-full object-cover", className)}
      />
    </picture>
  );
};
