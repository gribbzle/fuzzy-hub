"use client";

import Image from "next/image";

import { UserType } from "@models";
import { twMerge } from "@utils";
import { useController, useFormContext } from "react-hook-form";

import { Box } from "@portal/ui/atoms";

interface UserTypeOption {
  id: Exclude<UserType, "admin">;
  title: string;
  description: string;
  image: string;
}

const userTypeOptions: UserTypeOption[] = [
  {
    id: "customer",
    title: "For me and my pet",
    description: "Find, learn & manage pet care",
    image: "/images/registration/pet-owner.jpg",
  },
  {
    id: "breeder",
    title: "I breed or rehome pets",
    description: "Breeders, shelters & rescues",
    image: "/images/registration/breeder.jpg",
  },
  {
    id: "service",
    title: "I provide pet services",
    description: "Grooming, training, vet care & more",
    image: "/images/registration/pet-service.jpg",
  },
];

interface UserTypeSelectProps {
  defaultValue?: UserType;
  name: string;
}

export const UserTypeSelectField = ({
  defaultValue,
  name,
}: UserTypeSelectProps) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Box className="flex w-full flex-col large-desktop:gap-4 gap-3">
      {userTypeOptions.map((option) => {
        const checked = option.id === field.value;

        return (
          <label
            key={option.id}
            className={twMerge(
              "bg-bg-light hover:bg-light-aqua-green flex w-full cursor-pointer flex-row items-center gap-4 rounded-3xl transition-colors",
              "large-desktop:h-37 tablet:h-30 max-tablet:h-22 max-tablet:rounded-2xl large-desktop:px-6 tablet:px-5 max-tablet:px-4",
              checked && "bg-light-aqua-green",
            )}
          >
            <input
              id={option.id}
              type="radio"
              className="peer hidden"
              {...field}
              value={option.id}
              checked={checked}
            />
            <div
              className={twMerge(
                "box-border border-border-gray peer-checked:border-aqua-green peer-checked:border-2",
                "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border grayscale peer-checked:grayscale-0",
                "large-desktop:h-25 large-desktop:w-25 tablet:h-20 tablet:w-20 max-tablet:h-14 max-tablet:w-14",
              )}
            >
              <Image
                src={option.image}
                alt={option.title}
                width={200}
                height={200}
                className="absolute pointer-events-none max-w-fit max-tablet:h-14 max-tablet:w-14 tablet:h-20 tablet:w-20 large-desktop:h-25 large-desktop:w-25"
                loading="eager"
              />
            </div>
            <Box className="flex flex-1 flex-col gap-2 max-tablet:gap-1 max-tablet:pb-px">
              <span className="text-18 text-text-default flex-1 font-bold max-tablet:text-16">
                {option.title}
              </span>
              <span className="text-14 text-text-secondary flex-1 font-semibold max-tablet:translate-y-px">
                {option.description}
              </span>
            </Box>
          </label>
        );
      })}
    </Box>
  );
};
