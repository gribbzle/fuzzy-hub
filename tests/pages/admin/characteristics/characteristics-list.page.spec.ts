import { expect, test } from "@playwright/test";

import { parseAdminCharacteristicApiPath } from "./characteristics-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin characteristics list", () => {
  test("confirms before deleting characteristic", async ({ page }) => {
    const characteristicId = "characteristic-playwright-list";
    let deleteRequestCount = 0;
    let deletedCharacteristicId = "";

    await page.route("**/api/v1/admin/characteristics**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminCharacteristicApiPath(url.pathname);

      if (request.method() === "DELETE" && path.kind === "item") {
        deleteRequestCount += 1;
        deletedCharacteristicId = path.id;

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: characteristicId,
            },
          }),
        });
        return;
      }

      if (request.method() === "GET" && path.kind === "collection") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              items:
                deleteRequestCount === 0
                  ? [
                      {
                        public_id: characteristicId,
                        name: "List characteristic",
                        slug: "list-characteristic",
                        type: "text",
                        group: "basic_information",
                        description: "For list test",
                        dictionary: null,
                        unit: null,
                        min: null,
                        max: null,
                        max_length: null,
                        has_dictionary: false,
                        has_unit: false,
                        has_min_max: false,
                        has_max_length: false,
                        created_at: "2026-04-01T10:00:00Z",
                        updated_at: "2026-04-01T10:00:00Z",
                      },
                    ]
                  : [],
              total: deleteRequestCount === 0 ? 1 : 0,
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

    await page.goto("https://localhost:3000/admin/characteristics");
    await page.waitForLoadState("networkidle");

    await page
      .getByLabel(`Open actions for characteristic ${characteristicId}`)
      .click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole("button", { name: "Cancel" }).click();
    await expect(confirmDialog).not.toBeVisible();
    expect(deleteRequestCount).toBe(0);

    await page
      .getByLabel(`Open actions for characteristic ${characteristicId}`)
      .click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    await confirmDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();

    expect(deleteRequestCount).toBe(1);
    expect(deletedCharacteristicId).toBe(characteristicId);
    await expect(page.getByText("No characteristics found.")).toBeVisible();
  });
});
