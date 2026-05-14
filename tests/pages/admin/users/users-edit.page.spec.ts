import { expect, test } from "@playwright/test";

import { parseAdminUsersApiPath } from "./users-test-helpers";

test.use({
  viewport: { width: 1920, height: 1080 },
});

test.describe("Admin user edit", () => {
  test("submits PATCH without password when password left blank", async ({
    page,
  }) => {
    const userId = "user-playwright-edit-001";
    let patchBody: Record<string, unknown> | null = null;

    await page.route("**/api/v1/admin/users**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (
        request.method() === "GET" &&
        path.kind === "user" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "before@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profiles" &&
        path.userId === userId
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
        path.kind === "user" &&
        path.userId === userId
      ) {
        patchBody = request.postDataJSON() as Record<string, unknown>;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "after@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T11:00:00Z",
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: {} }),
      });
    });

    await page.goto(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Email", { exact: true }).fill("after@example.com");

    await page
      .getByRole("button", { name: "Save changes", exact: true })
      .click();

    await expect(page.getByText("User updated successfully.")).toBeVisible();

    expect(patchBody).not.toBeNull();
    const submitted = patchBody as unknown as Record<string, unknown>;
    expect(submitted.email).toBe("after@example.com");
    expect(submitted.password).toBeUndefined();
  });

  test("submits PATCH with password when new password is set", async ({
    page,
  }) => {
    const userId = "user-playwright-edit-password";
    let patchBody: Record<string, unknown> | null = null;

    await page.route("**/api/v1/admin/users**", async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const path = parseAdminUsersApiPath(url.pathname);

      if (
        request.method() === "GET" &&
        path.kind === "user" &&
        path.userId === userId
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "pwd-user@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T10:00:00Z",
            },
          }),
        });
        return;
      }

      if (
        request.method() === "GET" &&
        path.kind === "profiles" &&
        path.userId === userId
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
        path.kind === "user" &&
        path.userId === userId
      ) {
        patchBody = request.postDataJSON() as Record<string, unknown>;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: userId,
              email: "pwd-user@example.com",
              email_verified_at: null,
              created_at: "2026-04-01T10:00:00Z",
              updated_at: "2026-04-01T11:00:00Z",
            },
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ data: {} }),
      });
    });

    await page.goto(
      `https://localhost:3000/admin/users/${encodeURIComponent(userId)}/edit`,
    );
    await page.waitForLoadState("networkidle");

    await page
      .getByLabel("New password", { exact: true })
      .fill("NewSecurePass1");

    await page
      .getByRole("button", { name: "Save changes", exact: true })
      .click();

    await expect(page.getByText("User updated successfully.")).toBeVisible();

    expect(patchBody).not.toBeNull();
    const submitted = patchBody as unknown as Record<string, unknown>;
    expect(submitted.email).toBe("pwd-user@example.com");
    expect(submitted.password).toBe("NewSecurePass1");
  });
});
