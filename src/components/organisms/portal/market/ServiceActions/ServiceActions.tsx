"use client";

import { Button, FavoriteButton } from "@portal/ui/atoms";

interface ServiceActionsProps {
  price: string;
}

export const ServiceActions = ({ price }: ServiceActionsProps) => (
  <div className="bg-bg-light flex w-full flex-col gap-4 rounded-3xl p-6">
    <div className="relative flex items-center justify-center">
      <span className="text-text-default font-fredoka text-32 font-medium">
        {price}
      </span>
      <FavoriteButton className="absolute top-0 right-0" shadow />
    </div>
    <div className="flex flex-col gap-4">
      <Button size="medium" fullWidth>
        Message
      </Button>
      <Button size="medium" variant="tertiary" fullWidth>
        Write a Review
      </Button>
    </div>
  </div>
);
