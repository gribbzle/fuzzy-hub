import { expect, test } from "@playwright/test";

const PAGE_URL = "/demo/account/settings";

test.describe("visual regression tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForLoadState("networkidle");
  });

  test("Customer Portal: Account Settings", async ({ page, viewport }) => {
    await expect(page).toHaveScreenshot(
      `account-settings-${viewport?.width}.png`,
      { fullPage: true },
    );
  });
});
