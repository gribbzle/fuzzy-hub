"use client";

import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { useWidgetFormContext } from "../_hooks/useWidgetFormContext";
import {
  ControlledImageFileField,
  LabeledTextarea,
} from "./WidgetFormPrimitives";

interface AboutUsContentFieldsProps {
  aboutImagePreviewUrl: string | null;
  onImageChange: (file: File | null) => void;
  getCurrentImageUrl?: () => string | null;
  validateImage: (file: File | null) => true | string;
}

export const AboutUsContentFields = ({
  aboutImagePreviewUrl,
  onImageChange,
  getCurrentImageUrl,
  validateImage,
}: AboutUsContentFieldsProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useWidgetFormContext();
  const currentImageUrl = getCurrentImageUrl?.() ?? null;

  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 p-3">
      <p className="text-sm font-medium text-zinc-900">About us content</p>
      <FormField
        id="about-us-title"
        label="Title"
        errorMessage={errors.about_us?.title?.message}
      >
        <Input
          id="about-us-title"
          type="text"
          {...register("about_us.title", {
            required: "Title is required",
          })}
        />
      </FormField>
      <LabeledTextarea
        id="about-us-content"
        label="Content"
        rows={8}
        inputProps={register("about_us.content", {
          required: "Content is required",
        })}
        errorMessage={errors.about_us?.content?.message}
      />
      <ControlledImageFileField
        id="about-us-image"
        label="Image"
        control={control}
        name="about_us.image"
        rules={{ validate: validateImage }}
        onFilePicked={onImageChange}
        preview={{
          selectedUrl: aboutImagePreviewUrl,
          currentUrl: currentImageUrl,
          className:
            "h-32 w-full rounded border border-zinc-200 bg-zinc-50 object-contain p-1",
          emptyClassName:
            "h-32 w-full rounded border border-dashed border-zinc-200 bg-zinc-50",
        }}
        errorMessage={errors.about_us?.image?.message}
      />
    </div>
  );
};
