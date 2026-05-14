import { twMerge } from "@utils";

import {
  FilterInputLabel,
  TopPickCard,
  TopPickCardProps,
} from "@portal/market/ui/molecules";

export interface TopPickProps {
  title: string;
  items: TopPickCardProps[];
  className?: string;
}

export const TopPick = ({ title, items, className }: TopPickProps) => (
  <div className={twMerge("flex flex-col gap-4", className)}>
    <FilterInputLabel label={title} />
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <TopPickCard key={item.title} {...item} />
      ))}
    </div>
  </div>
);
