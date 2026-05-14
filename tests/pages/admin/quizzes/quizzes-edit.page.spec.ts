import { expect, test } from "@playwright/test";

import { parseQuizzesApiPath } from "./quizzes-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin quizzes edit", () => {
  test("loads quiz and saves changes", async ({ page }) => {
    const quizId = "quiz-playwright-edit";
    const initialName = "Initial quiz name";
    const updatedName = "Playwright Updated Quiz";
    let patchRequestBody = "";

    await page.route("**/api/v1/admin/quizzes**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseQuizzesApiPath(url.pathname);

      if (path.kind === "quiz" && path.id === quizId) {
        if (request.method() === "GET") {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: {
                public_id: quizId,
                name: initialName,
                status: "active",
                created_at: "2026-04-01T10:00:00Z",
                updated_at: "2026-04-01T10:00:00Z",
              },
            }),
          });
          return;
        }

        if (request.method() === "PATCH") {
          patchRequestBody = request.postData() ?? "";
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: {
                public_id: quizId,
              },
            }),
          });
          return;
        }
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

    await page.goto(
      `https://localhost:3000/admin/quizzes/${encodeURIComponent(quizId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await expect(page.getByText(`Quiz ID: ${quizId}`)).toBeVisible();
    await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
      initialName,
    );
    await expect(
      page.getByRole("radio", { name: "Active", exact: true }),
    ).toHaveAttribute("aria-checked", "true");

    await page.getByLabel("Name", { exact: true }).fill(updatedName);
    await page.getByRole("radio", { name: "Inactive", exact: true }).click();

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin\/quizzes(?:\?|$)/);

    expect(patchRequestBody).toBe(
      JSON.stringify({ name: updatedName, status: "inactive" }),
    );
  });
});
