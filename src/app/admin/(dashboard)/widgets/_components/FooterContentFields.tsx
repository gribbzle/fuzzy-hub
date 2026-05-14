"use client";

import { useMemo, useState } from "react";

import { useFieldArray, useWatch } from "react-hook-form";

import { Button } from "../../_components/ui/button";
import { FormField } from "../../_components/ui/form-field";
import { Input } from "../../_components/ui/input";
import { expandedIndexAfterRemovingExpandedItem } from "../../_utils/expandedPanelIndex";
import { useWidgetFormContext } from "../_hooks/useWidgetFormContext";
import {
  ControlledImageFileField,
  FieldErrorMessage,
  LabeledTextarea,
} from "./WidgetFormPrimitives";

interface FooterLinkFieldsProps {
  blockIndex: number;
}

function FooterLinkFields({ blockIndex }: FooterLinkFieldsProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useWidgetFormContext();
  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control,
    name: `footer.link_blocks.${blockIndex}.links`,
  });

  return (
    <div className="space-y-3">
      <FormField
        id={`footer-link-block-title-${blockIndex}`}
        label="Block title"
        errorMessage={errors.footer?.link_blocks?.[blockIndex]?.title?.message}
      >
        <Input
          id={`footer-link-block-title-${blockIndex}`}
          type="text"
          {...register(`footer.link_blocks.${blockIndex}.title`, {
            required: "Block title is required",
          })}
        />
      </FormField>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-zinc-700">Links</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 px-2"
            onClick={() => appendLink({ name: "", url: "" })}
          >
            Add link
          </Button>
        </div>
        {linkFields.map((linkField, linkIndex) => (
          <div
            key={linkField.id}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] items-start gap-2 rounded-md bg-white p-2.5"
          >
            <FormField
              id={`footer-link-name-${blockIndex}-${linkIndex}`}
              label="Name"
              className="space-y-1"
              labelClassName="sr-only"
              errorMessage={
                errors.footer?.link_blocks?.[blockIndex]?.links?.[linkIndex]
                  ?.name?.message
              }
            >
              <Input
                id={`footer-link-name-${blockIndex}-${linkIndex}`}
                type="text"
                inputSize="compact"
                placeholder="Name"
                {...register(
                  `footer.link_blocks.${blockIndex}.links.${linkIndex}.name`,
                  {
                    required: "Link name is required",
                  },
                )}
              />
            </FormField>
            <FormField
              id={`footer-link-url-${blockIndex}-${linkIndex}`}
              label="URL"
              className="space-y-1"
              labelClassName="sr-only"
              errorMessage={
                errors.footer?.link_blocks?.[blockIndex]?.links?.[linkIndex]
                  ?.url?.message
              }
            >
              <Input
                id={`footer-link-url-${blockIndex}-${linkIndex}`}
                type="text"
                inputSize="compact"
                placeholder="URL"
                {...register(
                  `footer.link_blocks.${blockIndex}.links.${linkIndex}.url`,
                  {
                    required: "Link URL is required",
                  },
                )}
              />
            </FormField>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 self-start text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"
              aria-label={`Remove link ${linkIndex + 1}`}
              onClick={() => removeLink(linkIndex)}
              disabled={linkFields.length <= 1}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
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
        ))}
        <FieldErrorMessage
          message={errors.footer?.link_blocks?.[blockIndex]?.links?.message}
        />
      </div>
    </div>
  );
}

interface FooterContentFieldsProps {
  socialLinkImagePreviewUrls: (string | null)[];
  onSocialLinkImageChange: (index: number, file: File | null) => void;
  onSocialLinkRemove: (index: number) => void;
  getSocialLinkCurrentImageUrl?: (index: number) => string | null;
  validateSocialLinkImage: (index: number, file: File | null) => true | string;
}

