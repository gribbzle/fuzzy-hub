import { twMerge } from "@utils";

import { Typography } from "@portal/ui/atoms";

import {
  ListingCard,
  Paginator,
  Pet,
  Service,
} from "@portal/market/ui/molecules";

export interface BestPropositionsProps {
  title: string;
  items: Pet[] | Service[];
  onNextClick?: () => void;
  onPrevClick?: () => void;
  className?: string;
}

export const BestPropositions = ({
  title,
  items,
  onNextClick,
  onPrevClick,
  className,
}: BestPropositionsProps) => (
  <section
    className={twMerge(
      "bg-primary flex w-full flex-col gap-8 rounded-4xl p-8",
      className,
    )}
  >
    <div className="flex items-center justify-between">
      <Typography variant="h1" component="p" className="text-white">
        {title}
      </Typography>
      <Paginator onNextBtnClick={onNextClick} onPrevBtnClick={onPrevClick} />
    </div>
    <div className="flex justify-between">
      {items.map((item) => (
        <ListingCard
          key={item.id}
          variant="outlined"
          className="w-75"
          item={item}
        />
      ))}
    </div>
  </section>
);
