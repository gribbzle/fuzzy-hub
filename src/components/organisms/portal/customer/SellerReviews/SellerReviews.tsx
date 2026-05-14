import { ReactElement } from "react";

import { twMerge } from "@utils";

import { Box } from "@portal/ui/atoms";

import { SellerReview, SellerReviewItem } from "@portal/customer/ui/molecules";

interface SellerReviewsProps {
  items: SellerReview[];
  className?: string;
  emptyState?: () => ReactElement;
}

export const SellerReviews = ({
  items,
  className,
  emptyState,
}: SellerReviewsProps) => {
  if (items.length === 0 && emptyState) {
    const EmptyState = emptyState;

    return (
      <div className="flex flex-1">
        <EmptyState />
      </div>
    );
  }

  return (
    <Box className={twMerge("gap-8", className)}>
      {items.map((item, idx) => (
        <SellerReviewItem key={idx} {...item} />
      ))}
    </Box>
  );
};
