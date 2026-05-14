import { EmptyState } from "@portal/ui/molecules";

export const CommentsEmptyState = () => (
  <EmptyState
    title="No Comments Yet"
    description="Join the discussion! Your questions and insights on articles in the Learning Hub will be collected here."
    slotProps={{
      image: {
        src: "/images/empty-state/comments.png",
        alt: "No Comments Yet",
      },
    }}
  />
);
