import Link from "next/link";

import {
  AttachmentImage,
  Box,
  CircleButton,
  Container,
  Divider,
  Logo,
  MenuLink,
  Typography,
} from "@portal/ui/atoms";

import { FooterData } from "@portal/market/models";

export interface FooterProps {
  data: FooterData;
  logoHref?: string;
}

export const Footer = ({
  data: { social_links, link_blocks, contact_info, copyright_info },
  logoHref = "/",
}: FooterProps) => (
  <footer className="bg-bg-light desktop:rounded-t-[64px] tablet:rounded-t-[48px] max-tablet:rounded-t-3xl">
    <Container className="large-desktop:gap-8 large-desktop:py-8 py-6 tablet:gap-6 max-tablet:pb-10 max-tablet:px-4 max-tablet:gap-4">
      <div className="flex justify-between max-tablet:flex-col max-tablet:gap-8">
        <Box className="large-desktop:max-w-95 desktop:max-w-108 tablet:max-w-60 gap-11.75 max-tablet:gap-4 w-full large-desktop:mr-auto max-tablet:items-center">
          <div className="flex">
            <Link href={logoHref} className="max-w-fit">
              <Logo
                orientation="horizontal"
                className="desktop:w-66.75 desktop:h-15 tablet:w-42.25 tablet:h-9.5 max-tablet:w-71.25 max-tablet:h-16"
              />
            </Link>
          </div>
          <Box className="flex-row gap-4 tablet:max-desktop:w-52.5 flex-wrap">
            {social_links.map((link) => (
              <CircleButton key={link.icon_id} variant="primary" transparent>
                <AttachmentImage
                  imageId={link.icon_id}
                  alt="Social icon"
                  width={24}
                  height={24}
                />
              </CircleButton>
            ))}
          </Box>
        </Box>
        <div className="flex min-w-0 large-desktop:gap-15 tablet:flex-wrap desktop:gap-8 tablet:justify-between tablet:row-gap-8 max-tablet:gap-8 max-tablet:flex-col">
          {link_blocks.map((block, parentIndex) => (
            <Box
              className="large-desktop:gap-6 desktop:gap-5 max-desktop:gap-4 large-desktop:w-52.5 desktop:w-86.25 tablet:w-60 max-tablet:items-center"
              key={`box-${parentIndex}`}
            >
              <Typography className="large-desktop:text-20 text-18 text-text-default font-bold">
                {block.title}
              </Typography>
              <nav className="flex flex-col gap-4 max-tablet:items-center">
                {block.links.map((link, index) => (
                  <MenuLink
                    key={`menu-link-${parentIndex}-${index}`}
                    href={link.url}
                  >
                    {link.name}
                  </MenuLink>
                ))}
              </nav>
            </Box>
          ))}
          <Box className="large-desktop:gap-6 desktop:gap-5 max-desktop:gap-4 large-desktop:w-83.25 large-desktop:ml-12 desktop:w-86.25 tablet:w-60 max-tablet:items-center">
            <Typography className="large-desktop:text-20 text-18 text-text-default font-bold">
              Contact Info
            </Typography>
            <Box className="gap-2">
              {contact_info.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="large-desktop:text-18 text-text-secondary max-large-desktop:text-16 font-semibold whitespace-pre-line max-large-desktop:-translate-y-px word-break-all max-tablet:text-center"
                >
                  {line}
                </p>
              ))}
            </Box>
          </Box>
        </div>
      </div>
      <Divider />
      <p className="large-desktop:text-20 tablet:text-18 max-tablet:text-16 text-text-default text-center font-semibold max-tablet:-translate-y-px">
        {copyright_info}
      </p>
    </Container>
  </footer>
);

export default Footer;
