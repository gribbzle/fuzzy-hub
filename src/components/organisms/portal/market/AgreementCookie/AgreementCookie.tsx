"use client";

import { useCallback, useEffect, useState } from "react";

import { Button, Divider, Typography } from "@portal/ui/atoms";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";

export interface AgreementCookieProps {
  title: string;
  description: string;
  acceptLabel: string;
  declineLabel: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export const AgreementCookie = ({
  title,
  description,
  acceptLabel,
  declineLabel,
  onAccept,
  onDecline,
}: AgreementCookieProps) => {
  const [isAccepted, setIsAccepted] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!accepted) {
      requestAnimationFrame(() => {
        setIsAccepted(false);
      });
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsAccepted(true);
    onAccept?.();
  }, [onAccept]);

  if (isAccepted) {
    return null;
  }

  return (
    <section className="sticky bottom-0 z-100 flex w-full justify-center bg-white px-30 py-11">
      <div className="flex w-full max-w-420 flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Typography variant="h1">{title}</Typography>
          <p className="text-24 text-text-secondary font-semibold">
            {description}
          </p>
        </div>
        <Divider />
        <div className="flex w-full justify-end gap-6">
          <Button variant="secondary" size="large" onClick={onDecline}>
            {declineLabel}
          </Button>
          <Button variant="primary" size="large" onClick={handleAccept}>
            {acceptLabel}
          </Button>
        </div>
      </div>
    </section>
  );
};
