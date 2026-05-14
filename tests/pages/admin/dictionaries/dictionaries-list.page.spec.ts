import { expect, test } from "@playwright/test";

import { parseAdminDictionaryApiPath } from "./dictionaries-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin dictionaries list", () => {
  test("confirms before deleting dictionary", async ({ page }) => {
    const dictionaryId = "dictionary-playwright-list";
    let deleteRequestCount = 0;
    let deletedDictionaryId = "";

    await page.route("**/api/v1/admin/dictionaries**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminDictionaryApiPath(url.pathname);

      if (request.method() === "DELETE" && path.kind === "dictionary") {
        deleteRequestCount += 1;
        deletedDictionaryId = path.id;

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: dictionaryId,
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
                        public_id: dictionaryId,
                        name: "List dictionary",
                        slug: "list-dictionary",
                        description: "For list test",
                        items: [],
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

    await page.goto("https://localhost:3000/admin/dictionaries");
    await page.waitForLoadState("networkidle");

    await page
      .getByLabel(`Open actions for dictionary ${dictionaryId}`)
      .click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole("button", { name: "Cancel" }).click();
    await expect(confirmDialog).not.toBeVisible();
    expect(deleteRequestCount).toBe(0);

    await page
      .getByLabel(`Open actions for dictionary ${dictionaryId}`)
      .click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    await confirmDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();

    expect(deleteRequestCount).toBe(1);
    expect(deletedDictionaryId).toBe(dictionaryId);
    await expect(page.getByText("No dictionaries found.")).toBeVisible();
  });
});
