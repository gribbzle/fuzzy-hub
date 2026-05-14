import { EmptyState } from "@portal/ui/molecules";

export const SearchEmptyState = () => (
  <EmptyState
    title="Nothing matches your search"
    description="We couldn't find what you're looking for. Try different keywords, broaden your filters, or browse all available pets below."
    slotProps={{
      image: {
        width: 144,
        height: 144,
        src: "/images/empty-state/pets.png",
        alt: "Nothing matches your search",
      },
    }}
  />
);
