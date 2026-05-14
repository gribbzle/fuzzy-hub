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
    <Paper className={twMerge("flex flex-col gap-8 p-8", className)}>
      <Typography variant="h3">My profile</Typography>
      <div className="flex items-center gap-6">
        <Avatar alt="" className="w-25 h-25" src={profile?.avatarUrl} />
        <Box className="gap-4">
          <div className="flex gap-2">
            <Button variant="primary" size="mini">
              Change image
            </Button>
            <Button variant="secondary" size="mini">
              Remove image
            </Button>
          </div>
          <p className="text-12 font-semibold text-[#757577]">
            We support PNGs, JPEGs and GIFs under 2 MB
          </p>
        </Box>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        <FormControl className="col-span-2">
          <InputLabel>Full Name</InputLabel>
          <TextInput name="fullName" required />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <TextInput name="email" type="email" required />
        </FormControl>
        <FormControl>
          <InputLabel>Phone number</InputLabel>
          <TextInput name="phoneNumber" type="tel" required />
        </FormControl>
        <Button
          type="submit"
          variant="primary"
          size="medium"
          className="max-w-52"
          fullWidth
        >
          Save changes
        </Button>
      </form>
    </Paper>
  );
};
