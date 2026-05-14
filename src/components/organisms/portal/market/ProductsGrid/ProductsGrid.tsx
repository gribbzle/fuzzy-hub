import { JSX, PropsWithChildren, ReactElement } from "react";

import { twMerge } from "@utils";

import { ListingCard, Pet, Service } from "@portal/market/ui/molecules";

interface ProductsGridProps {
  items: Pet[] | Service[];
  className?: string;
  emptyState?: () => ReactElement;
}

export const ProductsGrid = ({
  items,
  className,
  children,
  emptyState,
}: PropsWithChildren<ProductsGridProps>): JSX.Element => {
  if (items.length === 0 && emptyState) {
    const EmptyState = emptyState;

    return (
      <div className="flex flex-1 flex-col">
        <EmptyState />
        {children}
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "grid h-fit flex-1 grid-cols-[repeat(auto-fill,310px)] justify-between gap-y-8",
        className,
      )}
    >
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
      {children}
    </div>
  );
};
