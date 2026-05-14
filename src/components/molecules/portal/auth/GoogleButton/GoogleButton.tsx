"use client";

import { useGoogleLogin } from "@react-oauth/google";

import { CircleButton } from "@portal/ui/atoms";
import { Google as GoogleIcon } from "@portal/ui/icons";

interface GoogleButtonProps {
  onSuccess?: (
    provider: "google" | "meta",
    accessToken: string,
  ) => Promise<void>;
}

const GoogleButton = ({ onSuccess }: GoogleButtonProps) => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      await onSuccess?.("google", credentialResponse.access_token);
    },
  });

  return (
    <CircleButton size="large" variant="primary" onClick={googleLogin}>
      <GoogleIcon width={24} height={24} />
    </CircleButton>
  );
};

export default GoogleButton;
