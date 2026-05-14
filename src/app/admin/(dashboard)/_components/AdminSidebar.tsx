"use client";

import { ReactElement, startTransition, useEffect, useState } from "react";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { clearAllAuthCookies } from "@/utils/authCookie";
import { cn } from "@utils";

import {
  ADMIN_SIDEBAR_SECTIONS,
  type AdminSidebarItem,
  type AdminSidebarSection,
} from "../_config/adminNavigation";

interface IconProps {
  className?: string;
}

type IconComponent = ({ className }: IconProps) => ReactElement;

function GridIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function FolderIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function BookIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

function MessageCircleIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function StarIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.8 5.5 21 7.5 13.5 2 9 9 9 12 2" />
    </svg>
  );
}

function UsersIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6" />
      <path d="M23 11h-6" />
    </svg>
  );
}

function WalletIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M16 12h.01" />
      <path d="M2 9h20" />
    </svg>
  );
}

function DogIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M11 5 8 2 5 5" />
      <path d="M13 5 16 2 19 5" />
      <path d="M4 9a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3a8 8 0 1 1-16 0z" />
      <circle cx="9" cy="11" r=".8" fill="currentColor" />
      <circle cx="15" cy="11" r=".8" fill="currentColor" />
      <path d="M10 15h4" />
    </svg>
  );
}

function LogOutIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

const iconByName: Record<AdminSidebarSection["icon"], IconComponent> = {
  grid: GridIcon,
  folder: FolderIcon,
  book: BookIcon,
  messageCircle: MessageCircleIcon,
  star: StarIcon,
  users: UsersIcon,
  wallet: WalletIcon,
  dog: DogIcon,
};

function activeHrefForPathname(pathname: string): string | null {
  const sorted = ADMIN_SIDEBAR_SECTIONS.flatMap((section) => [
    section,
    ...(section.items ?? []),
  ])
    .filter((item): item is { label: string; href: string } =>
      Boolean(item.href),
    )
    .sort((a, b) => b.href.length - a.href.length);

  for (const { href } of sorted) {
    if (pathname === href || pathname.startsWith(`${href}/`)) {
      return href;
    }
  }
  return null;
}

function hasChildren(
  section: AdminSidebarSection,
): section is AdminSidebarSection & {
  items: AdminSidebarItem[];
} {
  return Boolean(section.items?.length);
}

function sectionContainsHref(
  section: AdminSidebarSection,
  href: string | null,
): boolean {
  if (!href || !hasChildren(section)) return false;

  return section.items.some((item) => item.href === href);
}

function initialCollapsedGroups(
  activeHref: string | null,
): Record<string, boolean> {
  return ADMIN_SIDEBAR_SECTIONS.reduce<Record<string, boolean>>(
    (acc, section) => {
      if (!hasChildren(section)) return acc;

      acc[section.label] = !sectionContainsHref(section, activeHref);
      return acc;
    },
    {},
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeHref = activeHrefForPathname(pathname);
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >(() => initialCollapsedGroups(activeHref));

  useEffect(() => {
    startTransition(() => {
      setCollapsedGroups((prev) => {
        const next = initialCollapsedGroups(activeHref);
        for (const [label, value] of Object.entries(prev)) {
          if (next[label] === undefined) continue;
          if (
            sectionContainsHref(
              ADMIN_SIDEBAR_SECTIONS.find((item) => item.label === label)!,
              activeHref,
            )
          )
            continue;
          next[label] = value;
        }
        return next;
      });
    });
  }, [activeHref]);

  function handleLogout() {
    clearAllAuthCookies();
    router.push("/admin/login");
  }

  function toggleGroup(label: string) {
    setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  function renderEntry(
    item: AdminSidebarItem,
    isNested: boolean,
    Icon?: IconComponent,
  ) {
    if (!item.href) {
      return (
        <button
          key={item.label}
          type="button"
          disabled
          className={cn(
            "flex w-full min-w-0 cursor-not-allowed items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-sm font-medium text-zinc-400",
            isNested && "pl-8",
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {!isNested && Icon ? (
              <Icon className="shrink-0 opacity-70" />
            ) : null}
            <span className="truncate">{item.label}</span>
          </span>
          <span className="text-xs font-bold tracking-wide text-red-600">
            in work
          </span>
        </button>
      );
    }

    const isActive = activeHref === item.href;

    return (
      <NextLink
        key={item.label}
        href={item.href}
        className={cn(
          "flex min-w-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
          isNested && "pl-8",
          isActive
            ? "bg-zinc-100 text-zinc-900"
            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
        )}
      >
        {!isNested && Icon ? <Icon className="shrink-0 opacity-70" /> : null}
        <span className="truncate">{item.label}</span>
      </NextLink>
    );
  }

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-200 px-6">
        <span className="truncate text-sm font-semibold tracking-tight text-zinc-900">
          Fuzzy Hub
        </span>
        <span className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-xs font-medium text-zinc-600">
          Admin
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
        {ADMIN_SIDEBAR_SECTIONS.map((section) => {
          const Icon = iconByName[section.icon];

          if (!hasChildren(section)) {
            return renderEntry(
              { label: section.label, href: section.href },
              false,
              Icon,
            );
          }

          const isCollapsed = collapsedGroups[section.label];

          return (
            <div key={section.label} className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => toggleGroup(section.label)}
                className="flex w-full min-w-0 items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Icon className="shrink-0 opacity-70" />
                  <span className="truncate">{section.label}</span>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "ml-auto shrink-0 text-zinc-500 transition-transform duration-200",
                    !isCollapsed && "rotate-90 text-zinc-800",
                  )}
                  aria-hidden
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              {!isCollapsed && (
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => renderEntry(item, true))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="shrink-0 border-t border-zinc-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
            "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
          )}
        >
          <LogOutIcon className="shrink-0 opacity-70" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
