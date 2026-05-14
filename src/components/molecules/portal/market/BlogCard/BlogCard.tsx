import { AttachmentImage } from "@portal/ui/atoms";

export interface BlogCardProps {
  id: string | number;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
}

export const BlogCard = ({
  title,
  description,
  date,
  imageSrc,
}: BlogCardProps) => (
  <article className="flex flex-1 flex-col rounded-4xl bg-white large-desktop:gap-6 max-large-desktop:gap-4 tablet:gap-4 large-desktop:p-8 max-large-desktop:p-5 only-tablet:min-w-85.5 max-tablet:min-w-72.5">
    <AttachmentImage
      imageId={imageSrc}
      width={474}
      height={312}
      alt={title}
      className="pointer-events-none large-desktop:h-78 tablet:h-54.5 max-tablet:h-54 w-full rounded-3xl"
    />
    <p className="large-desktop:text-24 max-large-desktop:text-20 text-text-default font-bold">
      {title}
    </p>
    <p className="large-desktop:text-18 max-large-desktop:text-16 text-text-secondary font-medium">
      {description}
    </p>
    <p className="large-desktop:text-18 max-large-desktop:text-16 text-text-secondary font-semibold">
      {date}
    </p>
  </article>
);
