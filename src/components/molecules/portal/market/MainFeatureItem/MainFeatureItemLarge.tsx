import { twMerge } from "@utils";

import { AttachmentImage, Box } from "@portal/ui/atoms";

import { MainFeatureItemProps } from "./types";

export const MainFeatureItemLarge = ({
  title,
  description,
  mobile_description,
  img_id,
  className,
}: MainFeatureItemProps) => (
  <div
    className={twMerge(
      "relative large-desktop:h-74 desktop:h-65 tablet:min-h-49 max-tablet:min-h-44.5 overflow-hidden rounded-4xl large-desktop:px-15 tablet:px-8 tablet:py-8 max-tablet:p-4 max-tablet:flex max-tablet:justify-center",
      className,
    )}
  >
    <Box className="z-1 large-desktop:gap-4 tablet:gap-3 max-tablet:gap-2 large-desktop:max-w-78 desktop:max-w-65 tablet:max-w-66.5 max-tablet:text-center">
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
      height={296}
      width={551}
      className="absolute object-cover bottom-0 tablet:right-0 large-desktop:w-137.75 large-desktop:h-74 desktop:w-98.5 desktop:h-53 tablet:w-106 tablet:h-49 max-tablet:w-54 max-tablet:h-25"
    />
  </div>
);
