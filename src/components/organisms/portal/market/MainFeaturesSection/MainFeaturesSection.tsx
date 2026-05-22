import { twMerge } from "@utils";

import { Box, Container, Typography } from "@portal/ui/atoms";

import {
  MainFeatureItemLarge,
  MainFeatureItemProps,
  MainFeatureItemSmall,
} from "@portal/market/ui/molecules";

type Fixed5<T> = [T, T, T, T, T];

export type MainFeaturesData = Fixed5<MainFeatureItemProps>;

export interface MainFeaturesProps {
  title: string;
  subtitle: string;
  data: MainFeaturesData;
  className?: string;
}

export const MainFeaturesSection = ({
  title,
  subtitle,
  data,
  className,
}: MainFeaturesProps) => {
  const [item1, item2, item3, item4, item5] = data;

  return (
    <Container
      className={twMerge(
        "large-desktop:gap-11 tablet:gap-8 max-tablet:gap-5",
        className,
      )}
      component="section"
    >
      <Box className="large-desktop:gap-4 max-large-desktop:gap-3">
        <Typography variant="h2" className="text-center">
          {title}
        </Typography>
        <p className="large-desktop:text-18 tablet:text-16 max-tablet:text-14 text-text-secondary text-center large-desktop:font-semibold max-large-desktop:font-medium max-large-desktop:-translate-y-px">
          {subtitle}
        </p>
      </Box>
      <Box className="large-desktop:gap-8 desktop:gap-5 tablet:gap-2 max-tablet:gap-3">
        <div className="flex max-desktop:flex-col justify-between large-desktop:gap-8 desktop:gap-5 tablet:gap-2 max-tablet:gap-3">
          <MainFeatureItemLarge {...item1} className="bg-[#FFEFBF] flex-1" />
          <MainFeatureItemLarge {...item2} className="bg-[#EBE4FF] flex-1" />
        </div>
        <div className="flex max-desktop:flex-col justify-between large-desktop:gap-8 desktop:gap-5 tablet:gap-2 max-tablet:gap-3">
          <MainFeatureItemSmall
            {...item3}
            className="bg-light-aqua-green large-desktop:w-120.5 max-large-desktop:flex-1"
          />
          <MainFeatureItemSmall {...item4} className="bg-[#FFE7E1] flex-1" />
          <MainFeatureItemSmall
            {...item5}
            className="bg-[#DFEAFF] large-desktop:w-120.5 max-large-desktop:flex-1"
          />
        </div>
      </Box>
    </Container>
  );
};
