import { expect, test } from "@playwright/test";

import { parseAdminUsersApiPath } from "./users-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin user profile edit", () => {
  test("submits PATCH with approved and contact fields from modal", async ({
    page,
  }) => {
    const userId = "user-playwright-profile-user";
    const profileId = "profile-playwright-001";
    let patchBody: Record<string, unknown> | null = null;

    await page.route("**/api/v1/admin/users/**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (
        request.method() === "GET" &&
        path.kind === "user" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "profile-user@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profiles" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [
                {
                  public_id: profileId,
                  type: "customer",
                  approved: false,
                  created_at: "2026-04-01T10:00:00Z",
                },
              ],
              total: 1,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profile" &&
        path.userId === userId &&
        path.profileId === profileId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: profileId,
              type: "customer",
              approved: false,
              avatar_public_id: null,
              profile_data: {
                full_name: "Ada",
                phone_number: "+10000000000",
              },
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "PATCH" &&
        path.kind === "profile" &&
        path.userId === userId &&
        path.profileId === profileId
      ) {
        patchBody = request.postDataJSON() as Record<string, unknown>;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: profileId,
              type: "customer",
              approved: true,
              avatar_public_id: null,
              profile_data: {},
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T11:00:00Z",
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: {} }),
      });
    });

    await page.goto(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit?profile=${encodeURIComponent(profileId)}`,
    );
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Edit profile" }),
    ).toBeVisible();

    await page.getByLabel("Approved", { exact: true }).click();

    await page.getByLabel("Full name", { exact: true }).fill("Ada Lovelace");
    await page.getByLabel("Phone number", { exact: true }).fill("+19998887777");

    await page
      .getByRole("button", { name: "Save profile", exact: true })
      .click();

    await expect(page.getByText("Profile updated successfully.")).toBeVisible();

    expect(patchBody).not.toBeNull();
    const submitted = patchBody as unknown as Record<string, unknown>;
    expect(submitted.approved).toBe(true);
    expect(submitted.full_name).toBe("Ada Lovelace");
    expect(submitted.phone_number).toBe("+19998887777");
  });

  test("opens edit modal when clicking a profile row", async ({ page }) => {
    const userId = "user-playwright-profile-row";
    const profileId = "profile-playwright-row-001";

    await page.route("**/api/v1/admin/users/**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (
        request.method() === "GET" &&
        path.kind === "user" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "row-profile@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profiles" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [
                {
                  public_id: profileId,
                  type: "customer",
                  approved: true,
                  created_at: "2026-04-01T10:00:00Z",
                },
              ],
              total: 1,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profile" &&
        path.userId === userId &&
        path.profileId === profileId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: profileId,
              type: "customer",
              approved: true,
              avatar_public_id: null,
              profile_data: {
                full_name: "Row User",
                phone_number: "+10000000001",
              },
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: {} }),
      });
    });

    await page.goto(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await page.locator("tbody tr").filter({ hasText: profileId }).click();

    await expect(
      page.getByRole("heading", { name: "Edit profile" }),
    ).toBeVisible();
    await expect(page.getByLabel("Full name", { exact: true })).toHaveValue(
      "Row User",
    );
  });

  test("opens edit modal from profile row actions menu", async ({ page }) => {
    const userId = "user-playwright-profile-menu";
    const profileId = "profile-playwright-menu-001";

    await page.route("**/api/v1/admin/users/**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (
        request.method() === "GET" &&
        path.kind === "user" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "menu-profile@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profiles" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [
                {
                  public_id: profileId,
                  type: "breeder",
                  approved: false,
                  created_at: "2026-04-01T10:00:00Z",
                },
              ],
              total: 1,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profile" &&
        path.userId === userId &&
        path.profileId === profileId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: profileId,
              type: "breeder",
              approved: false,
              avatar_public_id: null,
              profile_data: {
                full_name: "Menu User",
                phone_number: "+10000000002",
              },
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: {} }),
      });
    });

    await page.goto(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await page.getByLabel(`Open actions for profile ${profileId}`).click();
    await page.getByRole("button", { name: "Edit", exact: true }).click();

    await expect(
      page.getByRole("heading", { name: "Edit profile" }),
    ).toBeVisible();
    await expect(page.getByLabel("Full name", { exact: true })).toHaveValue(
      "Menu User",
    );
  });

  test("syncs profile search debounce and approved filter to URL and API", async ({
    page,
  }) => {
    const userId = "user-playwright-profile-filters";
    const profileId = "profile-filter-001";
    let lastProfilesSearchParams = "";

    await page.route("**/api/v1/admin/users/**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (
        request.method() === "GET" &&
        path.kind === "user" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "filters@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profiles" &&
        path.userId === userId
      ) {
        lastProfilesSearchParams = url.searchParams.toString();
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [
                {
                  public_id: profileId,
                  type: "customer",
                  approved: false,
                  created_at: "2026-04-01T10:00:00Z",
                },
              ],
              total: 1,
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: {} }),
      });
    });

    await page.goto(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await page.getByPlaceholder("Search profiles…").fill("filter-q");

    await expect
      .poll(() => lastProfilesSearchParams)
      .toContain("search=filter-q");

    await expect(page).toHaveURL(/[?&]search=filter-q(?:&|$)/);

    await page.getByRole("button", { name: "Any status" }).click();
    await page
      .getByRole("option", { name: "Not approved", exact: true })
      .click();

    await expect(page).toHaveURL(/[?&]approved=false(?:&|$)/);

    await expect
      .poll(() => lastProfilesSearchParams)
      .toContain("approved=false");
  });
});
