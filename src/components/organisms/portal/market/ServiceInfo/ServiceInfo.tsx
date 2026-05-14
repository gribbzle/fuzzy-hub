import { Box, Divider, MetaInfo, Typography } from "@portal/ui/atoms";
import { CallFill, ClockFill, LocationTick, StarFill } from "@portal/ui/icons";

import {
  BoxLabel,
  SpecificationsGrid,
  SpecificationsGridProps,
} from "@portal/market/ui/molecules";

export interface ServiceInfoProps {
  title: string;
  description: string;
  location: string;
  rating: string;
  phone: string;
  hours: string;
  overview: string;
  slotProps?: {
    specificationsGrid?: SpecificationsGridProps;
  };
}

export const ServiceInfo = ({
  title,
  description,
  location,
  rating,
  phone,
  hours,
  overview,
  slotProps,
}: ServiceInfoProps) => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-4">
      <Typography variant="h1">{title}</Typography>
      <p className="text-18 font-normal text-[#2B2B2E]">{description}</p>
      <MetaInfo
        icon={<LocationTick className="text-aqua-green" />}
        text={location}
      />
      <div className="flex flex-wrap gap-5">
        <MetaInfo
          icon={<StarFill className="text-aqua-green" />}
          text={rating}
        />
        <MetaInfo
          icon={<CallFill className="text-aqua-green" />}
          text={phone}
        />
        <MetaInfo
          icon={<ClockFill className="text-aqua-green" />}
          text={hours}
        />
      </div>
    </div>
    <Box>
      <BoxLabel>Overview</BoxLabel>
      <p className="text-18 font-normal text-[#2B2B2E]">{overview}</p>
    </Box>
    {slotProps?.specificationsGrid && (
      <>
        <Divider />
        <Box>
          <BoxLabel>Specifications</BoxLabel>
          <SpecificationsGrid {...slotProps.specificationsGrid} />
        </Box>
      </>
    )}
  </div>
);
