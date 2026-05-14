import { expect, test } from "@playwright/test";

import { parseAdminUsersApiPath } from "./users-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin users list", () => {
  test("loads users and navigates to edit by clicking a row", async ({
    page,
  }) => {
    const userId = "user-playwright-row-click-001";

    await page.route("**/api/v1/admin/users**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (request.method() === "GET" && path.kind === "collection") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [
                {
                  public_id: userId,
                  email: "row-click@example.com",
                  email_verified_at: null,
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
        body: JSON.stringify({ data: { items: [], total: 0 } }),
      });
    });

    await page.goto("https://localhost:3000/admin/users");
    await page.waitForLoadState("networkidle");

    await page
      .locator("tbody tr")
      .filter({ hasText: "row-click@example.com" })
      .click();

    await expect(page).toHaveURL(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit`,
    );
    await expect(
      page.getByRole("heading", { name: "Edit user", exact: true }),
    ).toBeVisible();
  });

  test("loads users and navigates to edit from row actions", async ({
    page,
  }) => {
    const userId = "user-playwright-list-001";

    await page.route("**/api/v1/admin/users**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (request.method() === "GET" && path.kind === "collection") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [
                {
                  public_id: userId,
                  email: "list-test@example.com",
                  email_verified_at: "2026-04-01T10:00:00Z",
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
        body: JSON.stringify({ data: { items: [], total: 0 } }),
      });
    });

    await page.goto("https://localhost:3000/admin/users");
    await page.waitForLoadState("networkidle");

    await expect(page.getByText("list-test@example.com")).toBeVisible();

    await page.getByLabel(`Open actions for user ${userId}`).click();
    await page.getByRole("button", { name: "Edit", exact: true }).click();

    await expect(page).toHaveURL(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit`,
    );
    await expect(
      page.getByRole("heading", { name: "Edit user", exact: true }),
    ).toBeVisible();
  });

  test("syncs profile type filter to URL and list request", async ({
    page,
  }) => {
    const userId = "user-playwright-filter-001";
    let lastCollectionSearchParams = "";

    await page.route("**/api/v1/admin/users**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (request.method() === "GET" && path.kind === "collection") {
        lastCollectionSearchParams = url.searchParams.toString();
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [
                {
                  public_id: userId,
                  email: "filter-test@example.com",
                  email_verified_at: null,
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
        body: JSON.stringify({ data: { items: [], total: 0 } }),
      });
    });

    await page.goto("https://localhost:3000/admin/users");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Any profile type" }).click();
    await page.getByRole("option", { name: "Breeder", exact: true }).click();

    await expect(page).toHaveURL(/[?&]has_profile_type=breeder(?:&|$)/);

    await expect
      .poll(() => lastCollectionSearchParams)
      .toContain("has_profile_type=breeder");
  });
});
