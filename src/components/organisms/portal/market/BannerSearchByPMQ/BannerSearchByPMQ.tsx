import React from "react";

import { twMerge } from "@utils";

import { AttachmentImage, Box } from "@portal/ui/atoms";

export interface BannerSearchByPMQProps {
  title: string;
  text: string;
  className?: string;
}

export const BannerSearchByPMQ = ({
  title,
  text,
  className,
}: BannerSearchByPMQProps) => (
  <div
    className={twMerge(
      "relative flex flex-col overflow-hidden bg-[#DFEAFF]",
      "max-tablet:rounded-3xl max-desktop:h-53 max-tablet:h-48.5 large-desktop:p-11 desktop:px-12 tablet:py-9 rounded-4xl p-9 max-tablet:p-6 max-tablet:mx-2",
      className,
    )}
  >
    <Box className="large-desktop:gap-8 large-desktop:max-w-190.5 desktop:max-large-desktop:max-w-109 tablet:max-desktop:max-w-148.5 z-10 flex w-full flex-col gap-4">
      <p className="font-fredoka text-text-default tablet:text-32 large-desktop:text-44 max-tablet:text-20 max-tablet:leading-6 max-tablet:text-center font-medium">
        {title}
      </p>
      <p className="text-16 text-text-secondary desktop:max-w-fit tablet:max-w-80.75 large-desktop:text-20 large-desktop:font-semibold max-tablet:hidden font-medium whitespace-pre-line max-large-desktop:-translate-y-px">
        {text}
      </p>
    </Box>
    <div className="max-tablet:justify-center absolute inset-0 z-0 flex items-end justify-end">
      <AttachmentImage
        imageId="/images/banner-search-by-pmq/banner-large.png"
        alt="Banner background"
        width={778}
        height={230}
        className="max-large-desktop:hidden object-cover"
      />
      <AttachmentImage
        imageId="/images/banner-search-by-pmq/banner-medium.png"
        alt="Banner background"
        width={468}
        height={194}
        className="desktop:max-large-desktop:block hidden object-cover"
      />
      <AttachmentImage
        imageId="/images/banner-search-by-pmq/banner-small.png"
        alt="Banner background"
        width={322}
        height={134}
        className="tablet:block desktop:hidden hidden h-33.5 object-cover"
      />
      <AttachmentImage
        imageId="/images/banner-search-by-pmq/banner-mini.png"
        alt="Banner background"
        width={343}
        height={134}
        className="max-tablet:block hidden h-33.5 object-cover"
      />
    </div>
  </div>
);
