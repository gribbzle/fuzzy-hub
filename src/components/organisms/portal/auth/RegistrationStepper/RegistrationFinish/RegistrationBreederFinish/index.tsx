import Image from "next/image";

import { Box, ButtonLink, Typography } from "@portal/ui/atoms";

import { TemplateAuthContent } from "@portal/auth/ui/templates";

const RegistrationBreederFinish = () => (
  <TemplateAuthContent className="gap-8! max-desktop:pt-50! max-tablet:pt-25!">
    <Box className="items-center gap-4">
      <Image
        src="/images/registration/breeder-finish.png"
        alt="Pending approval"
        width={200}
        height={200}
        className="pointer-events-none h-25 w-25"
      />
      <Typography
        variant="h2"
        className="text-center tablet:text-44 max-tablet:text-28 max-tablet:w-75"
      >
        Pending Admin Approval
      </Typography>
      <p className="text-18 text-text-default text-center font-medium max-tablet:text-14 max-tablet:font-semibold">
        Thanks for registering as a Breeder / Shelter!&nbsp;
        <br />
        We&apos;re currently reviewing your details.&nbsp;
        <br />
        Our average approval time is{" "}
        <span className="font-bold max-tablet:font-extrabold">
          1–2 business days.
        </span>
        &nbsp;
        <br />
        You&apos;ll receive an email notification once your account is approved
        or if we need any additional information.
      </p>
    </Box>
    <ButtonLink
      variant="primary"
      size="medium"
      href="./"
      fullWidth
      className="max-w-95 mx-auto"
    >
      Go to Home page
    </ButtonLink>
  </TemplateAuthContent>
);

export default RegistrationBreederFinish;
