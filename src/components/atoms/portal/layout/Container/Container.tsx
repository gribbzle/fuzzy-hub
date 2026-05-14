import { ElementType, ReactNode } from "react";

import { twMerge } from "@utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  component?: ElementType;
}

export const Container = ({
  children,
  className,
  component = "div",
}: ContainerProps) => {
  const Component = component;

  return (
    <Component
      className={twMerge(
        "mx-auto flex flex-col",
        "large-desktop:max-w-420 desktop:max-w-290 tablet:max-w-180 max-tablet:px-4 w-full",
        className,
      )}
    >
      {children}
    </Component>
  );
};
