"use client";

import { FormEvent } from "react";

import { twMerge } from "@utils";

import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  Paper,
  TextInput,
  Typography,
} from "@portal/ui/atoms";

interface ProfileForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl?: string;
}

export interface ProfileSettingsProps {
  profile: ProfileForm;
  className?: string;
}

export const ProfileSettings = ({
  profile,
  className,
}: ProfileSettingsProps) => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Paper
      className={twMerge(
        "border border-border-light rounded-3xl p-8 flex flex-col gap-8",
        className,
      )}
    >
      <Typography
        variant="h3"
        className="font-fredoka text-24 font-medium text-text-default"
      >
        My profile
      </Typography>
      <div className="flex items-center gap-6">
        <Avatar className="size-25" src={profile?.avatarUrl} />
        <Box className="gap-4">
          <div className="flex gap-2">
            <Button className="btn-primary btn-mini px-3 max-w-31.75 w-full">
              Upload image
            </Button>
            <Button className="btn-secondary btn-mini px-2 max-w-31.75 w-full">
              Remove image
            </Button>
          </div>
          <p className="text-[12px] font-semibold text-text-secondary">
            We support PNGs, JPEGs and GIFs under 2 MB
          </p>
        </Box>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        <FormControl className="col-span-2">
          <InputLabel className="text-[12px] font-semibold text-text-secondary">
            Full Name
          </InputLabel>
          <TextInput
            name="fullName"
            required
          />
        </FormControl>
        <FormControl>
          <InputLabel className="text-[12px] font-semibold text-text-secondary">
            Email
          </InputLabel>
          <TextInput
            name="email"
            type="email"
            required
          />
        </FormControl>
        <FormControl>
          <InputLabel className="text-[12px] font-semibold text-text-secondary">
            Phone number
          </InputLabel>
          <TextInput
            name="phoneNumber"
            type="tel"
            required
          />
        </FormControl>
        <Button
          type="submit"
          className="btn-primary btn-medium max-w-50 w-full"
        >
          Save changes
        </Button>
      </form>
    </Paper>
  );
};
