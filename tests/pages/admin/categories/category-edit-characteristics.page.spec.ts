import { expect, test } from "@playwright/test";

import { parseAdminCategoryApiPath } from "./categories-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

const categoryId = "cat-playwright-catc";
const pickableCharacteristicId = "ch-playwright-pickable";

function poolCharacteristic() {
  return {
    public_id: pickableCharacteristicId,
    name: "Playwright Test Char",
    slug: "playwright-test-char",
    type: "text" as const,
    group: "basic_information" as const,
    description: "Pool entry for E2E",
    dictionary: null,
    unit: null,
    min: null,
    max: null,
    max_length: null,
    has_dictionary: false,
    has_unit: false,
    has_min_max: false,
    has_max_length: false,
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-04-01T10:00:00Z",
  };
}

type CategoryAssignmentRow = {
  order: number;
  is_required: boolean;
  characteristic: {
    public_id: string;
    name: string;
    type: string;
    group: string;
  };
};

test.describe("Admin category — characteristics in category", () => {
  test("adds, edits, and removes a characteristic from a category", async ({
    page,
  }) => {
    let categoryAssignments: CategoryAssignmentRow[] = [];
    let lastPostBody = "";
    let lastPatchBody = "";
    let lastDeletedCharacteristicId = "";

    await page.route("**/api/v1/admin/characteristics**", async (route) => {
      if (route.request().method() !== "GET") {
        await route.fulfill({
          status: 404,
          contentType: "application/json",
          body: JSON.stringify({ data: { message: "not mocked" } }),
        });
        return;
      }
      const pool = poolCharacteristic();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            items: [pool],
            total: 1,
          },
        }),
      });
    });

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
                name: "Playwright category",
                slug: "playwright-cat",
                description: null,
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
      }

      if (
        path.kind === "category_characteristics" &&
        path.categoryId === categoryId
      ) {
        if (method === "GET") {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: {
                items: categoryAssignments,
                total: categoryAssignments.length,
              },
            }),
          });
          return;
        }

        if (method === "POST") {
          lastPostBody = request.postData() ?? "";
          const body = JSON.parse(lastPostBody || "{}") as {
            characteristic_id: string;
            order: number;
            is_required: 0 | 1;
          };
          const c = poolCharacteristic();
          categoryAssignments = [
            {
              order: body.order,
              is_required: body.is_required === 1,
              characteristic: {
                public_id: c.public_id,
                name: c.name,
                type: c.type,
                group: c.group,
              },
            },
          ];
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: {} }),
          });
          return;
        }
      }

      if (
        path.kind === "category_characteristic_item" &&
        path.categoryId === categoryId
      ) {
        if (method === "PATCH") {
          lastPatchBody = request.postData() ?? "";
          const body = JSON.parse(lastPatchBody || "{}") as {
            order: number;
            is_required: 0 | 1;
          };
          const row = categoryAssignments[0];
          if (row) {
            row.order = body.order;
            row.is_required = body.is_required === 1;
          }
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: {} }),
          });
          return;
        }

        if (method === "DELETE") {
          lastDeletedCharacteristicId = path.characteristicId;
          categoryAssignments = categoryAssignments.filter(
            (a) => a.characteristic.public_id !== path.characteristicId,
          );
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: {} }),
          });
          return;
        }
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
      page.getByRole("heading", { name: "Characteristics" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Add characteristic" }).click();
    const addDialog = page.getByRole("dialog", { name: "Add characteristic" });
    await expect(addDialog).toBeVisible();

    await addDialog.locator("#category-characteristic-id").click();
    await addDialog
      .getByRole("option", { name: "Playwright Test Char" })
      .click();

    await addDialog.getByRole("button", { name: "Add characteristic" }).click();

    expect(lastPostBody).toBe(
      JSON.stringify({
        characteristic_id: pickableCharacteristicId,
        order: 1,
        is_required: 1,
      }),
    );

    await expect(addDialog).not.toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Playwright Test Char", exact: true }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Edit", exact: true }).click();
    const editDialog = page.getByRole("dialog", {
      name: "Edit characteristic",
    });
    await expect(editDialog).toBeVisible();

    await editDialog.locator("#category-characteristic-edit-order").fill("2");
    await editDialog.getByRole("switch").click();

    await editDialog
      .getByRole("button", { name: "Save characteristic" })
      .click();

    expect(lastPatchBody).toBe(
      JSON.stringify({
        order: 2,
        is_required: 0,
      }),
    );
    await expect(editDialog).not.toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Text", exact: true }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Delete", exact: true }).click();
    const confirmDialog = page.getByRole("alertdialog", {
      name: "Delete characteristic?",
    });
    await expect(confirmDialog).toBeVisible();
    await confirmDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();

    expect(lastDeletedCharacteristicId).toBe(pickableCharacteristicId);
    await expect(confirmDialog).not.toBeVisible();
    await expect(
      page.getByText("No characteristics assigned yet."),
    ).toBeVisible();
  });
});
