import { expect, test } from "@playwright/test";

import { parseAdminDictionaryApiPath } from "./dictionaries-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

interface MockDictionaryItem {
  public_id: string;
  value: string;
  label: string;
  order: number;
  created_at: string;
  updated_at: string;
}

const ts = "2026-04-18T12:00:00Z";

test.describe("Admin dictionaries edit", () => {
  test("loads dictionary and saves metadata", async ({ page }) => {
    const dictionaryId = "dictionary-playwright-metadata";
    const initialName = "Initial dictionary";
    let patchRequestBody = "";

    await page.route("**/api/v1/admin/dictionaries**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminDictionaryApiPath(url.pathname);

      if (
        request.method() === "GET" &&
        path.kind === "dictionary" &&
        path.id === dictionaryId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: dictionaryId,
              name: initialName,
              slug: "initial-slug",
              description: "Original description",
              items: [],
              created_at: ts,
              updated_at: ts,
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "items" &&
        path.dictionaryId === dictionaryId
      ) {
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

      if (
        request.method() === "PATCH" &&
        path.kind === "dictionary" &&
        path.id === dictionaryId
      ) {
        patchRequestBody = request.postData() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: dictionaryId,
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

    await page.goto(
      `https://localhost:3000/admin/dictionaries/${encodeURIComponent(dictionaryId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await expect(page.getByLabel("Name", { exact: true })).toHaveValue(
      initialName,
    );

    const updatedName = "Playwright Updated Dictionary";
    await page.getByLabel("Name", { exact: true }).fill(updatedName);
    await page.getByLabel("Slug", { exact: true }).fill("updated-slug");
    await page
      .locator("#dictionary-description")
      .fill("Updated description body.");

    await page.getByRole("button", { name: "Save changes" }).click();

    expect(patchRequestBody).toBe(
      JSON.stringify({
        name: updatedName,
        slug: "updated-slug",
        description: "Updated description body.",
      }),
    );
  });

  test("creates, edits, and deletes dictionary items", async ({ page }) => {
    const dictionaryId = "dictionary-playwright-items";
    const items: MockDictionaryItem[] = [];
    let itemSeq = 0;
    let lastItemPostBody = "";
    let lastItemPatchBody = "";

    await page.route("**/api/v1/admin/dictionaries**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const method = request.method();
      const path = parseAdminDictionaryApiPath(url.pathname);

      function json(body: unknown) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(body),
        });
      }

      if (
        method === "GET" &&
        path.kind === "dictionary" &&
        path.id === dictionaryId
      ) {
        return json({
          data: {
            public_id: dictionaryId,
            name: "Items CRUD dictionary",
            slug: "items-crud",
            description: null,
            items: [],
            created_at: ts,
            updated_at: ts,
          },
        });
      }

      if (
        method === "GET" &&
        path.kind === "items" &&
        path.dictionaryId === dictionaryId
      ) {
        const sorted = [...items].sort((a, b) => a.order - b.order);
        return json({
          data: {
            items: sorted,
            total: sorted.length,
          },
        });
      }

      if (
        method === "POST" &&
        path.kind === "items" &&
        path.dictionaryId === dictionaryId
      ) {
        lastItemPostBody = request.postData() ?? "";
        const body = JSON.parse(lastItemPostBody || "{}") as {
          value?: string;
          label?: string;
          order?: number;
        };
        itemSeq += 1;
        const publicId = `item-mock-${itemSeq}`;
        const row: MockDictionaryItem = {
          public_id: publicId,
          value: body.value ?? "",
          label: body.label ?? "",
          order: body.order ?? 1,
          created_at: ts,
          updated_at: ts,
        };
        items.push(row);
        return json({ data: { public_id: publicId } });
      }

      if (
        method === "PATCH" &&
        path.kind === "item" &&
        path.dictionaryId === dictionaryId
      ) {
        lastItemPatchBody = request.postData() ?? "";
        const body = JSON.parse(lastItemPatchBody || "{}") as {
          value?: string;
          label?: string;
          order?: number;
        };
        const idx = items.findIndex((i) => i.public_id === path.itemId);
        if (idx === -1) {
          return route.fulfill({ status: 404, body: "{}" });
        }
        const prev = items[idx]!;
        items[idx] = {
          ...prev,
          value: body.value ?? prev.value,
          label: body.label ?? prev.label,
          order: body.order ?? prev.order,
          updated_at: ts,
        };
        return json({ data: { public_id: path.itemId } });
      }

      if (
        method === "DELETE" &&
        path.kind === "item" &&
        path.dictionaryId === dictionaryId
      ) {
        const next = items.filter((i) => i.public_id !== path.itemId);
        items.length = 0;
        items.push(...next);
        return json({ data: { public_id: path.itemId } });
      }

      if (
        method === "PATCH" &&
        path.kind === "dictionary" &&
        path.id === dictionaryId
      ) {
        return json({ data: { public_id: dictionaryId } });
      }

      return json({
        data: {
          items: [],
          total: 0,
        },
      });
    });

    await page.goto(
      `https://localhost:3000/admin/dictionaries/${encodeURIComponent(dictionaryId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: "items" })).toBeVisible();

    await page.getByRole("button", { name: "Add item" }).click();
    const addDialog = page.getByRole("dialog", { name: "Add dictionary item" });
    await addDialog.getByPlaceholder("golden-retriever").fill("poodle");
    await addDialog.getByPlaceholder("Golden Retriever").fill("Poodle");
    await addDialog.getByLabel("Order", { exact: true }).fill("1");
    await addDialog.getByRole("button", { name: "Create item" }).click();

    await expect(
      page.getByRole("cell", { name: "poodle", exact: true }),
    ).toBeVisible();
    expect(lastItemPostBody).toBe(
      JSON.stringify({
        value: "poodle",
        label: "Poodle",
        order: 1,
      }),
    );

    await page.getByRole("button", { name: "Add item" }).click();
    const addSecond = page.getByRole("dialog", { name: "Add dictionary item" });
    await addSecond.getByPlaceholder("golden-retriever").fill("to-delete");
    await addSecond.getByPlaceholder("Golden Retriever").fill("Delete me");
    await addSecond.getByLabel("Order", { exact: true }).fill("2");
    await addSecond.getByRole("button", { name: "Create item" }).click();
    await expect(
      page.getByRole("cell", { name: "to-delete", exact: true }),
    ).toBeVisible();

    await page.getByLabel("Open actions for item item-mock-1").click();
    await page.getByRole("button", { name: "Edit", exact: true }).click();
    const editDialog = page.getByRole("dialog", {
      name: "Edit dictionary item",
    });
    const editLabelInput = editDialog.getByPlaceholder("Golden Retriever");
    await editLabelInput.click();
    await editLabelInput.press("ControlOrMeta+a");
    await editLabelInput.fill("Poodle (updated)");
    await editDialog.getByRole("button", { name: "Save item" }).click();
    await expect(editDialog).not.toBeVisible();
    await expect(page.getByRole("row", { name: /item-mock-1/ })).toContainText(
      "Poodle (updated)",
    );
    expect(lastItemPatchBody).toBe(
      JSON.stringify({
        value: "poodle",
        label: "Poodle (updated)",
        order: 1,
      }),
    );

    await page.getByLabel("Open actions for item item-mock-2").click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    const deleteDialog = page.getByRole("alertdialog", {
      name: "Delete dictionary item?",
    });
    await deleteDialog
      .getByRole("button", { name: "Delete", exact: true })
      .click();
    await expect(
      page.getByRole("cell", { name: "to-delete", exact: true }),
    ).not.toBeVisible();

    await page.getByLabel("Open actions for item item-mock-1").click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    const deleteSecond = page.getByRole("alertdialog", {
      name: "Delete dictionary item?",
    });
    await deleteSecond
      .getByRole("button", { name: "Delete", exact: true })
      .click();
    await expect(page.getByText("No items in this dictionary.")).toBeVisible();
  });

  test("cancels delete dictionary item without calling the API", async ({
    page,
  }) => {
    const dictionaryId = "dictionary-playwright-item-cancel";
    const itemId = "item-existing";
    let deleteItemRequests = 0;

    await page.route("**/api/v1/admin/dictionaries**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const method = request.method();
      const path = parseAdminDictionaryApiPath(url.pathname);

      function json(body: unknown) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(body),
        });
      }

      if (
        method === "GET" &&
        path.kind === "dictionary" &&
        path.id === dictionaryId
      ) {
        return json({
          data: {
            public_id: dictionaryId,
            name: "Cancel delete",
            slug: "cancel-delete",
            description: null,
            items: [],
            created_at: ts,
            updated_at: ts,
          },
        });
      }

      if (
        method === "GET" &&
        path.kind === "items" &&
        path.dictionaryId === dictionaryId
      ) {
        return json({
          data: {
            items: [
              {
                public_id: itemId,
                value: "keep-me",
                label: "Keep this row",
                order: 1,
                created_at: ts,
                updated_at: ts,
              },
            ],
            total: 1,
          },
        });
      }

      if (method === "DELETE" && path.kind === "item") {
        deleteItemRequests += 1;
        return json({ data: { public_id: path.itemId } });
      }

      return json({
        data: {
          items: [],
          total: 0,
        },
      });
    });

    await page.goto(
      `https://localhost:3000/admin/dictionaries/${encodeURIComponent(dictionaryId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Open actions for item item-existing").click();
    await page.getByRole("button", { name: "Delete", exact: true }).click();
    const deleteDialog = page.getByRole("alertdialog", {
      name: "Delete dictionary item?",
    });
    await deleteDialog.getByRole("button", { name: "Cancel" }).click();
    await expect(deleteDialog).not.toBeVisible();
    expect(deleteItemRequests).toBe(0);
    await expect(page.getByText("Keep this row")).toBeVisible();
  });
});
