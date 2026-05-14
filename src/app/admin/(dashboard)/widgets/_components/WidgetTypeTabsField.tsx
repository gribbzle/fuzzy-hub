"use client";

import { useId } from "react";

import { WidgetType } from "@/app/admin/(dashboard)/_models";

import { TabSelect } from "../../_components/ui/tab-select";

export const WIDGET_TYPE_OPTIONS: WidgetType[] = [
  "hero_section",
  "hero_slider",
  "about_us",
  "contact_us",
  "footer",
];

export const isWidgetType = (value: string): value is WidgetType =>
  WIDGET_TYPE_OPTIONS.includes(value as WidgetType);

interface WidgetTypeTabsFieldProps {
  value: WidgetType;
  onChange: (next: WidgetType) => void;
  disabled?: boolean;
}

export const WidgetTypeTabsField = ({
  value,
  onChange,
  disabled = false,
}: WidgetTypeTabsFieldProps) => {
  const labelId = useId();

  return (
    <div className="space-y-2">
      <p id={labelId} className="text-sm font-medium text-zinc-900">
        Widget type
      </p>
      <TabSelect
        ariaLabelledBy={labelId}
        value={value}
        disabled={disabled}
        onValueChange={(next) => {
          if (isWidgetType(next)) {
            onChange(next);
          }
        }}
        options={WIDGET_TYPE_OPTIONS.map((option) => ({
          value: option,
          label: option,
        }))}
      />
    </div>
  );
};
