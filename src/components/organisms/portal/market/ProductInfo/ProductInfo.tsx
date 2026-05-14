import React from "react";

import { twMerge } from "@utils";

import { Box, Divider, Tag, Typography } from "@portal/ui/atoms";

import {
  BoxLabel,
  SpecificationItem,
  SpecificationsGrid,
} from "@portal/market/ui/molecules";

export interface PetInfoProps {
  title: string;
  tags: string[];
  description: string;
  specifications: SpecificationItem[];
  availability: string;
  className?: string;
}

export const ProductInfo = ({
  title,
  tags,
  description,
  specifications,
  availability,
  className,
}: PetInfoProps) => (
  <section className={twMerge("flex flex-col gap-6", className)}>
    <div className="flex flex-col gap-4">
      <Typography variant="h1">{title}</Typography>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
    <Box>
      <BoxLabel>Description</BoxLabel>
      <p className="text-18 leading-relaxed font-normal text-[#2B2B2E]">
        {description}
      </p>
    </Box>
    <Divider />
    <Box>
      <BoxLabel>Specifications</BoxLabel>
      <SpecificationsGrid data={specifications} />
    </Box>
    <Divider />
    <Box>
      <BoxLabel>Availability</BoxLabel>
      <p className="text-18 font-normal text-[#2B2B2E]">{availability}</p>
    </Box>
  </section>
);
