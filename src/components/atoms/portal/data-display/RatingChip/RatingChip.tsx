import { DetailedHTMLProps, HTMLAttributes, SVGProps } from "react";

import { twMerge } from "@utils";

import { StarFill } from "@portal/ui/icons";

interface ChipProps {
  label: string;
  className?: string;
  slotProps?: {
    icon?: SVGProps<SVGSVGElement>;
    text?: DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >;
  };
}

export const RatingChip = ({ label, className, slotProps }: ChipProps) => (
  <div
    className={twMerge(
      "flex h-7.5 items-center justify-center gap-1 overflow-hidden rounded-3xl bg-white/80 pr-2 pl-1.5",
      className,
    )}
  >
    <StarFill
      width={20}
      height={20}
      {...slotProps?.icon}
      className={twMerge("text-[#F6D96F]", slotProps?.icon?.className)}
    />
    <p
      {...slotProps?.text}
      className={twMerge(
        "text-16 text-text-default font-medium",
        slotProps?.text?.className,
      )}
    >
      {label}
    </p>
  </div>
);
