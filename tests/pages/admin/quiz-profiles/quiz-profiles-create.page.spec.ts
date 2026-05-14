import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 1920, height: 1080 },
});

const createdId = "quiz-profile-playwright-created";
const ts = "2026-04-01T10:00:00Z";

test.describe("Admin quiz profiles create", () => {
  test("creates profile and navigates to edit", async ({ page }) => {
    const name = "Playwright New Quiz Profile";
    let createRequestBody = "";

    await page.route("**/api/v1/admin/quiz-profiles**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const pathname = url.pathname;

      if (
        request.method() === "POST" &&
        pathname === "/api/v1/admin/quiz-profiles"
      ) {
        createRequestBody = request.postData() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: createdId,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        pathname === `/api/v1/admin/quiz-profiles/${createdId}`
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: createdId,
              name,
              created_at: ts,
              updated_at: ts,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        pathname === `/api/v1/admin/quiz-profiles/${createdId}/property-weights`
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              time: "medium",
              activity: "medium",
              space: "medium",
              kids: "medium",
              allergy: "medium",
              grooming: "medium",
              interaction: "medium",
              travel: "medium",
              budget: "medium",
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 405,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            message: "Method not allowed",
          },
        }),
      });
    });

    await page.goto("https://localhost:3000/admin/quiz-profiles/new");
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Name", { exact: true }).fill(name);

    await page.getByRole("button", { name: "Create profile" }).click();

    await expect(page).toHaveURL(
      new RegExp(`/admin/quiz-profiles/${encodeURIComponent(createdId)}/edit`),
    );

    expect(createRequestBody).toBe(JSON.stringify({ name }));

    await expect(
      page.getByRole("heading", { name: "Quiz profile" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Property weights" }),
    ).toBeVisible();
  });
});
