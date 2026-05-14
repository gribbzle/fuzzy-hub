import Image from "next/image";

import { isPlaywrightCt, twMerge } from "@utils";

export type LogoOrientation = "vertical" | "horizontal";

const LOGO_SRC: Record<LogoOrientation, string> = {
  horizontal: "/images/logo/logo-horizontal.png",
  vertical: "/images/logo/logo-vertical.png",
};

export interface LogoProps {
  orientation?: LogoOrientation;
  alt?: string;
  className?: string;
}

export const Logo = ({
  orientation = "horizontal",
  alt = "logo",
  className,
}: LogoProps) => (
  <Image
    className={twMerge("pointer-events-none object-contain", className)}
    src={LOGO_SRC[orientation]}
    alt={alt}
    width={orientation === "vertical" ? 242 : 462}
    height={orientation === "horizontal" ? 160 : 104}
    unoptimized={isPlaywrightCt()}
    priority
  />
);
