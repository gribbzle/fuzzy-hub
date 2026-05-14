import { EmptyState } from "@portal/ui/molecules";

export const SellerReviewsEmptyState = () => (
  <EmptyState
    title="No Seller Reviews Yet"
    description="Your reviews help our community choose trusted breeders and sellers. They will appear here once you rate a purchase."
    slotProps={{
      image: {
        src: "/images/empty-state/reviews.png",
        alt: "No Seller Reviews Yet",
      },
    }}
  />
);
