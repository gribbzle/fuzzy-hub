import { twMerge } from "@utils";

import { Box, Container, MenuLink, Typography } from "@portal/ui/atoms";
import { ArrowRightLong } from "@portal/ui/icons";

import { ReviewCard, ReviewCardProps } from "@portal/market/ui/molecules";

export interface ReviewsSectionProps {
  title: string;
  subtitle: string;
  items: ReviewCardProps[];
  className?: string;
}

export const ReviewsSection = ({
  items,
  title,
  subtitle,
  className,
}: ReviewsSectionProps) => (
  <section className={twMerge("bg-[#5ABAB9]", className)}>
    <Container className="large-desktop:py-20 desktop:py-15 tablet:py-12 max-tablet:py-10 gap-8">
      <Box className="gap-11 max-tablet:gap-8">
        <div className="flex items-start justify-between">
          <Box className="large-desktop:gap-4 max-large-desktop:gap-3 max-tablet:text-center">
            <Typography variant="h2" className="text-white">
              {title}
            </Typography>
            <p className="text-white large-desktop:text-18 large-desktop:leading-6 large-desktop:font-semibold tablet:text-16 tablet:leading-5.5 max-large-desktop:font-medium max-tablet:text-14 max-tablet:leading-5">
              {subtitle}
            </p>
          </Box>
          <MenuLink
            className="font-bold text-white large-desktop:text-20 tablet:text-18 max-tablet:hidden"
            IconEnd={<ArrowRightLong aria-hidden="true" />}
          >
            See All
          </MenuLink>
        </div>
        <Box className="large-desktop:gap-8.25 desktop:gap-5 tablet:gap-6 max-tablet:gap-4">
          <div className="flex flex-wrap large-desktop:gap-8.25 desktop:gap-5 tablet:gap-6 max-tablet:gap-4">
            {items.map((item, index) => (
              <ReviewCard
                key={item.id}
                {...item}
                className={twMerge(
                  "flex-1",
                  (index + 1) % 4 === 2 || (index + 1) % 4 === 3
                    ? "desktop:grow-7 desktop:basis-2/4"
                    : "desktop:grow-3 desktop:basis-2/6",
                )}
              />
            ))}
          </div>
          <p className="text-18 text-white font-medium leading-6.5 max-tablet:text-14 max-tablet:leading-5 max-tablet:text-center">
            Collected during early concept testing
          </p>
        </Box>
      </Box>
      <MenuLink
        className="font-bold text-white text-18 leading-6.5 tablet:hidden w-full justify-center"
        IconEnd={<ArrowRightLong aria-hidden="true" />}
      >
        See All
      </MenuLink>
    </Container>
  </section>
);
