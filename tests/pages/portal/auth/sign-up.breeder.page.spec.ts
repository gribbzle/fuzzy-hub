import {
  HttpResponse,
  expect,
  http,
  test,
} from "next/experimental/testmode/playwright/msw";

import { API_BASE_URL } from "@constants";

const SIGN_UP_PAGE_URL = "/sign-up";

test.describe("visual regression tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SIGN_UP_PAGE_URL);
    await page.waitForLoadState("networkidle");
  });

  test("sign up (breeder flow)", async ({ page, viewport, msw }) => {
    msw.use(
      http.post(`${API_BASE_URL}/portal/registration`, () => {
        return HttpResponse.json(
          {
            data: {
              public_id: "7f8b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
              profile_type: "breeder",
              expires_at: "2023-04-29T16:57:48Z",
            },
          },
          {
            status: 200,
          },
        );
      }),
    );

    msw.use(
      http.post(`${API_BASE_URL}/portal/registration/:sessionId/:step`, () => {
        return HttpResponse.json(
          {
            data: {
              public_id: "7f8b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
              profile_type: "breeder",
              expires_at: "2023-04-29T16:57:48Z",
            },
          },
          {
            status: 200,
          },
        );
      }),
    );

    await test.step("profile type", async () => {
      await page.getByText("I breed or rehome pets").click();

      await expect(page).toHaveScreenshot(
        `profile-type-${viewport?.width}.png`,
      );
    });

    await test.step("email address", async () => {
      await page.click("button[type=submit]");
      await expect(page.locator("input[name=email]")).toBeVisible();

      await expect(page).toHaveScreenshot(
        `email-address-${viewport?.width}.png`,
      );
    });

    await test.step("email confirmation", async () => {
      await page.locator("input[name=email]").fill("alex.brown@gmail.com");
      await page.getByText("I agree").click();
      await page.click("button[type=submit]");
      await expect(page.locator("input[name=verification_code]")).toBeVisible();

      await expect(page).toHaveScreenshot(
        `email-confirmation-${viewport?.width}.png`,
      );
    });

    await test.step("password setup", async () => {
      await page.locator("input[name=verification_code]").fill("123456");
      await page.click("button[type=submit]");
      await expect(page.locator("input[name=password]")).toBeVisible();

      await expect(page).toHaveScreenshot(
        `password-setup-${viewport?.width}.png`,
      );
    });

    await test.step("personal information", async () => {
      await page.locator("input[name=password]").fill("Aa123457!");
      await page.locator("input[name=password_confirmation]").fill("Aa123457!");
      await page.click("button[type=submit]");
      await expect(page.locator("input[name=full_name]")).toBeVisible();

      await expect(page).toHaveScreenshot(
        `personal-information-${viewport?.width}.png`,
        {
          fullPage: true,
        },
      );
    });

    await test.step("account verification", async () => {
      await page.locator("input[name=full_name]").fill("full name");
      await page.locator("textarea[name=about_me]").fill("about me");
      await page.click("button[type=submit]");
      await expect(page.locator("input[name=company_name]")).toBeVisible();
      await page.mouse.move(0, 0);

      await expect(page).toHaveScreenshot(
        `account-verification-${viewport?.width}.png`,
        {
          fullPage: true,
        },
      );
    });

    await test.step("finish", async () => {
      await page.locator("input[name=company_name]").fill("company name");
      await page.locator("input[name=company_address]").fill("company address");
      await page.locator("input[name=tax_id]").fill("123456");
      await page.locator("input[name=business_license_number]").fill("123456");
      const fileInputs = page.locator("input[type=file]");

      const fileMock = {
        name: "file.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("this is test"),
      };

      await expect(fileInputs).toHaveCount(2);
      await fileInputs.nth(0).setInputFiles(fileMock);
      await fileInputs.nth(1).setInputFiles(fileMock);
      await page.click("button[type=submit]");
      await expect(page.getByText("Pending Admin Approval")).toBeVisible();

      await expect(page).toHaveScreenshot(`finish-${viewport?.width}.png`, {
        fullPage: true,
      });
    });
  });
});