export function FooterContentFields({
  socialLinkImagePreviewUrls,
  onSocialLinkImageChange,
  onSocialLinkRemove,
  getSocialLinkCurrentImageUrl,
  validateSocialLinkImage,
}: FooterContentFieldsProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useWidgetFormContext();
  const [expandedLinkBlockIndex, setExpandedLinkBlockIndex] = useState<
    number | null
  >(null);
  const [expandedSocialLinkIndex, setExpandedSocialLinkIndex] = useState<
    number | null
  >(null);
  const {
    fields: linkBlockFields,
    append: appendLinkBlock,
    remove: removeLinkBlock,
  } = useFieldArray({
    control,
    name: "footer.link_blocks",
  });
  const {
    fields: socialLinkFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: "footer.social_links",
  });
  const linkBlocks = useWatch({ control, name: "footer.link_blocks" });
  const socialLinks = useWatch({ control, name: "footer.social_links" });

  const resolvedExpandedLinkBlockIndex = useMemo(() => {
    if (linkBlockFields.length === 0) {
      return null;
    }
    if (expandedLinkBlockIndex === null) {
      return null;
    }
    return Math.min(expandedLinkBlockIndex, linkBlockFields.length - 1);
  }, [linkBlockFields.length, expandedLinkBlockIndex]);

  const resolvedExpandedSocialLinkIndex = useMemo(() => {
    if (socialLinkFields.length === 0) {
      return null;
    }
    if (expandedSocialLinkIndex === null) {
      return null;
    }
    return Math.min(expandedSocialLinkIndex, socialLinkFields.length - 1);
  }, [socialLinkFields.length, expandedSocialLinkIndex]);

  return (
    <div className="space-y-3 rounded-lg border border-zinc-200 bg-white p-3">
      <div>
        <p className="text-sm font-medium text-zinc-900">
          Footer content
          <span className="ml-1 text-xs font-normal text-zinc-500">
            ({linkBlockFields.length} blocks, {socialLinkFields.length} social
            links)
          </span>
        </p>
      </div>
      <LabeledTextarea
        id="footer-contact-info"
        label="Contact info"
        rows={5}
        inputProps={register("footer.contact_info", {
          required: "Contact info is required",
        })}
        errorMessage={errors.footer?.contact_info?.message}
      />
      <FormField
        id="footer-copyright-info"
        label="Copyright info"
        errorMessage={errors.footer?.copyright_info?.message}
      >
        <Input
          id="footer-copyright-info"
          type="text"
          {...register("footer.copyright_info", {
            required: "Copyright info is required",
          })}
        />
      </FormField>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-zinc-900">Link blocks</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 px-2"
            onClick={() => {
              setExpandedLinkBlockIndex(linkBlockFields.length);
              appendLinkBlock({ title: "", links: [{ name: "", url: "" }] });
            }}
          >
            Add block
          </Button>
        </div>
        {linkBlockFields.map((field, blockIndex) => (
          <div
            key={field.id}
            className="space-y-2 rounded-md border border-zinc-200 bg-zinc-50 p-2.5"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-2 rounded px-1 py-1 text-left hover:bg-zinc-100"
                onClick={() =>
                  setExpandedLinkBlockIndex(
                    resolvedExpandedLinkBlockIndex === blockIndex
                      ? null
                      : blockIndex,
                  )
                }
                aria-expanded={resolvedExpandedLinkBlockIndex === blockIndex}
                aria-controls={`footer-link-block-panel-${blockIndex}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={`h-4 w-4 text-zinc-500 transition-transform ${resolvedExpandedLinkBlockIndex === blockIndex ? "rotate-90" : ""}`}
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
                  Block {blockIndex + 1}
                  {linkBlocks?.[blockIndex]?.title?.trim()
                    ? ` - ${linkBlocks[blockIndex].title.trim()}`
                    : ""}
                </p>
                <span className="text-xs text-zinc-500">
                  {linkBlocks?.[blockIndex]?.links?.length ?? 0} links
                </span>
              </button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"
                onClick={() => {
                  setExpandedLinkBlockIndex((prev) => {
                    if (prev === null) {
                      return null;
                    }
                    if (prev === blockIndex) {
                      return expandedIndexAfterRemovingExpandedItem(
                        blockIndex,
                        linkBlockFields.length,
                      );
                    }
                    if (prev > blockIndex) {
                      return prev - 1;
                    }
                    return prev;
                  });
                  removeLinkBlock(blockIndex);
                }}
                disabled={linkBlockFields.length <= 1}
              >
                Remove block
              </Button>
            </div>
            {resolvedExpandedLinkBlockIndex === blockIndex ? (
              <div
                id={`footer-link-block-panel-${blockIndex}`}
                className="pt-1"
              >
                <FooterLinkFields blockIndex={blockIndex} />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-zinc-900">Social links</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 px-2"
            onClick={() => {
              setExpandedSocialLinkIndex(socialLinkFields.length);
              appendSocialLink({ icon: null, existing_icon_id: null, url: "" });
            }}
          >
            Add social link
          </Button>
        </div>
        {socialLinkFields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-2 rounded-md border border-zinc-200 bg-zinc-50 p-2.5"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-2 rounded px-1 py-1 text-left hover:bg-zinc-100"
                onClick={() =>
                  setExpandedSocialLinkIndex(
                    resolvedExpandedSocialLinkIndex === index ? null : index,
                  )
                }
                aria-expanded={resolvedExpandedSocialLinkIndex === index}
                aria-controls={`footer-social-link-panel-${index}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className={`h-4 w-4 text-zinc-500 transition-transform ${resolvedExpandedSocialLinkIndex === index ? "rotate-90" : ""}`}
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
                  Social link {index + 1}
                </p>
                <span className="truncate text-xs text-zinc-500">
                  {socialLinks?.[index]?.url?.trim() || "No URL yet"}
                </span>
              </button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"
                onClick={() => {
                  setExpandedSocialLinkIndex((prev) => {
                    if (prev === null) {
                      return null;
                    }
                    if (prev === index) {
                      return expandedIndexAfterRemovingExpandedItem(
                        index,
                        socialLinkFields.length,
                      );
                    }
                    if (prev > index) {
                      return prev - 1;
                    }
                    return prev;
                  });
                  onSocialLinkRemove(index);
                  removeSocialLink(index);
                }}
                disabled={socialLinkFields.length <= 1}
              >
                Remove social link
              </Button>
            </div>
            {resolvedExpandedSocialLinkIndex === index ? (
              <div
                id={`footer-social-link-panel-${index}`}
                className="space-y-2.5 pt-1"
              >
                <ControlledImageFileField
                  id={`footer-social-icon-${index}`}
                  label="Icon image"
                  control={control}
                  name={`footer.social_links.${index}.icon`}
                  rules={{
                    validate: (file) => validateSocialLinkImage(index, file),
                  }}
                  onFilePicked={(file) => onSocialLinkImageChange(index, file)}
                  preview={{
                    selectedUrl: socialLinkImagePreviewUrls[index] ?? null,
                    currentUrl: getSocialLinkCurrentImageUrl?.(index) ?? null,
                  }}
                  errorMessage={
                    errors.footer?.social_links?.[index]?.icon?.message
                  }
                />
                <FormField
                  id={`footer-social-url-${index}`}
                  label="URL"
                  errorMessage={
                    errors.footer?.social_links?.[index]?.url?.message
                  }
                >
                  <Input
                    id={`footer-social-url-${index}`}
                    type="text"
                    {...register(`footer.social_links.${index}.url`, {
                      required: "Social URL is required",
                    })}
                  />
                </FormField>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
