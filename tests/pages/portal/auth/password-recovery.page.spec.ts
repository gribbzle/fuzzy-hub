import {
  HttpResponse,
  expect,
  http,
  test,
} from "next/experimental/testmode/playwright/msw";

import { API_BASE_URL } from "@constants";

const PASSWORD_RECOVERY_PAGE_URL = "/password-recovery";

test.describe("visual regression tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PASSWORD_RECOVERY_PAGE_URL);
    await page.waitForLoadState("networkidle");
  });

  test("password recovery", async ({ page, viewport, msw }) => {
    await test.step("default", async () => {
      await expect(page).toHaveScreenshot(`default-${viewport?.width}.png`);
    });

    await test.step("secret question", async () => {
      await page
        .getByRole("link", { name: "Recover by secret question" })
        .click();
      await page.locator("input[name=email]").fill("user_name@gmail.com");
      await page.locator("input[name=answer]").focus();

      await expect(page).toHaveScreenshot(
        `secret-question-${viewport?.width}.png`,
      );

      await page.getByRole("button", { name: "Back" }).click();
    });

    await test.step("code", async () => {
      await page.locator("input[name=email]").fill("user_name@gmail.com");

      msw.use(
        http.post(`${API_BASE_URL}/portal/password-recovery`, () =>
          HttpResponse.json(
            {
              data: {
                description: "Password recovery code sent successfully",
              },
            },
            {
              status: 200,
            },
          ),
        ),
      );

      await page.click("button[type=submit]");
      await expect(page.locator('text="Secret code"')).toBeVisible();
      await expect(page).toHaveScreenshot(`code-${viewport?.width}.png`);
    });

    await test.step("invalid code", async () => {
      await page.locator("input[name=code]").fill("234456");

      msw.use(
        http.post(`${API_BASE_URL}/portal/password-recovery/verify-code`, () =>
          HttpResponse.json(
            {
              data: {
                type: "InvalidPasswordRecoveryCode",
                message: "Invalid or expired password recovery code",
              },
            },
            {
              status: 400,
            },
          ),
        ),
      );

      await page.click("button[type=submit]");

      await expect(
        page.locator('text="Invalid verification code"'),
      ).toBeVisible();

      await expect(page).toHaveScreenshot(
        `invalid-code-${viewport?.width}.png`,
      );
    });

    await test.step("new password", async () => {
      await page.locator('input[name="code"]').fill("123456");

      msw.use(
        http.post(`${API_BASE_URL}/portal/password-recovery/verify-code`, () =>
          HttpResponse.json(
            {
              data: {
                description: "Password recovery code verified successfully",
                public_id: "550e8400-e29b-41d4-a716-446655440000",
              },
            },
            {
              status: 200,
            },
          ),
        ),
      );

      await page.click("button[type=submit]");
      await expect(page.locator('text="New password"')).toBeVisible();

      await expect(page).toHaveScreenshot(
        `new-password-${viewport?.width}.png`,
      );
    });

    await test.step("finish", async () => {
      await page.locator("input[name=password]").fill("Aa123457!");
      await page.locator("input[name=password_confirmation]").fill("Aa123457!");

      msw.use(
        http.patch(`${API_BASE_URL}/portal/password-recovery`, () =>
          HttpResponse.json(
            {
              data: {
                message: "Password successfully reset",
              },
            },
            {
              status: 200,
            },
          ),
        ),
      );

      await page.click("button[type=submit]");
      await expect(page.locator('text="All set!"')).toBeVisible();
      await expect(page).toHaveScreenshot(`finish-${viewport?.width}.png`);
    });
  });
});
