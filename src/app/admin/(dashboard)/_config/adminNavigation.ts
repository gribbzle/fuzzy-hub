export interface AdminSidebarItem {
  label: string;
  href?: string;
}

export interface AdminSidebarSection {
  label: string;
  href?: string;
  items?: AdminSidebarItem[];
  icon:
    | "grid"
    | "folder"
    | "book"
    | "messageCircle"
    | "star"
    | "users"
    | "wallet"
    | "dog";
}

export const ADMIN_SIDEBAR_SECTIONS: AdminSidebarSection[] = [
  { label: "Dashboard", icon: "grid" },
  {
    label: "Listings",
    icon: "folder",
    items: [{ label: "Pets" }, { label: "Services" }],
  },
  {
    label: "Learning Hub",
    icon: "book",
    items: [
      { label: "Articles" },
      { label: "Article Categories" },
      { label: "Comments" },
    ],
  },
  { label: "Reviews", icon: "star" },
  { label: "Messages", icon: "messageCircle" },
  { label: "Content (Widgets)", href: "/admin", icon: "grid" },
  {
    label: "Catalogs",
    icon: "folder",
    items: [
      { label: "Categories Management", href: "/admin/categories" },
      { label: "Characteristics Management", href: "/admin/characteristics" },
      { label: "Reference Lists Management", href: "/admin/dictionaries" },
    ],
  },
  {
    label: "Pet Matching Quiz",
    icon: "book",
    items: [
      { label: "Questions Management", href: "/admin/quizzes" },
      { label: "Pet Profiles", href: "/admin/quiz-profiles" },
    ],
  },
  {
    label: "Pet ID",
    icon: "dog",
    items: [{ label: "Pets List" }, { label: "Found Pet Requests" }],
  },
  { label: "Users", href: "/admin/users", icon: "users" },
  { label: "Subscribers", icon: "users" },
  {
    label: "Accounting",
    icon: "wallet",
    items: [{ label: "Subscription Plans" }],
  },
];

export function getAdminSidebarTitleByPath(path: string): string | null {
  const routeTitles = ADMIN_SIDEBAR_SECTIONS.flatMap((section) => [
    section,
    ...(section.items ?? []),
  ])
    .filter((item): item is { label: string; href: string } =>
      Boolean(item.href),
    )
    .sort((a, b) => b.href.length - a.href.length);

  for (const routeTitle of routeTitles) {
    if (routeTitle.href === path) {
      return routeTitle.label;
    }
  }

  return null;
}

export function getAdminSidebarTitleByPathOrFallback(
  path: string,
  fallbackTitle: string,
): string {
  return getAdminSidebarTitleByPath(path) ?? fallbackTitle;
}
