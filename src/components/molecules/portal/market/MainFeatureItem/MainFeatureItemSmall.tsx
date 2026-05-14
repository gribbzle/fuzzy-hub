import { twMerge } from "@utils";

import { AttachmentImage, Box } from "@portal/ui/atoms";

import { MainFeatureItemProps } from "./types";

export const MainFeatureItemSmall = ({
  title,
  description,
  mobile_description,
  img_id,
  className,
}: MainFeatureItemProps) => (
  <div
    className={twMerge(
      "relative large-desktop:h-74 desktop:h-65 tablet:min-h-49 max-tablet:min-h-44.5 overflow-hidden rounded-4xl py-8 px-8 flex desktop:justify-center max-tablet:justify-center",
      className,
    )}
  >
    <Box className="z-1 large-desktop:gap-4 tablet:gap-3 max-tablet:gap-2 desktop:text-center max-desktop:max-w-66.5 max-tablet:text-center">
      <p className="font-fredoka large-desktop:text-32 tablet:text-24 max-tablet:text-20 text-text-default font-medium">
        {title}
      </p>
      <p className="max-tablet:hidden large-desktop:text-18 tablet:text-16 max-tablet:text-14 large-desktop:font-normal max-large-desktop:font-medium text-text-secondary whitespace-pre-line max-large-desktop:-translate-y-px">
        {description}
      </p>
      <p className="tablet:hidden text-14 font-medium text-text-secondary">
        {mobile_description}
      </p>
    </Box>
    <AttachmentImage
      imageId={img_id}
      alt={title}
      height={184}
      width={400}
      className="absolute bottom-0 large-desktop:w-100 large-desktop:h-46 desktop:w-80 desktop:h-37 tablet:w-106 tablet:h-49 only-tablet:right-0 max-tablet:w-54 max-tablet:h-25"
    />
  </div>
);
