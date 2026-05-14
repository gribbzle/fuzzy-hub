import Image from "next/image";

import { Box, ButtonLink, Typography } from "@portal/ui/atoms";

import { TemplateAuthContent } from "@portal/auth/ui/templates";

const RegistrationFinish = () => (
  <TemplateAuthContent className="gap-8 large-desktop:gap-8 desktop:max-w-105 max-desktop:py-50 max-tablet:py-25">
    <Box className="items-center gap-4">
      <Image
        src="/images/registration/customer-finish.png"
        alt=""
        width={200}
        height={200}
        className="pointer-events-none h-25 w-25"
        loading="eager"
      />
      <Typography className="font-fredoka text-center font-medium tablet:text-44 max-tablet:text-28">
        You are done!
      </Typography>
      <p className="text-18 text-text-default text-center font-medium max-tablet:text-14 max-tablet:font-semibold">
        Congratulations!&nbsp;
        <br />
        You&#39;ve successfully registered.&nbsp;
        <br />
        You can now log in using your email and password.
      </p>
    </Box>
    <ButtonLink
      variant="primary"
      size="medium"
      className="tablet:max-w-95 tablet:mx-auto"
      fullWidth
      href="./login"
    >
      Log In
    </ButtonLink>
  </TemplateAuthContent>
);

export default RegistrationFinish;
