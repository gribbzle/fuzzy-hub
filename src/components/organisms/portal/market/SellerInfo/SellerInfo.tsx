import React from "react";

import { twMerge } from "@utils";

import { Box, Button, MetaInfo, Typography } from "@portal/ui/atoms";
import { LocationTick } from "@portal/ui/icons";

import {
  BoxLabel,
  SpecificationItem,
  SpecificationsGrid,
} from "@portal/market/ui/molecules";

export interface SellerInfoProps {
  name: string;
  specifications: SpecificationItem[];
  location: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  onMessageClick?: () => void;
  onReviewClick?: () => void;
  className?: string;
}

export const SellerInfo = ({
  name,
  location,
  specifications,
  socialLinks,
  onMessageClick,
  onReviewClick,
  className,
}: SellerInfoProps) => (
  <div className={twMerge("flex w-full flex-col gap-6", className)}>
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        <Typography variant="h1">{name}</Typography>
        <MetaInfo
          icon={<LocationTick className="text-primary" />}
          text={location}
        />
      </div>
      <div className="flex gap-4">
        <Button variant="primary" size="medium" onClick={onMessageClick}>
          Message Store
        </Button>
        <Button variant="secondary" size="medium" onClick={onReviewClick}>
          Write a Review
        </Button>
      </div>
    </div>
    <Box>
      <BoxLabel>Seller Info</BoxLabel>
      <SpecificationsGrid data={specifications} socialLinks={socialLinks} />
    </Box>
  </div>
);
