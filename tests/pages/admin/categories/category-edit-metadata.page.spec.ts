import { expect, test } from "@playwright/test";

import { parseAdminCategoryApiPath } from "./categories-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

const categoryId = "cat-playwright-edit-md";

test.describe("Admin category — update metadata", () => {
  test("saves name, slug, and description", async ({ page }) => {
    const initial = {
      name: "Playwright category",
      slug: "playwright-cat",
      description: null as string | null,
    };
    const updated = {
      name: "Playwright category updated",
      slug: "playwright-cat-updated",
      description: "Updated from Playwright metadata spec.",
    };
    let patchBody = "";

    await page.route("**/api/v1/admin/categories**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminCategoryApiPath(url.pathname);
      const method = request.method();

      if (path.kind === "item" && path.id === categoryId) {
        if (method === "GET") {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: {
                public_id: categoryId,
                catalog_id: 1,
                name: initial.name,
                slug: initial.slug,
                description: initial.description,
                created_at: "2026-04-01T10:00:00Z",
                updated_at: "2026-04-01T10:00:00Z",
                catalog: { id: 1, name: "Pets", slug: "pets" },
                image_id: null,
                image: null,
              },
            }),
          });
          return;
        }

        if (method === "PATCH") {
          patchBody = request.postData() ?? "";
          initial.name = updated.name;
          initial.slug = updated.slug;
          initial.description = updated.description;
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: {} }),
          });
          return;
        }
      }

      if (path.kind === "collection" && method === "GET") {
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
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: { items: [], total: 0 } }),
      });
    });

    const editUrl = `https://localhost:3000/admin/categories/${encodeURIComponent(categoryId)}/edit`;
    await page.goto(editUrl);
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Edit category" }),
    ).toBeVisible();

    await page.getByLabel("Name", { exact: true }).fill(updated.name);
    await page.getByLabel("Slug", { exact: true }).fill(updated.slug);
    await page
      .getByLabel("Description", { exact: true })
      .fill(updated.description);

    await page.getByRole("button", { name: "Save changes" }).click();

    expect(patchBody.length).toBeGreaterThan(0);
    expect(patchBody).toContain(updated.name);
    expect(patchBody).toContain(updated.slug);
    expect(patchBody).toContain(updated.description);

    await expect(
      page.getByText("Category updated successfully.", { exact: true }),
    ).toBeVisible();
  });
});
