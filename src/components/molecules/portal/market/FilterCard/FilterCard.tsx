"use client";

import Image from "next/image";

import { twMerge } from "@utils";

import { useFilterCardGroup } from "@portal/market/contexts";

export interface FilterCardItem {
  imageSrc: string;
  label: string;
  value: string | number;
}

export interface FilterCardProps extends FilterCardItem {
  className?: string;
}

export const FilterCard = ({
  imageSrc,
  label,
  className,
  value,
}: FilterCardProps) => {
  const context = useFilterCardGroup();
  const isChecked = value === context.value;

  return (
    <button
      type="button"
      onClick={() => context.onChange?.(value)}
      className={twMerge(
        "group bg-bg-light flex h-75.5 w-53 cursor-pointer flex-col items-center gap-4 rounded-[100px] p-3",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={label}
        width={188}
        height={188}
        className={twMerge(
          "pointer-events-none h-47 w-47 rounded-full bg-white",
          !isChecked && "group-hover:bg-light-aqua-green",
          isChecked && "bg-aqua-green",
        )}
      />
      <span
        className={twMerge(
          "text-20 text-text-default w-full text-center font-bold",
          isChecked && "text-aqua-green",
        )}
      >
        {label}
      </span>
    </button>
  );
};
