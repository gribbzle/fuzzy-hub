import { EmptyState } from "@portal/ui/molecules";

export const BreederReviewsEmptyState = () => (
  <EmptyState
    title="No Breeder Reviews Yet"
    description="Your reviews help our community choose trusted breeders and shelters. They will appear here once you rate a provider."
    slotProps={{
      image: {
        src: "/images/empty-state/reviews.png",
        alt: "No Breeder Reviews Yet",
      },
    }}
  />
);
