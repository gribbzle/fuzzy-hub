import { twMerge } from "@utils";

import { Typography } from "@portal/ui/atoms";

import { BreadcrumbItem, Breadcrumbs } from "@portal/market/ui/molecules";

export interface PageHeaderProps {
  title?: string;
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

export const PageHeader = ({
  title,
  breadcrumbs,
  className,
}: PageHeaderProps) => (
  <div
    className={twMerge(
      "bg-bg-light relative z-200 -mt-21 flex h-47 justify-center",
      className,
    )}
  >
    <div className="flex w-full max-w-420 items-end justify-between pb-8">
      {title && <Typography variant="h1">{title}</Typography>}
      <Breadcrumbs items={breadcrumbs} />
    </div>
  </div>
);
