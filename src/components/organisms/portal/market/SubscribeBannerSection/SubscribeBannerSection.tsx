"use client";

import { FormEvent } from "react";

import { twMerge } from "@utils";

import {
  AttachmentImage,
  Box,
  Button,
  Container,
  Typography,
} from "@portal/ui/atoms";

interface SubscribeBannerSectionProps {
  title: string;
  description: string;
  actionLabel: string;
  inputPlaceholder?: string;
  onSubmit?: (email: string) => void;
  className?: string;
}

export const SubscribeBannerSection = ({
  title,
  description,
  actionLabel,
  inputPlaceholder = "Your email address",
  onSubmit,
  className,
}: SubscribeBannerSectionProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!onSubmit) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    onSubmit(email);
  };

  return (
    <Container
      component="section"
      className={twMerge("flex items-center", className)}
    >
      <div
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-4xl large-desktop:min-h-84.5 large-desktop:max-w-334.5 tablet:min-h-76 desktop:max-w-240 max-tablet:min-h-101"
        style={{
          background:
            "linear-gradient(58.766082524561824deg, #F3B153 2.6254%, #FFF497 82.537%), linear-gradient(90deg, #EDE4F4 0%, #EDE4F4 100%)",
        }}
      >
        <AttachmentImage
          imageId="/images/subscribe-paws-left.png"
          alt="Decorative paws"
          height={338}
          width={318}
          className="pointer-events-none absolute top-1/2 h-full -translate-y-1/2 object-contain max-tablet:-left-20.75 max-tablet:top-[calc(50%-86px)] max-tablet:h-68.5 max-tablet:w-65.75 tablet:-left-12.5 desktop:-left-13.25 desktop:w-72.75 large-desktop:left-0 large-desktop:w-79.5 tablet:w-72.75"
        />
        <AttachmentImage
          imageId="/images/subscribe-paws-right.png"
          alt="Decorative paws"
          width={318}
          height={338}
          className="pointer-events-none absolute top-1/2 h-full -translate-y-1/2 object-contain max-tablet:top-auto max-tablet:-bottom-44.5 max-tablet:left-[calc(50%+154.5px)] max-tablet:right-auto max-tablet:h-76 max-tablet:w-71.5 max-tablet:-translate-x-1/2 max-tablet:translate-y-0 tablet:-right-29 tablet:w-71.5 desktop:-right-11.5 desktop:w-71.5 large-desktop:right-0 large-desktop:w-79.5"
        />
        <Box className="w-full large-desktop:gap-7 tablet:gap-14 max-tablet:gap-10 large-desktop:max-w-175 desktop:max-w-133 tablet:max-w-114.5 max-tablet:px-4">
          <Box className="gap-4">
            <Typography variant="h2" className="text-center">
              {title}
            </Typography>
            <Box className="gap-2">
              {description.split("\n").map((line, i) => (
                <p
                  key={i}
                  className="text-text-secondary text-center font-semibold whitespace-pre-line large-desktop:text-18 max-large-desktop:text-16"
                >
                  {line}
                </p>
              ))}
            </Box>
          </Box>
          <form
            className="relative flex large-desktop:h-15 tablet:h-11 max-tablet:h-13.5 items-center justify-between gap-2 rounded-[60px] bg-white py-2 pr-0.5 pl-6 max-tablet:pr-6 max-tablet:mb-17.5"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              placeholder={inputPlaceholder}
              className="text-text-default/70 placeholder:text-text-default/70 max-tablet:placeholder:text-center h-full flex-1 bg-transparent font-semibold focus:outline-none max-large-desktop:text-18 large-desktop:text-20"
            />
            <Button
              variant="primary"
              className="large-desktop:btn-medium tablet:btn-small max-tablet:btn-medium desktop:w-40 large-desktop:w-50 tablet:w-29 max-tablet:absolute max-tablet:-bottom-17.5 max-tablet:right-0 max-tablet:left-0 max-tablet:w-full"
            >
              {actionLabel}
            </Button>
          </form>
        </Box>
      </div>
    </Container>
  );
};
