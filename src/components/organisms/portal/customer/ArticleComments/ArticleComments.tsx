import { ReactElement } from "react";

import { twMerge } from "@utils";

import { Box } from "@portal/ui/atoms";

import {
  ArticleComment,
  ArticleCommentItem,
} from "@portal/customer/ui/molecules";

interface ArticleCommentsProps {
  items: ArticleComment[];
  className?: string;
  emptyState?: () => ReactElement;
}

export const ArticleComments = ({
  items,
  className,
  emptyState,
}: ArticleCommentsProps) => {
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
        <ArticleCommentItem key={idx} {...item} />
      ))}
    </Box>
  );
};
