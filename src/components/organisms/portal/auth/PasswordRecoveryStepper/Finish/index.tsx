"use client";

import { useEffect } from "react";

import Image from "next/image";

import { clearPasswordRecoverySession } from "@store/actions";
import { useStateMachine } from "little-state-machine";

import { Box, ButtonLink, Typography } from "@portal/ui/atoms";

import { TemplateAuthContent } from "@portal/auth/ui/templates";

const Finish = () => {
  const { actions } = useStateMachine({
    actions: {
      clearPasswordRecoverySession,
    },
  });

  useEffect(() => {
    actions.clearPasswordRecoverySession();
  }, [actions]);

  return (
    <TemplateAuthContent className="gap-8 large-desktop:gap-8 desktop:max-w-105 max-desktop:py-50 max-tablet:py-25">
      <Box className="items-center gap-4">
        <Image
          src="/images/password-recovery/finish-success.png"
          alt=""
          width={200}
          height={200}
          className="pointer-events-none h-25 w-25"
          loading="eager"
        />
        <Typography className="font-fredoka text-center font-medium tablet:text-44 max-tablet:text-28">
          All set!
        </Typography>
        <p className="text-18 text-text-default text-center font-medium max-tablet:text-14 max-tablet:font-semibold">
          Your password has been successfully reset.
          <br />
          You can now log in with your email and password.
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
};

export default Finish;
