"use client";

import { useCallback, useMemo, useState } from "react";

import { useAdminWidgetQuery } from "@/app/admin/(dashboard)/_hooks/useAdminWidgetQuery";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

import type { BackgroundImageField } from "../_components/WidgetFormFields";
import type { WidgetFormFieldsBranchProps } from "../_components/WidgetFormFieldsBranch";
import { isWidgetType } from "../_components/WidgetTypeTabsField";
import {
  mapLoadedApiDataToWidgetFormValues,
  parseExistingBackgroundImageIds,
} from "../_utils/widgetFormApiMap";
import {
  buildWidgetFormEditImageUrlGetters,
  validateAboutUsImageCreate,
  validateAboutUsImageEdit,
  validateFooterSocialLinkImageCreate,
  validateFooterSocialLinkImageEdit,
  validateHeroSliderSlideImageCreate,
  validateHeroSliderSlideImageEdit,
} from "../_utils/widgetFormBranchProps";
import {
  type WidgetFormValues,
  createDefaultWidgetFormValues,
  createEmptyHeroSliderSlide,
} from "../_utils/widgetFormTypes";
import { useWidgetFormSubmit } from "./useWidgetFormSubmit";
import { useWidgetImagePreviews } from "./useWidgetImagePreviews";

export type UseAdminWidgetFormOptions =
  | { mode: "create" }
  | { mode: "edit"; widgetId: string };

export function useAdminWidgetForm(options: UseAdminWidgetFormOptions) {
  const isEdit = options.mode === "edit";
  const widgetId = isEdit ? options.widgetId : "";

  const { data, error: loadError, isLoading } = useAdminWidgetQuery(widgetId);
  const loadedData = data?.data.data as Record<string, unknown> | undefined;
  const defaultValues = useMemo(() => createDefaultWidgetFormValues(), []);
  const editValues = useMemo(() => {
    if (!isEdit) {
      return undefined;
    }

    const loadedType = data?.data.type;
    if (!loadedType || !isWidgetType(loadedType)) {
      return undefined;
    }

    return mapLoadedApiDataToWidgetFormValues(
      loadedType,
      Boolean(data?.data.is_active),
      loadedData,
    );
  }, [data?.data.is_active, data?.data.type, isEdit, loadedData]);

  const form = useForm<WidgetFormValues>({
    defaultValues,
    values: editValues,
  });

  const {
    clearErrors,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting },
  } = form;

  const {
    fields: heroSliderSlideFields,
    append: appendHeroSliderSlide,
    remove: removeHeroSliderSlide,
  } = useFieldArray({
    control,
    name: "hero_slider.slides",
  });

  const selectedType = useWatch({ control, name: "type" });
  const selectedBackgroundImages = useWatch({
    control,
    name: "hero_section.background_images",
  });
  const heroSliderSlides = useWatch({ control, name: "hero_slider.slides" });
  const existingAboutUsImageId = useWatch({
    control,
    name: "about_us.existing_image_id",
  });
  const footerSocialLinks = useWatch({ control, name: "footer.social_links" });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    selectedImagePreviewUrls,
    aboutUsImagePreviewUrl,
    heroSliderImagePreviewUrls,
    footerSocialImagePreviewUrls,
    setHeroSectionPreview,
    setAboutUsPreview,
    setHeroSliderPreview,
    setFooterSocialPreview,
    removeHeroSliderPreviewAt,
    removeFooterSocialPreviewAt,
  } = useWidgetImagePreviews();

  const existingBackgroundImageIds: Record<
    BackgroundImageField,
    string | null
  > = useMemo(() => parseExistingBackgroundImageIds(loadedData), [loadedData]);

  const onSubmit = useWidgetFormSubmit({
    mode: isEdit ? "edit" : "create",
    widgetId: isEdit ? widgetId : undefined,
    existingBackgroundImageIds: isEdit ? existingBackgroundImageIds : undefined,
    clearErrors,
    setError,
    setSubmitError,
  });

  const handleRemoveHeroSliderSlide = useCallback(
    (index: number) => {
      removeHeroSliderPreviewAt(index);
      removeHeroSliderSlide(index);
    },
    [removeHeroSliderPreviewAt, removeHeroSliderSlide],
  );

  const branchProps: WidgetFormFieldsBranchProps = {
    selectedType,
    heroSliderSlideFields,
    onAddHeroSliderSlide: () =>
      appendHeroSliderSlide(createEmptyHeroSliderSlide()),
    onRemoveHeroSliderSlide: handleRemoveHeroSliderSlide,
    selectedBackgroundImages,
    selectedImagePreviewUrls,
    onHeroBackgroundImageChange: (key, file) => {
      setValue(`hero_section.background_images.${key}`, file, {
        shouldDirty: true,
      });
      setHeroSectionPreview(key, file);
    },
    heroSliderImagePreviewUrls,
    onHeroSliderSlideImageChange: (index, file) => {
      setValue(`hero_slider.slides.${index}.image`, file, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setHeroSliderPreview(index, file);
    },
    validateHeroSliderSlideImage: isEdit
      ? (index, file) =>
          validateHeroSliderSlideImageEdit(index, file, heroSliderSlides)
      : validateHeroSliderSlideImageCreate,
    aboutUsImagePreviewUrl,
    onAboutUsImageChange: (file) => {
      setValue("about_us.image", file, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setAboutUsPreview(file);
    },
    validateAboutUsImage: isEdit
      ? (file) => validateAboutUsImageEdit(file, existingAboutUsImageId)
      : validateAboutUsImageCreate,
    footerSocialImagePreviewUrls,
    onFooterSocialLinkImageChange: (index, file) => {
      setValue(`footer.social_links.${index}.icon`, file, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setFooterSocialPreview(index, file);
    },
    onFooterSocialLinkRemove: removeFooterSocialPreviewAt,
    validateFooterSocialLinkImage: isEdit
      ? (index, file) =>
          validateFooterSocialLinkImageEdit(index, file, footerSocialLinks)
      : validateFooterSocialLinkImageCreate,
    ...(isEdit
      ? buildWidgetFormEditImageUrlGetters(
          existingBackgroundImageIds,
          heroSliderSlides,
          existingAboutUsImageId,
          footerSocialLinks,
        )
      : {}),
  };

  return {
    form,
    isSubmitting,
    submitError,
    handleSubmit,
    onSubmit,
    branchProps,
    loadError: isEdit ? loadError : undefined,
    isLoading: isEdit ? isLoading : false,
  };
}
