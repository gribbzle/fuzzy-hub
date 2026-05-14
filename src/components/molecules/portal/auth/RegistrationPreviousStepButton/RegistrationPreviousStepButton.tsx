"use client";

import { MouseEvent, useCallback } from "react";

import { Button } from "@portal/ui/atoms";

interface RegistrationPreviousStepButtonProps {
  onPrevStep?: () => void;
}

export const RegistrationPreviousStepButton = ({
  onPrevStep,
}: RegistrationPreviousStepButtonProps) => {
  const handlePrevStep = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      onPrevStep?.();
    },
    [onPrevStep],
  );

  return (
    <Button
      variant="secondary"
      size="medium"
      fullWidth
      onClick={handlePrevStep}
    >
      Back
    </Button>
  );
};
