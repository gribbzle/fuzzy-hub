import { expect, test } from "@playwright/test";

import { parseQuizzesApiPath } from "./quizzes-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin quizzes create", () => {
  test("creates quiz", async ({ page }) => {
    const quizName = "Playwright New Quiz";
    let createRequestBody = "";

    await page.route("**/api/v1/admin/quizzes**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseQuizzesApiPath(url.pathname);

      if (request.method() === "POST" && path.kind === "collection") {
        createRequestBody = request.postData() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: "quiz-playwright-created",
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

    await page.goto("https://localhost:3000/admin/quizzes/new");
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Name", { exact: true }).fill(quizName);
    await page.getByRole("radio", { name: "Inactive", exact: true }).click();

    await page.getByRole("button", { name: "Create quiz" }).click();

    await expect(page).toHaveURL(/\/admin\/quizzes(?:\?|$)/);

    expect(createRequestBody).toBe(
      JSON.stringify({ name: quizName, status: "inactive" }),
    );
  });
});
