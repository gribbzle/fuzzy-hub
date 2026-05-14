"use client";

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { type BackgroundImageField } from "../_components/WidgetFormShared";

const EMPTY_BACKGROUND_PREVIEW_STATE: Record<
  BackgroundImageField,
  string | null
> = {
  background_image_large_desktop: null,
  background_image_desktop: null,
  background_image_tablet: null,
  background_image_mobile: null,
};

const revokeObjectUrl = (url: string | null | undefined) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

const setPreviewUrlAtIndex = (
  setUrls: Dispatch<SetStateAction<(string | null)[]>>,
  index: number,
  file: File | null,
) => {
  setUrls((prev) => {
    const next = [...prev];
    revokeObjectUrl(next[index]);
    next[index] = file ? URL.createObjectURL(file) : null;
    return next;
  });
};

const removePreviewUrlAtIndex = (
  setUrls: Dispatch<SetStateAction<(string | null)[]>>,
  index: number,
) => {
  setUrls((prev) => {
    const next = [...prev];
    revokeObjectUrl(next[index]);
    next.splice(index, 1);
    return next;
  });
};

export const useWidgetImagePreviews = () => {
  const [selectedImagePreviewUrls, setSelectedImagePreviewUrls] = useState<
    Record<BackgroundImageField, string | null>
  >({ ...EMPTY_BACKGROUND_PREVIEW_STATE });
  const [aboutUsImagePreviewUrl, setAboutUsImagePreviewUrl] = useState<
    string | null
  >(null);
  const [heroSliderImagePreviewUrls, setHeroSliderImagePreviewUrls] = useState<
    (string | null)[]
  >([]);
  const [footerSocialImagePreviewUrls, setFooterSocialImagePreviewUrls] =
    useState<(string | null)[]>([]);

  const selectedImagePreviewUrlsRef = useRef(selectedImagePreviewUrls);
  const aboutUsImagePreviewUrlRef = useRef(aboutUsImagePreviewUrl);
  const heroSliderImagePreviewUrlsRef = useRef(heroSliderImagePreviewUrls);
  const footerSocialImagePreviewUrlsRef = useRef(footerSocialImagePreviewUrls);

  useEffect(() => {
    selectedImagePreviewUrlsRef.current = selectedImagePreviewUrls;
  }, [selectedImagePreviewUrls]);

  useEffect(() => {
    aboutUsImagePreviewUrlRef.current = aboutUsImagePreviewUrl;
  }, [aboutUsImagePreviewUrl]);

  useEffect(() => {
    heroSliderImagePreviewUrlsRef.current = heroSliderImagePreviewUrls;
  }, [heroSliderImagePreviewUrls]);

  useEffect(() => {
    footerSocialImagePreviewUrlsRef.current = footerSocialImagePreviewUrls;
  }, [footerSocialImagePreviewUrls]);

  useEffect(() => {
    return () => {
      Object.values(selectedImagePreviewUrlsRef.current).forEach(
        revokeObjectUrl,
      );
      revokeObjectUrl(aboutUsImagePreviewUrlRef.current);
      heroSliderImagePreviewUrlsRef.current.forEach(revokeObjectUrl);
      footerSocialImagePreviewUrlsRef.current.forEach(revokeObjectUrl);
    };
  }, []);

  const setHeroSectionPreview = useCallback(
    (key: BackgroundImageField, file: File | null) => {
      setSelectedImagePreviewUrls((prev) => {
        revokeObjectUrl(prev[key]);

        return {
          ...prev,
          [key]: file ? URL.createObjectURL(file) : null,
        };
      });
    },
    [],
  );

  const setHeroSliderPreview = useCallback(
    (index: number, file: File | null) => {
      setPreviewUrlAtIndex(setHeroSliderImagePreviewUrls, index, file);
    },
    [],
  );

  const setAboutUsPreview = useCallback((file: File | null) => {
    setAboutUsImagePreviewUrl((prev) => {
      revokeObjectUrl(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  }, []);

  const setFooterSocialPreview = useCallback(
    (index: number, file: File | null) => {
      setPreviewUrlAtIndex(setFooterSocialImagePreviewUrls, index, file);
    },
    [],
  );

  const removeHeroSliderPreviewAt = useCallback((index: number) => {
    removePreviewUrlAtIndex(setHeroSliderImagePreviewUrls, index);
  }, []);

  const removeFooterSocialPreviewAt = useCallback((index: number) => {
    removePreviewUrlAtIndex(setFooterSocialImagePreviewUrls, index);
  }, []);

  const clearAllLocalPreviews = useCallback(() => {
    setSelectedImagePreviewUrls((prev) => {
      Object.values(prev).forEach(revokeObjectUrl);
      return { ...EMPTY_BACKGROUND_PREVIEW_STATE };
    });

    setHeroSliderImagePreviewUrls((prev) => {
      prev.forEach(revokeObjectUrl);
      return [];
    });

    setAboutUsImagePreviewUrl((prev) => {
      revokeObjectUrl(prev);
      return null;
    });

    setFooterSocialImagePreviewUrls((prev) => {
      prev.forEach(revokeObjectUrl);
      return [];
    });
  }, []);

  return {
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
    clearAllLocalPreviews,
  };
};
