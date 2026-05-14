import { AttachmentImage, Box } from "@portal/ui/atoms";

export interface StatisticsItemProps {
  title: string;
  subtitle: string;
  image_id: string;
}

export const KeyPointItem = ({
  title,
  subtitle,
  image_id,
}: StatisticsItemProps) => (
  <Box className="flex-1 items-center justify-center large-desktop:gap-8 tablet:gap-6 max-tablet:gap-4 large-desktop:px-8 max-tablet:px-6 large-desktop:pb-8">
    <AttachmentImage
      imageId={image_id}
      alt={title}
      width={120}
      height={120}
      className="large-desktop:w-30 large-desktop:h-30 tablet:w-25 tablet:h-25 max-tablet:w-20 max-tablet:h-20"
    />
    <Box className="items-center gap-3 max-tablet:-translate-y-px">
      <p className="font-fredoka large-desktop:text-32 tablet:text-24 max-tablet:text-20 max-tablet:leading-6 only-tablet:px-3.5 text-text-default text-center font-medium">
        {title}
      </p>
      <p className="large-desktop:text-20 tablet:text-18 max-tablet:text-16 text-text-secondary text-center font-semibold">
        {subtitle}
      </p>
    </Box>
  </Box>
);
