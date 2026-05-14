import { expect, test } from "@playwright/test";

import { parseAdminDictionaryApiPath } from "./dictionaries-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

const createdId = "dictionary-playwright-created";
const ts = "2026-04-01T10:00:00Z";

test.describe("Admin dictionaries create", () => {
  test("creates dictionary and navigates to edit", async ({ page }) => {
    const name = "Playwright New Dictionary";
    const slug = "playwright-new-dictionary";
    const description = "Created from Playwright.";
    let createRequestBody = "";

    await page.route("**/api/v1/admin/dictionaries**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminDictionaryApiPath(url.pathname);

      if (request.method() === "POST" && path.kind === "collection") {
        createRequestBody = request.postData() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: createdId,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "dictionary" &&
        path.id === createdId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: createdId,
              name,
              slug,
              description,
              items: [],
              created_at: ts,
              updated_at: ts,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "items" &&
        path.dictionaryId === createdId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items: [],
              total: 0,
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            items: [],
            total: 0,
          },
        }),
      });
    });

    await page.goto("https://localhost:3000/admin/dictionaries/new");
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Name", { exact: true }).fill(name);
    await page.getByLabel("Slug", { exact: true }).fill(slug);
    await page.locator("#dictionary-description").fill(description);

    await page.getByRole("button", { name: "Create dictionary" }).click();

    await expect(page).toHaveURL(
      new RegExp(`/admin/dictionaries/${encodeURIComponent(createdId)}/edit`),
    );

    expect(createRequestBody).toBe(
      JSON.stringify({
        name,
        slug,
        description,
      }),
    );

    await expect(
      page.getByRole("heading", { name: "Edit dictionary" }),
    ).toBeVisible();
  });
});
