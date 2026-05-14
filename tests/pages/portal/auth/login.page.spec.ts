import {
  HttpResponse,
  expect,
  http,
  test,
} from "next/experimental/testmode/playwright/msw";

import { API_BASE_URL } from "@constants";

const LOGIN_PAGE_URL = "/login";

test.describe("visual regression tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_PAGE_URL);
    await page.waitForLoadState("networkidle");
  });

  test("login", async ({ page, viewport, msw }) => {
    await test.step("default", async () => {
      await expect(page).toHaveScreenshot(`default-${viewport?.width}.png`, {
        fullPage: true,
      });
    });

    await test.step("filled", async () => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');

      await emailInput.fill("user_name@gmail.com");
      await passwordInput.fill("12345678");
      await passwordInput.blur();

      await expect(page).toHaveScreenshot(`filled-${viewport?.width}.png`);
    });

    await test.step("invalid credentials", async () => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');

      await emailInput.fill("error_user_name@gmail.com");
      await passwordInput.fill("12345678");

      msw.use(
        http.post(`${API_BASE_URL}/portal/auth/login`, () =>
          HttpResponse.json(
            {
              data: {
                type: "InvalidCredentials",
                message: "Invalid credentials",
              },
            },
            {
              status: 401,
            },
          ),
        ),
      );

      await page.click("button[type=submit]");

      await expect(
        page.locator('text="Incorrect email or password"'),
      ).toBeVisible();

      await expect(page).toHaveScreenshot(
        `invalid-credentials-${viewport?.width}.png`,
      );
    });

    await test.step("server error", async () => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');

      await emailInput.fill("user_name@gmail.com");
      await passwordInput.fill("12345678");

      msw.use(
        http.post(`${API_BASE_URL}/portal/auth/login`, () =>
          HttpResponse.json(
            {
              data: {
                type: "ServerError",
                message: "Server error",
              },
            },
            {
              status: 500,
            },
          ),
        ),
      );

      await page.click("button[type=submit]");

      await expect(page.locator('text="Something went wrong"')).toBeVisible();

      await expect(page).toHaveScreenshot(
        `server-error-${viewport?.width}.png`,
        { fullPage: true },
      );
    });
  });
});
