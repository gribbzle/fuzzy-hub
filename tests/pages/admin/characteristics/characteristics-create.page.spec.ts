import { expect, test } from "@playwright/test";

import { parseAdminCharacteristicApiPath } from "./characteristics-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

const createdId = "characteristic-playwright-created";

test.describe("Admin characteristics create", () => {
  test("creates characteristic and navigates to list", async ({ page }) => {
    const name = "Playwright New Characteristic";
    const slug = "playwright-new-characteristic";
    let createRequestBody = "";

    await page.route("**/api/v1/admin/dictionaries**", async (route) => {
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

    await page.route("**/api/v1/admin/characteristics**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminCharacteristicApiPath(url.pathname);

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

    await page.goto("https://localhost:3000/admin/characteristics/new");
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Name", { exact: true }).fill(name);
    await page.getByLabel("Slug", { exact: true }).fill(slug);

    await page.getByRole("button", { name: "Create characteristic" }).click();

    await expect(page).toHaveURL(/\/admin\/characteristics(?:\?|$)/);

    expect(createRequestBody).toBe(
      JSON.stringify({
        name,
        slug,
        type: "text",
        group: "basic_information",
      }),
    );
  });
});
