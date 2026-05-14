import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge<
  "btn-size" | "btn-variant" | "menu-link-size" | "tab-size" | "alert-size"
>({
  extend: {
    classGroups: {
      "btn-size": ["btn-mini", "btn-small", "btn-medium", "btn-large"],
      "tab-size": ["tab-small", "tab-medium", "tab-large"],
      "alert-size": ["alert-small", "alert-medium", "alert-large"],
      "btn-variant": ["btn-primary", "btn-secondary", "btn-tertiary"],
      "font-size": [
        "text-12",
        "text-14",
        "text-16",
        "text-18",
        "text-20",
        "text-24",
        "text-32",
        "text-44",
        "text-64",
      ],
    },
  },
});
