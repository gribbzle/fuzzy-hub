import Link from "next/link";

import { ProfileResource } from "@portal/models";
import { twMerge } from "@utils";

import {
  Avatar,
  Box,
  Container,
  IconButton,
  Logo,
  MenuLink,
} from "@portal/ui/atoms";
import {
  ArrowDown,
  LocationTick,
  Menu2,
  ProfileCircle,
} from "@portal/ui/icons";

import HeaderBreederActions from "./HeaderBreederActions";
import HeaderCustomerActions from "./HeaderCustomerActions";
import HeaderDefaultActions from "./HeaderDefaultActions";

export interface HeaderProps {
  className?: string;
  prefixHref?: string;
  userProfile?: ProfileResource;
}

export const Header = ({
  className,
  prefixHref = "",
  userProfile,
}: HeaderProps) => (
  <header
    className={twMerge(
      "sticky top-4 max-tablet:top-2 z-300 mt-4 max-tablet:mt-2 flex items-center justify-center",
      className,
    )}
  >
    <Container className="desktop:h-21 h-15 flex-row items-center rounded-3xl bg-white/84 px-4 max-tablet:px-3 backdrop-blur-sm">
      <Box className="align-items-center large-desktop:gap-11 tablet:gap-4 desktop:flex-row max-desktop:flex-row-reverse justify-center max-tablet:w-full max-tablet:justify-between">
        <div className="tablet:hidden flex justify-center items-center">
          {!userProfile && (
            <IconButton Icon={ProfileCircle} className="w-8 h-8" />
          )}
          {!!userProfile && <Avatar className="w-8 h-8" />}
        </div>
        <Link
          href={`${prefixHref}/`}
          className="shrink-0 max-desktop:tablet:ml-12"
          prefetch={false}
        >
          <Logo
            orientation="horizontal"
            className="large-desktop:h-13 large-desktop:w-57.75 tablet:h-10 tablet:w-44.5 h-8 w-35.5"
          />
        </Link>
        <Box className="max-tablet:hidden shrink-0 flex-row items-center">
          <MenuLink
            IconStart={
              <LocationTick width={24} height={24} className="text-primary" />
            }
            IconEnd={<ArrowDown width={16} height={16} strokeWidth={3} />}
          >
            Los Angeles
          </MenuLink>
        </Box>
        <div className="desktop:hidden flex justify-center items-center">
          <IconButton Icon={Menu2} className="w-8 h-8" />
        </div>
      </Box>
      <nav className="max-desktop:hidden desktop:absolute desktop:top-1/2 desktop:left-1/2 desktop:-translate-x-1/2 desktop:-translate-y-1/2 large-desktop:gap-14 desktop:gap-6 flex items-center justify-center">
        <MenuLink href="#" prefetch={false} className="large-desktop:w-14.25">
          Pet ID
        </MenuLink>
        <MenuLink
          href={`${prefixHref}/pets`}
          prefetch={false}
          className="max-large-desktop:w-18.5"
        >
          Find a Pet
        </MenuLink>
        <MenuLink href={`${prefixHref}/services`} prefetch={false}>
          Services
        </MenuLink>
        <MenuLink
          href="#"
          prefetch={false}
          className="large-desktop:w-31 tracking-[0.1px]"
        >
          Learning Hub
        </MenuLink>
      </nav>
      {!userProfile && <HeaderDefaultActions prefixHref={prefixHref} />}
      {userProfile?.type === "customer" && <HeaderCustomerActions />}
      {(userProfile?.type === "breeder" || userProfile?.type === "service") && (
        <HeaderBreederActions avatar={userProfile.avatar_public_id} />
      )}
    </Container>
  </header>
);
