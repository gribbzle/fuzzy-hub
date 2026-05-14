"use client";

import { useMemo, useState } from "react";

import { useWatch } from "react-hook-form";

import { Button } from "../../_components/ui/button";
import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { expandedIndexAfterRemovingExpandedItem } from "../../_utils/expandedPanelIndex";
import { useWidgetFormContext } from "../_hooks/useWidgetFormContext";
import {
  ControlledImageFileField,
  LabeledTextarea,
} from "./WidgetFormPrimitives";

interface HeroSliderContentFieldsProps {
  heroSliderSlideFields: Array<{ id: string }>;
  slideImagePreviewUrls: (string | null)[];
  onAddSlide: () => void;
  onRemoveSlide: (index: number) => void;
  onSlideImageChange: (index: number, file: File | null) => void;
  getSlideCurrentImageUrl?: (index: number) => string | null;
  validateSlideImage: (index: number, file: File | null) => true | string;
}

export const HeroSliderContentFields = ({
  heroSliderSlideFields,
  slideImagePreviewUrls,
  onAddSlide,
  onRemoveSlide,
  onSlideImageChange,
  getSlideCurrentImageUrl,
  validateSlideImage,
}: HeroSliderContentFieldsProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useWidgetFormContext();
  const [expandedSlideIndex, setExpandedSlideIndex] = useState<number | null>(
    null,
  );
  const slides = useWatch({ control, name: "hero_slider.slides" });

  const resolvedExpandedSlideIndex = useMemo(() => {
    if (heroSliderSlideFields.length === 0) {
      return null;
    }
    if (expandedSlideIndex === null) {
      return null;
    }
    return Math.min(expandedSlideIndex, heroSliderSlideFields.length - 1);
  }, [heroSliderSlideFields.length, expandedSlideIndex]);

  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-zinc-900">
          Hero slider content
          <span className="ml-1 text-xs font-normal text-zinc-500">
            ({heroSliderSlideFields.length} slides)
          </span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 px-2"
          onClick={() => {
            setExpandedSlideIndex(heroSliderSlideFields.length);
            onAddSlide();
          }}
        >
          Add slide
        </Button>
      </div>

      <p className="text-xs text-zinc-500">
        Each slide uses one image for all breakpoints.
      </p>

      <div className="space-y-3">
        {heroSliderSlideFields.map((slideField, index) => {
          const currentImageUrl = getSlideCurrentImageUrl?.(index) ?? null;
          const previewUrl = slideImagePreviewUrls[index];
          const isExpanded = resolvedExpandedSlideIndex === index;
          const slideTitle = slides?.[index]?.title?.trim();

          return (
            <div
              key={slideField.id}
              className="space-y-2 rounded-md border border-zinc-200 bg-zinc-50 p-2.5"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2 rounded px-1 py-1 text-left hover:bg-zinc-100"
                  onClick={() =>
                    setExpandedSlideIndex(isExpanded ? null : index)
                  }
                  aria-expanded={isExpanded}
                  aria-controls={`hero-slide-panel-${index}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={`h-4 w-4 text-zinc-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  >
                    <path
                      d="m9 6 6 6-6 6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="truncate text-sm font-medium text-zinc-900">
                    Slide {index + 1}
                    {slideTitle ? ` - ${slideTitle}` : ""}
                  </p>
                </button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 p-0 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"
                  aria-label={`Remove slide ${index + 1}`}
                  onClick={() => {
                    setExpandedSlideIndex((prev) => {
                      if (prev === null) {
                        return null;
                      }
                      if (prev === index) {
                        return expandedIndexAfterRemovingExpandedItem(
                          index,
                          heroSliderSlideFields.length,
                        );
                      }
                      if (prev > index) {
                        return prev - 1;
                      }
                      return prev;
                    });
                    onRemoveSlide(index);
                  }}
                  disabled={heroSliderSlideFields.length <= 1}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      d="m6 6 12 12M18 6 6 18"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>

              {isExpanded ? (
                <div
                  id={`hero-slide-panel-${index}`}
                  className="space-y-2.5 pt-1"
                >
                  <FormField
                    id={`hero-slider-title-${index}`}
                    label="Title"
                    errorMessage={
                      errors.hero_slider?.slides?.[index]?.title?.message
                    }
                  >
                    <Input
                      id={`hero-slider-title-${index}`}
                      type="text"
                      {...register(`hero_slider.slides.${index}.title`, {
                        required: "Title is required",
                      })}
                    />
                  </FormField>
                  <LabeledTextarea
                    id={`hero-slider-subtitle-${index}`}
                    label="Subtitle"
                    inputProps={register(
                      `hero_slider.slides.${index}.subtitle`,
                      {
                        required: "Subtitle is required",
                      },
                    )}
                    errorMessage={
                      errors.hero_slider?.slides?.[index]?.subtitle?.message
                    }
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      id={`hero-slider-cta-text-${index}`}
                      label="CTA text"
                      errorMessage={
                        errors.hero_slider?.slides?.[index]?.cta_text?.message
                      }
                    >
                      <Input
                        id={`hero-slider-cta-text-${index}`}
                        type="text"
                        {...register(`hero_slider.slides.${index}.cta_text`, {
                          required: "CTA text is required",
                        })}
                      />
                    </FormField>
                    <FormField
                      id={`hero-slider-cta-link-${index}`}
                      label="CTA link"
                      errorMessage={
                        errors.hero_slider?.slides?.[index]?.cta_link?.message
                      }
                    >
                      <Input
                        id={`hero-slider-cta-link-${index}`}
                        type="text"
                        {...register(`hero_slider.slides.${index}.cta_link`, {
                          required: "CTA link is required",
                        })}
                      />
                    </FormField>
                  </div>
                  <FormField
                    id={`hero-slider-background-mode-${index}`}
                    label="Background mode"
                    errorMessage={
                      errors.hero_slider?.slides?.[index]?.background_mode
                        ?.message
                    }
                  >
                    <Input
                      id={`hero-slider-background-mode-${index}`}
                      type="text"
                      {...register(
                        `hero_slider.slides.${index}.background_mode`,
                      )}
                    />
                  </FormField>

                  <ControlledImageFileField
                    id={`hero-slider-image-${index}`}
                    label="Slide image"
                    control={control}
                    name={`hero_slider.slides.${index}.image`}
                    rules={{
                      validate: (file) => validateSlideImage(index, file),
                    }}
                    onFilePicked={(file) => onSlideImageChange(index, file)}
                    preview={{
                      selectedUrl: previewUrl,
                      currentUrl: currentImageUrl,
                    }}
                    errorMessage={
                      errors.hero_slider?.slides?.[index]?.image?.message
                    }
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
