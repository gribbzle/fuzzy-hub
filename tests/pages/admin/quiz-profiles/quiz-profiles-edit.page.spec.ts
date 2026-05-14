import { expect, test } from "@playwright/test";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin quiz profiles edit", () => {
  test("sends property weights patch with weights payload", async ({
    page,
  }) => {
    const profileId = "quiz-profile-playwright-edit";
    let patchWeightsRequestBody = "";

    await page.route("**/api/v1/admin/quiz-profiles/**", async (route) => {
      const request = route.request();
      const pathname = new URL(request.url()).pathname;

      if (
        request.method() === "GET" &&
        pathname === `/api/v1/admin/quiz-profiles/${profileId}`
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: profileId,
              name: "Playwright profile",
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        pathname === `/api/v1/admin/quiz-profiles/${profileId}/property-weights`
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

      if (
        request.method() === "PATCH" &&
        pathname === `/api/v1/admin/quiz-profiles/${profileId}/property-weights`
      ) {
        patchWeightsRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: {} }),
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

    await page.goto(
      `https://localhost:3000/admin/quiz-profiles/${profileId}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Property weights" }),
    ).toBeVisible();

    await page
      .locator('[role="radiogroup"]')
      .first()
      .getByRole("radio", { name: "High" })
      .click();
    await page.getByRole("button", { name: "Save weights" }).click();

    const parsed = JSON.parse(patchWeightsRequestBody) as {
      weights: Record<string, string>;
    };

    expect(parsed.weights).toBeDefined();
    expect(parsed.weights.time).toBe("high");
    expect(parsed.weights.activity).toBe("medium");
    expect(parsed.weights.budget).toBe("medium");
  });
});
