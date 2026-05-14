import { FooterData } from "@portal/market/models";

export const FOOTER_MOCK: FooterData = {
  link_blocks: [
    {
      title: "Navigation",
      links: [
        { name: "Categories", url: "#" },
        { name: "About Us", url: "#" },
        { name: "Blog", url: "#" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "For Pet Owners", url: "#" },
        { name: "Contact Us", url: "#" },
        { name: "FAQs & Help Center", url: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", url: "#" },
        { name: "Terms of Service", url: "#" },
        { name: "Trust & Compliance", url: "#" },
      ],
    },
  ],
  social_links: [
    {
      icon_id: "/images/mocks/footer/instagram.png",
      url: "#",
    },
    {
      icon_id: "/images/mocks/footer/tik-tok.png",
      url: "#",
    },
    {
      icon_id: "/images/mocks/footer/facebook.png",
      url: "#",
    },
    {
      icon_id: "/images/mocks/footer/pinterest.png",
      url: "#",
    },
  ],
  contact_info:
    "We're here to help!\uD83D\uDC3E\nEmail: support@[marketplacename].com\nPhone: +1 (800) PET-LOVE",
  copyright_info:
    "© 2025 Fuzzy Hub. Made with love for pets and their people. All rights reserved.",
};
