import { twMerge } from "@utils";

import { Container, MenuLink, Typography } from "@portal/ui/atoms";
import { ArrowRightLong } from "@portal/ui/icons";

import { BlogCard, BlogCardProps } from "@portal/market/ui/molecules";

export interface BlogHighlightsProps {
  title: string;
  items: BlogCardProps[];
  className?: string;
}

export const BlogHighlights = ({
  title,
  items,
  className,
}: BlogHighlightsProps) => (
  <section className={twMerge("bg-bg-light", className)}>
    <Container className="desktop:gap-11 large-desktop:py-20 desktop:py-15 tablet:py-12 max-desktop:gap-8 max-tablet:py-10">
      <div className="flex items-center justify-between">
        <Typography variant="h2">{title}</Typography>
        <MenuLink
          className="gap-4 font-bold large-desktop:text-20 max-large-desktop:text-18"
          IconEnd={<ArrowRightLong className="text-primary" />}
        >
          See All
        </MenuLink>
      </div>
      <div className="flex large-desktop:gap-8 desktop:gap-5 tablet:gap-6 max-tablet:gap-4 max-desktop:overflow-auto">
        {items.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </div>
    </Container>
  </section>
);
