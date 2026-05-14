import { expect, test } from "@playwright/test";

const HOME_PAGE_URL = "/demo";

test.describe("visual regression tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_PAGE_URL);
    await page.waitForLoadState("networkidle");
  });

  test("home page", async ({ page }) => {
    await expect(page).toHaveScreenshot("1920.png", { fullPage: true });
  });
});
