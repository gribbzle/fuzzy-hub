"use client";

import { AdminListTableFrame } from "../../_components/AdminListTableFrame";
import { ControlledImagePickerField } from "../../_components/ui/controlled-image-picker-field";
import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { useWidgetFormContext } from "../_hooks/useWidgetFormContext";
import type { WidgetFormValues } from "../_utils/widgetFormTypes";
import { LabeledTextarea, UploadButton } from "./WidgetFormPrimitives";
import {
  type BackgroundImageField,
  backgroundImageConfigs,
} from "./WidgetFormShared";

interface HeroSectionContentFieldsProps {
  selectedBackgroundImages:
    | Record<BackgroundImageField, File | null>
    | undefined;
  selectedImagePreviewUrls: Record<BackgroundImageField, string | null>;
  onBackgroundImageChange: (
    key: BackgroundImageField,
    file: File | null,
  ) => void;
  getCurrentImageUrl?: (key: BackgroundImageField) => string | null;
}

export const HeroSectionContentFields = ({
  selectedBackgroundImages,
  selectedImagePreviewUrls,
  onBackgroundImageChange,
  getCurrentImageUrl,
}: HeroSectionContentFieldsProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useWidgetFormContext();
  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 p-3">
      <p className="text-sm font-medium text-zinc-900">Hero section content</p>
      <FormField
        id="hero-title"
        label="Title"
        errorMessage={errors.hero_section?.title?.message}
      >
        <Input
          id="hero-title"
          type="text"
          {...register("hero_section.title", {
            required: "Title is required",
          })}
        />
      </FormField>
      <LabeledTextarea
        id="hero-subtitle"
        label="Subtitle"
        inputProps={register("hero_section.subtitle", {
          required: "Subtitle is required",
        })}
        errorMessage={errors.hero_section?.subtitle?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="hero-cta-text"
          label="CTA text"
          errorMessage={errors.hero_section?.cta_text?.message}
        >
          <Input
            id="hero-cta-text"
            type="text"
            {...register("hero_section.cta_text", {
              required: "CTA text is required",
            })}
          />
        </FormField>
        <FormField
          id="hero-cta-link"
          label="CTA link"
          errorMessage={errors.hero_section?.cta_link?.message}
        >
          <Input
            id="hero-cta-link"
            type="text"
            {...register("hero_section.cta_link", {
              required: "CTA link is required",
            })}
          />
        </FormField>
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-zinc-700">
          Responsive background images
        </p>
        <AdminListTableFrame className="bg-transparent">
          <div className="grid grid-cols-4 border-b border-zinc-200 bg-zinc-50">
            {backgroundImageConfigs.map(({ key, label, resolution }) => (
              <div
                key={`header-${key}`}
                className="border-r border-zinc-200 px-2 py-1 last:border-r-0"
              >
                <p className="text-xs font-medium text-zinc-700">{label}</p>
                <p className="text-[11px] text-zinc-500">{resolution}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4">
            {backgroundImageConfigs.map(({ key, label }) => {
              const currentImageUrl = getCurrentImageUrl?.(key) ?? null;
              const previewUrl = selectedImagePreviewUrls[key];

              return (
                <div
                  key={key}
                  className="space-y-1 border-r border-zinc-200 p-2 last:border-r-0"
                >
                  <ControlledImagePickerField<WidgetFormValues>
                    id={`hero-${key}`}
                    label={label}
                    control={control}
                    name={`hero_section.background_images.${key}`}
                    labelClassName="sr-only"
                    className="space-y-1"
                    inputClassName="sr-only"
                    onFilePicked={(file) => {
                      onBackgroundImageChange(key, file);
                    }}
                    preview={{
                      selectedUrl: previewUrl,
                      currentUrl: currentImageUrl,
                      className:
                        "h-16 w-full rounded border border-zinc-200 object-contain",
                      emptyClassName:
                        "h-16 w-full rounded border border-dashed border-zinc-200 bg-zinc-50",
                    }}
                  >
                    <div className="flex justify-center">
                      <UploadButton inputId={`hero-${key}`} label={label} />
                    </div>
                    {selectedBackgroundImages?.[key] ? (
                      <p className="truncate text-[11px] text-zinc-500">
                        {selectedBackgroundImages[key]?.name}
                      </p>
                    ) : null}
                  </ControlledImagePickerField>
                </div>
              );
            })}
          </div>
        </AdminListTableFrame>
      </div>
    </div>
  );
};
