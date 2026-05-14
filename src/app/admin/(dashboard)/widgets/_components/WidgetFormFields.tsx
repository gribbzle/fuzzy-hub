"use client";

import { Controller } from "react-hook-form";

import { Switch } from "../../_components/ui/switch";
import { useWidgetFormContext } from "../_hooks/useWidgetFormContext";
import { AboutUsContentFields } from "./AboutUsContentFields";
import { ContactUsContentFields } from "./ContactUsContentFields";
import { FooterContentFields } from "./FooterContentFields";
import { HeroSectionContentFields } from "./HeroSectionContentFields";
import { HeroSliderContentFields } from "./HeroSliderContentFields";
import {
  type BackgroundImageField,
  backgroundImageConfigs,
  emptyBackgroundImages,
} from "./WidgetFormShared";
import { WidgetTypeTabsField } from "./WidgetTypeTabsField";

export {
  backgroundImageConfigs,
  emptyBackgroundImages,
  HeroSectionContentFields,
  HeroSliderContentFields,
  AboutUsContentFields,
  ContactUsContentFields,
  FooterContentFields,
};
export type { BackgroundImageField };

interface WidgetTypeControllerFieldProps {
  disabled?: boolean;
}

export const WidgetActiveSwitchField = () => {
  const { control } = useWidgetFormContext();
  return (
    <Controller
      name="is_active"
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
          <Switch
            checked={Boolean(field.value)}
            onCheckedChange={field.onChange}
            aria-label="Is active"
          />
          <p className="text-sm font-medium text-zinc-700">Is active</p>
        </div>
      )}
    />
  );
};

export const WidgetTypeControllerField = ({
  disabled = false,
}: WidgetTypeControllerFieldProps) => {
  const { control } = useWidgetFormContext();
  return (
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <WidgetTypeTabsField
          value={field.value}
          onChange={field.onChange}
          disabled={disabled}
        />
      )}
    />
  );
};
