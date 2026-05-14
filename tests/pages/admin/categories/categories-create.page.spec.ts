import { expect, test } from "@playwright/test";

import { parseAdminCategoryApiPath } from "./categories-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

const createdId = "category-playwright-created";
const catalogPublicId = "catalog-playwright-pets";

test.describe("Admin categories create", () => {
  test("creates category and navigates to list", async ({ page }) => {
    const name = "Playwright New Category";
    const slug = "playwright-new-category";
    const description = "Created from Playwright";
    let createRequestBody = "";

    await page.route("**/api/v1/admin/catalogs**", async (route) => {
      if (route.request().method() !== "GET") {
        await route.fulfill({
          status: 404,
          contentType: "application/json",
          body: JSON.stringify({ data: { message: "not mocked" } }),
        });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            items: [
              {
                public_id: catalogPublicId,
                name: "Pets",
                label: "Pets",
                slug: "pets",
                description: null,
                created_at: "2026-04-01T10:00:00Z",
                updated_at: "2026-04-01T10:00:00Z",
              },
            ],
            total: 1,
          },
        }),
      });
    });

    await page.route("**/api/v1/admin/categories**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminCategoryApiPath(url.pathname);

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

    await page.goto("https://localhost:3000/admin/categories/new");
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Catalog", { exact: true }).click();
    await page.getByRole("option", { name: "Pets", exact: true }).click();
    await page.getByLabel("Name", { exact: true }).fill(name);
    await page.getByLabel("Slug", { exact: true }).fill(slug);
    await page.getByLabel("Description", { exact: true }).fill(description);

    await page.getByRole("button", { name: "Create category" }).click();

    await expect(page).toHaveURL(/\/admin\/categories(?:\?|$)/);

    expect(createRequestBody.length).toBeGreaterThan(0);
    expect(createRequestBody).toContain(catalogPublicId);
    expect(createRequestBody).toContain(name);
    expect(createRequestBody).toContain(slug);
    expect(createRequestBody).toContain(description);
  });
});
