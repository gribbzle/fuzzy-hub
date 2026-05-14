import { twMerge } from "@utils";

import { Box, Container, Typography } from "@portal/ui/atoms";

import { KeyPointItem, StatisticsItemProps } from "@portal/market/ui/molecules";

type Fixed3<T> = [T, T, T];

type StatisticsData = Fixed3<StatisticsItemProps>;

export interface StatisticsProps {
  data: StatisticsData;
  title: string;
  className?: string;
}

export const KeyPointsSection = ({
  data,
  title,
  className,
}: StatisticsProps) => (
  <Container
    className={twMerge("items-center justify-center", className)}
    component="section"
  >
    <Box className="w-full items-center large-desktop:gap-15 desktop:gap-12 max-desktop:gap-8 large-desktop:max-w-335">
      <Typography variant="h2" className="w-full text-center">
        {title}
      </Typography>
      <div className="flex w-full justify-between gap-8 max-tablet:flex-col">
        {data.map((item, index) => (
          <KeyPointItem key={index} {...item} />
        ))}
      </div>
    </Box>
  </Container>
);
