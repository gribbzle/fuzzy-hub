import { expect, test } from "@playwright/test";

import { parseAdminCharacteristicApiPath } from "./characteristics-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin characteristics edit", () => {
  test("sends patch with updated name", async ({ page }) => {
    const characteristicId = "characteristic-playwright-edit";
    const originalName = "Playwright characteristic";
    const updatedName = "Playwright characteristic updated";
    let patchRequestBody = "";

    const ts = "2026-04-01T10:00:00Z";

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

      if (
        request.method() === "GET" &&
        path.kind === "item" &&
        path.id === characteristicId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: characteristicId,
              name: originalName,
              slug: "playwright-characteristic",
              type: "text",
              group: "basic_information",
              description: null,
              dictionary: null,
              unit: null,
              min: null,
              max: null,
              max_length: null,
              has_dictionary: false,
              has_unit: false,
              has_min_max: false,
              has_max_length: false,
              created_at: ts,
              updated_at: ts,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "PATCH" &&
        path.kind === "item" &&
        path.id === characteristicId
      ) {
        patchRequestBody = request.postData() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: {} }),
        });
        return;
      }

      await route.fulfill({
        status: 405,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            message: "Method not allowed",
          },
        }),
      });
    });

    await page.goto(
      `https://localhost:3000/admin/characteristics/${encodeURIComponent(characteristicId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
      originalName,
    );

    await page.getByLabel("Name", { exact: true }).fill(updatedName);
    await page.getByRole("button", { name: "Save changes" }).click();

    expect(patchRequestBody).toBe(
      JSON.stringify({
        name: updatedName,
        slug: "playwright-characteristic",
        type: "text",
        group: "basic_information",
      }),
    );
  });
});
