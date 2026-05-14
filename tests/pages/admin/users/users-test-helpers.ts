/** Paths under `/api/v1/admin/users/...` including profiles. */
export type AdminUsersApiPath =
  | { kind: "other" }
  | { kind: "collection" }
  | { kind: "user"; userId: string }
  | { kind: "profiles"; userId: string }
  | { kind: "profile"; userId: string; profileId: string };

export function parseAdminUsersApiPath(pathname: string): AdminUsersApiPath {
  const s = pathname.split("/").filter(Boolean);
  if (
    s.length < 4 ||
    s[0] !== "api" ||
    s[1] !== "v1" ||
    s[2] !== "admin" ||
    s[3] !== "users"
  ) {
    return { kind: "other" };
  }

  if (s.length === 4) {
    return { kind: "collection" };
  }

  const userId = decodeURIComponent(s[4] ?? "");

  if (s.length === 5) {
    return { kind: "user", userId };
  }

  if (s.length === 6 && s[5] === "profiles") {
    return { kind: "profiles", userId };
  }

  if (s.length === 7 && s[5] === "profiles") {
    return {
      kind: "profile",
      userId,
      profileId: decodeURIComponent(s[6] ?? ""),
    };
  }

  return { kind: "other" };
}
