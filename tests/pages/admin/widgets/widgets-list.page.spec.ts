import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin widgets list", () => {
  test("confirms before deleting widget", async ({ page }) => {
    const widgetId = "widget-playwright-list";
    let deleteRequestCount = 0;
    let deletedWidgetId = "";

    await page.route("**/api/v1/admin/widgets**", async (route) => {
      const request = route.request();
      const requestUrl = request.url();

      if (request.method() === "DELETE") {
        deleteRequestCount += 1;
        deletedWidgetId = decodeURIComponent(requestUrl.split("/").pop() ?? "");

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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
            items:
              deleteRequestCount === 0
                ? [
                    {
                      public_id: widgetId,
                      type: "hero_section",
                      data: {
                        title: "List widget",
                      },
                      is_active: true,
                      created_at: "2026-04-01T10:00:00Z",
                      updated_at: "2026-04-01T10:00:00Z",
                    },
                  ]
                : [],
            total: deleteRequestCount === 0 ? 1 : 0,
          },
        }),
      });
    });

    await page.goto("https://localhost:3000/admin");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(`Open actions for widget ${widgetId}`).click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();

    const confirmDialog = page.getByRole("alertdialog");
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole("button", { name: "Cancel" }).click();
    await expect(confirmDialog).not.toBeVisible();
    expect(deleteRequestCount).toBe(0);

    await page.getByLabel(`Open actions for widget ${widgetId}`).click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    await confirmDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();

    expect(deleteRequestCount).toBe(1);
    expect(deletedWidgetId).toBe(widgetId);
    await expect(page.getByText("No widgets found.")).toBeVisible();
  });
});
