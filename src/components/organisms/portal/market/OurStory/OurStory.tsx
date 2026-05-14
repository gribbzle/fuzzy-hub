import Image from "next/image";

import { twMerge } from "@utils";

import { Button, Typography } from "@portal/ui/atoms";

export interface OurStoryProps {
  title: string;
  description: string;
  buttonLabel: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export const OurStory = ({
  title,
  description,
  buttonLabel,
  imageSrc,
  imageAlt,
  className,
}: OurStoryProps) => (
  <section
    aria-label={title}
    className={twMerge("flex justify-center", className)}
  >
    <div className="bg-bg-light relative flex w-full max-w-420 justify-between overflow-hidden rounded-4xl px-15 py-16">
      <div className="z-10 flex w-full max-w-233.75 flex-col gap-8">
        <div className="flex flex-col gap-8">
          <Typography variant="h1" component="p">
            {title}
          </Typography>
          <p className="text-20 text-text-default/65 font-semibold whitespace-pre-line">
            {description}
          </p>
        </div>
        <Button variant="primary" size="medium">
          {buttonLabel}
        </Button>
      </div>
      <Image
        src={imageSrc}
        alt={imageAlt || title}
        className="pointer-events-none absolute top-0 right-0 bottom-0"
        width={472}
        height={522}
      />
    </div>
  </section>
);
