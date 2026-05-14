"use client";

import React, { useEffect, useState } from "react";

import { Link } from "@portal/ui/atoms";

interface ResendTimerProps {
  initialSeconds?: number;
  textPrefix?: string;
  onResend?: () => Promise<void>;
}

export const ResendTimer: React.FC<ResendTimerProps> = ({
  initialSeconds = 300, // 5 minutes default
  textPrefix = "New code will be available in",
  onResend,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSeconds(initialSeconds);
    onResend?.();
  };

  if (seconds <= 0) {
    return (
      <Link href="#" onClick={handleResend} className="text-18">
        Resend code
      </Link>
    );
  }

  return (
    <span className="text-16 text-text-default font-medium max-tablet:-translate-y-px">
      {textPrefix} {formatTime(seconds)}
    </span>
  );
};
