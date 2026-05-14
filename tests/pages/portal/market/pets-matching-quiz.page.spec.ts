import { expect, test } from "@playwright/test";

const PMQ_PAGE_URL = "/demo/pets-matching-quiz";

test.describe("visual regression tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PMQ_PAGE_URL);
    await page.waitForLoadState("networkidle");
  });

  test("PMQ", async ({ page, viewport }) => {
    await test.step("Step 1", async () => {
      await expect(page).toHaveScreenshot(`step-1-${viewport?.width}.png`, {
        fullPage: true,
      });

      await page
        .getByText("I’m home most of the time (I work from home)")
        .click();

      await page.getByText("Continue").click();
    });

    await test.step("go to Step 12", async () => {
      await page.getByText("A few hours in the morning or evening").click();
      await page.getByText("Continue").click();

      await page.getByText("An apartment or condo").click();
      await page.getByText("Continue").click();

      await page.getByText("Yes, older kids or teens").click();
      await page.getByText("Continue").click();

      await page
        .getByText("I prefer a low-maintenance pet (minimal grooming)")
        .click();
      await page.getByText("Continue").click();

      await page.getByText("I prefer a very quiet pet").click();
      await page.getByText("Continue").click();

      await page.getByText("First-time pet owner").click();
      await page.getByText("Continue").click();

      await page.getByText("A mix of both").click();
      await page.getByText("Continue").click();

      await page.getByText("Prefer a calm and mellow pet").click();
      await page.getByText("Continue").click();

      await page.getByText("No allergies").click();
      await page.getByText("Continue").click();

      await page.getByText("Protection and security").click();
      await page.getByText("Continue").click();
    });
  });
});
