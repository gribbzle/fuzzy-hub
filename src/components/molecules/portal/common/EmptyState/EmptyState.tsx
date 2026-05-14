import Image, { ImageProps } from "next/image";

import { twMerge } from "tailwind-merge";

import { Box } from "@portal/ui/atoms";

interface EmptyStateProps {
  title: string;
  description: string;
  slotProps: {
    image: ImageProps;
  };
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  className,
  slotProps,
}: EmptyStateProps) => (
  <div className="flex flex-1 justify-center">
    <Box className={twMerge("max-w-116.75 items-center gap-8", className)}>
      <Image
        width={132}
        height={132}
        priority
        {...slotProps.image}
        alt={slotProps.image.alt}
        className={twMerge("object-cover", slotProps.image.className)}
      />
      <Box className="items-center gap-3">
        <h2 className="text-24 text-text-default text-center font-bold">
          {title}
        </h2>
        <p className="text-20 text-text-default text-center font-medium">
          {description}
        </p>
      </Box>
    </Box>
  </div>
);
