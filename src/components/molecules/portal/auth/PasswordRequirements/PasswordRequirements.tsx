"use client";

import { twMerge } from "@utils";

import { Box } from "@portal/ui/atoms";

interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

const passwordRules: PasswordRule[] = [
  {
    label: "Be at least 8 characters long",
    test: (p) => p.length >= 8 && p.length <= 25,
  },
  {
    label: "Include both lowercase (a–z) and uppercase (A–Z) letters",
    test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p),
  },
  {
    label: "Include at least one number (0–9) and symbol",
    test: (p) => /[0-9]/.test(p) && /[!@#$%^&*(),.?":{}|<>]/.test(p),
  },
];

export interface PasswordRequirementsProps {
  password?: string;
  title: string;
}

export const PasswordRequirements = ({
  password = "",
  title,
}: PasswordRequirementsProps) => (
  <Box className="gap-2">
    <p className="text-14 text-text-default font-bold">{title}</p>
    {passwordRules.map((rule, i) => {
      const passed = password.length > 0 && rule.test(password);

      return (
        <p
          key={i}
          className={twMerge(
            "text-14 font-semibold text-text-secondary translate-x-px",
            passed && "text-aqua-green",
          )}
        >
          ✓&nbsp;{rule.label}
        </p>
      );
    })}
  </Box>
);
