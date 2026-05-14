"use client";

import { twMerge } from "@utils";

import {
  Box,
  Button,
  CircleButton,
  Divider,
  Paper,
  Toggle,
  Typography,
} from "@portal/ui/atoms";
import { Menu } from "@portal/ui/icons";

interface AccountSecurityProps {
  className?: string;
}

export const AccountSecurity = ({ className }: AccountSecurityProps) => (
  <Paper className={twMerge("flex flex-col gap-8 p-8", className)}>
    <Typography variant="h3">Account Security</Typography>
    <div className="flex w-full items-center justify-between">
      <Box className="gap-2">
        <span className="text-18 text-text-default font-medium">
          2-Step Verification
        </span>
        <span className="text-12 font-semibold text-[#757577]">
          Add an additional layer of security to your account during login
        </span>
      </Box>
      <Toggle checked={false} />
    </div>
    <Divider />
    <div className="flex w-full items-center justify-between">
      <Box className="gap-2">
        <span className="text-18 text-text-default font-medium">
          Password management
        </span>
        <span className="text-12 font-semibold text-[#757577]">
          Create a new, strong password to protect your account
        </span>
      </Box>
      <Button variant="secondary" size="mini">
        Change Password
      </Button>
    </div>
    <Divider />
    <div className="flex w-full items-center justify-between">
      <Box className="gap-2">
        <span className="text-text-default text-18 font-medium">
          Profile Management
        </span>
        <span className="text-12 font-semibold text-[#757577]">
          You&#39;ve been with us since January 12, 2026
        </span>
      </Box>
      <CircleButton variant="primary" size="mini">
        <Menu />
      </CircleButton>
    </div>
  </Paper>
);
