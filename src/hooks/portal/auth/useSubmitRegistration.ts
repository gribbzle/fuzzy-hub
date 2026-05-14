import { useCallback } from "react";

import { RegistrationSessionResponse } from "@portal/auth/models";

export const useSubmitRegistration = <TFormValues>({
  queryFn,
  onSuccess,
  onNextStep,
}: {
  onNextStep?: () => void;
  onSuccess?: (
    variables: TFormValues,
    data: RegistrationSessionResponse,
  ) => void;
  queryFn: (variables: TFormValues) => Promise<RegistrationSessionResponse>;
}) => {
  return useCallback(
    async (variables: TFormValues) => {
      try {
        const response = await queryFn(variables);

        onSuccess?.(variables, response);

        if (!response.error) {
          onNextStep?.();
        }
      } catch (e: unknown) {
        console.error(e);
      }
    },
    [queryFn, onSuccess, onNextStep],
  );
};
