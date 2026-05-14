import { expect, test } from "@playwright/test";

import { parseAdminCategoryApiPath } from "./categories-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin categories list", () => {
  test("confirms before deleting category", async ({ page }) => {
    const categoryId = "category-playwright-list";
    let deleteRequestCount = 0;
    let deletedCategoryId = "";

    await page.route("**/api/v1/admin/categories**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminCategoryApiPath(url.pathname);

      if (request.method() === "DELETE" && path.kind === "item") {
        deleteRequestCount += 1;
        deletedCategoryId = path.id;

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: categoryId,
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
                        public_id: categoryId,
                        catalog_id: 1,
                        name: "List category",
                        slug: "list-category",
                        description: "For list test",
                        created_at: "2026-04-01T10:00:00Z",
                        updated_at: "2026-04-01T10:00:00Z",
                        catalog: { id: 1, name: "Pets", slug: "pets" },
                        image_id: null,
                        image: null,
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

    await page.goto("https://localhost:3000/admin/categories");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(`Open actions for category ${categoryId}`).click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole("button", { name: "Cancel" }).click();
    await expect(confirmDialog).not.toBeVisible();
    expect(deleteRequestCount).toBe(0);

    await page.getByLabel(`Open actions for category ${categoryId}`).click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    await confirmDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();

    expect(deleteRequestCount).toBe(1);
    expect(deletedCategoryId).toBe(categoryId);
    await expect(page.getByText("No categories found.")).toBeVisible();
  });
});
