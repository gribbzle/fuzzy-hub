import Link from "next/link";

import { Box, Tag } from "@portal/ui/atoms";
import { Facebook, Instagram, Youtube } from "@portal/ui/icons";

export interface SpecificationItem {
  label: string;
  value: string | string[];
}

export interface SpecificationsGridProps {
  data: SpecificationItem[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const SpecificationsGrid = ({
  data,
  socialLinks,
}: SpecificationsGridProps) => (
  <Box className="gap-4">
    {data.map((item, index) => (
      <div key={`specification-${index}`} className="flex">
        <span className="text-18 w-full max-w-50 font-medium text-[#2B2B2E]/65">
          {item.label}
        </span>
        {Array.isArray(item.value) ? (
          <div className="flex flex-1 flex-wrap gap-2">
            {item.value.map((label, index) => (
              <Tag key={index}>{label}</Tag>
            ))}
          </div>
        ) : (
          <span className="text-18 flex-1 font-semibold whitespace-pre-line text-[#2B2B2E]">
            {item.value}
          </span>
        )}
      </div>
    ))}
    {socialLinks && (
      <div className="flex items-center">
        <span className="text-18 w-full max-w-50 font-medium text-[#2B2B2E]/65">
          Social Links:
        </span>
        <div className="flex gap-2">
          {socialLinks?.instagram && (
            <Link
              className="p-2.5"
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="text-text-default hover:text-primary h-6 w-6 transition-colors" />
            </Link>
          )}
          {socialLinks?.facebook && (
            <Link
              className="p-2.5"
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="text-text-default hover:text-primary h-6 w-6 transition-colors" />
            </Link>
          )}
          {socialLinks?.youtube && (
            <Link
              className="p-2.5"
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="text-text-default hover:text-primary h-6 w-6 transition-colors" />
            </Link>
          )}
        </div>
      </div>
    )}
  </Box>
);
