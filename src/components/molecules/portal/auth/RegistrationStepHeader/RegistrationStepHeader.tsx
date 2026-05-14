import { useMemo } from "react";

import { useStateMachine } from "little-state-machine";

import { Box, Divider, Typography } from "@portal/ui/atoms";

interface RegistrationStepHeaderProps {
  currentStep: number;
  title: string;
  subtitle: string;
}

export const RegistrationStepHeader = ({
  currentStep,
  title,
  subtitle,
}: RegistrationStepHeaderProps) => {
  const {
    state: { registration: state },
  } = useStateMachine();

  const totalSteps = useMemo(() => {
    if (state.profile_type === "customer") {
      return 4;
    }

    return 5;
  }, [state.profile_type]);

  return (
    <Box className="large-desktop:gap-3 tablet:gap-2 w-full items-center max-tablet:items-stretch">
      <div className="flex w-full flex-col gap-3 tablet:hidden">
        <div className="flex w-full items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Typography variant="h2" className="text-left leading-8">
              Registration
            </Typography>
            <p className="text-16 font-bold text-text-default text-left max-tablet:-translate-y-px">
              {title}
            </p>
          </div>
          <p className="text-16 shrink-0 font-semibold text-text-secondary whitespace-nowrap max-tablet:-translate-y-px">
            Step {currentStep}/{totalSteps}
          </p>
        </div>
        <Divider />
        <p className="text-16 font-semibold text-text-secondary text-left max-tablet:-translate-y-px">
          {subtitle}
        </p>
      </div>
      <div className="hidden w-full flex-col items-center tablet:flex tablet:gap-2 large-desktop:gap-3">
        <p className="text-18 text-text-secondary font-semibold text-center">
          Step {currentStep}/{totalSteps}
        </p>
        <Typography variant="h2" className="text-center">
          Registration
        </Typography>
        <p className="text-18 text-text-default font-bold text-center">
          {title}
        </p>
        <p className="text-18 text-text-secondary font-semibold text-center">
          {subtitle}
        </p>
      </div>
    </Box>
  );
};
