import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

test.use({
  viewport: { width: 1920, height: 1080 },
});

async function expandIfCollapsed(page: Page, controlsId: string) {
  const toggle = page.locator(`button[aria-controls="${controlsId}"]`);
  if ((await toggle.getAttribute("aria-expanded")) !== "true") {
    await toggle.click();
  }
}

const ADMIN_WIDGETS_API_URL_PATTERN =
  /\/api\/v1\/admin\/widgets(?:\/.*)?(?:\?.*)?$/;

test.describe("Admin widgets edit", () => {
  test("edits hero_section widget", async ({ page }) => {
    const widgetId = "widget-playwright-hero";
    const heroTitle = "Playwright Hero Title Updated";
    const heroSubtitle = "Playwright Hero Subtitle Updated";
    const heroCtaText = "Read More";
    const heroCtaLink = "https://example.com/updated-cta";

    let updateWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "hero_section",
              is_active: true,
              data: {
                title: "Initial hero title",
                subtitle: "Initial hero subtitle",
                cta_text: "Initial CTA",
                cta_link: "https://example.com/initial-cta",
                background_image_id_large_desktop: "bg-large-current",
                background_image_id_desktop: "bg-desktop-current",
                background_image_id_tablet: "bg-tablet-current",
                background_image_id_mobile: "bg-mobile-current",
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        updateWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("radio", { name: "hero_slider" }),
    ).toBeDisabled();
    await expect(page.getByRole("radio", { name: "footer" })).toBeDisabled();

    await page.getByLabel("Title", { exact: true }).fill(heroTitle);
    await page.getByLabel("Subtitle", { exact: true }).fill(heroSubtitle);
    await page.getByLabel("CTA text", { exact: true }).fill(heroCtaText);
    await page.getByLabel("CTA link", { exact: true }).fill(heroCtaLink);
    await page.locator("#hero-background_image_desktop").setInputFiles({
      name: "hero-desktop-updated.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-desktop-updated-image"),
    });

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(updateWidgetRequestBody).toContain('name="type"');
    expect(updateWidgetRequestBody).toContain("hero_section");
    expect(updateWidgetRequestBody).toContain('name="is_active"');
    expect(updateWidgetRequestBody).toContain('name="data[title]"');
    expect(updateWidgetRequestBody).toContain(heroTitle);
    expect(updateWidgetRequestBody).toContain('name="data[subtitle]"');
    expect(updateWidgetRequestBody).toContain(heroSubtitle);
    expect(updateWidgetRequestBody).toContain('name="data[cta_text]"');
    expect(updateWidgetRequestBody).toContain(heroCtaText);
    expect(updateWidgetRequestBody).toContain('name="data[cta_link]"');
    expect(updateWidgetRequestBody).toContain(heroCtaLink);
    expect(updateWidgetRequestBody).toContain(
      'name="files[background_image_desktop]"; filename="hero-desktop-updated.png"',
    );
    expect(updateWidgetRequestBody).toContain(
      'name="data[background_image_id_large_desktop]"',
    );
    expect(updateWidgetRequestBody).toContain("bg-large-current");
    expect(updateWidgetRequestBody).toContain(
      'name="data[background_image_id_tablet]"',
    );
    expect(updateWidgetRequestBody).toContain("bg-tablet-current");
    expect(updateWidgetRequestBody).toContain(
      'name="data[background_image_id_mobile]"',
    );
    expect(updateWidgetRequestBody).toContain("bg-mobile-current");
    expect(updateWidgetRequestBody).not.toContain(
      'name="data[background_image_id_desktop]"',
    );
  });

  test("edits hero_slider widget", async ({ page }) => {
    const widgetId = "widget-playwright-hero-slider";
    const slideTitle = "Playwright Slider Title Updated";
    const slideSubtitle = "Playwright Slider Subtitle Updated";
    const slideCtaText = "Updated CTA";
    const slideCtaLink = "/updated-breeders";

    let updateWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "hero_slider",
              is_active: true,
              data: {
                slides: [
                  {
                    title: "Initial slider title",
                    subtitle: "Initial slider subtitle",
                    cta_text: "Initial slider CTA",
                    cta_link: "/initial-slider-cta",
                    image_id: "slider-image-current",
                  },
                ],
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        updateWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");
    await expandIfCollapsed(page, "hero-slide-panel-0");

    await page.getByLabel("Title", { exact: true }).fill(slideTitle);
    await page.getByLabel("Subtitle", { exact: true }).fill(slideSubtitle);
    await page.getByLabel("CTA text", { exact: true }).fill(slideCtaText);
    await page.getByLabel("CTA link", { exact: true }).fill(slideCtaLink);
    await page.getByLabel("Slide image").setInputFiles({
      name: "hero-slider-updated.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-slider-updated-image"),
    });

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(updateWidgetRequestBody).toContain('name="type"');
    expect(updateWidgetRequestBody).toContain("hero_slider");
    expect(updateWidgetRequestBody).toContain('name="is_active"');
    expect(updateWidgetRequestBody).toContain('name="data[slides][0][title]"');
    expect(updateWidgetRequestBody).toContain(slideTitle);
    expect(updateWidgetRequestBody).toContain(
      'name="data[slides][0][subtitle]"',
    );
    expect(updateWidgetRequestBody).toContain(slideSubtitle);
    expect(updateWidgetRequestBody).toContain(
      'name="data[slides][0][cta_text]"',
    );
    expect(updateWidgetRequestBody).toContain(slideCtaText);
    expect(updateWidgetRequestBody).toContain(
      'name="data[slides][0][cta_link]"',
    );
    expect(updateWidgetRequestBody).toContain(slideCtaLink);
    expect(updateWidgetRequestBody).toContain(
      'name="files[slides.0]"; filename="hero-slider-updated.png"',
    );
    expect(updateWidgetRequestBody).not.toContain(
      'name="data[slides][0][image_id]"',
    );
  });

  test("edits about_us widget", async ({ page }) => {
    const widgetId = "widget-playwright-about";
    const title = "Playwright About Title Updated";
    const content = "Updated about content from Playwright.";

    let updateWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "about_us",
              is_active: true,
              data: {
                title: "Initial about title",
                content: "Initial about content.",
                image_id: "about-image-existing",
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        updateWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");

    await page.locator("#about-us-title").fill(title);
    await page.locator("#about-us-content").fill(content);

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(updateWidgetRequestBody).toContain('name="type"');
    expect(updateWidgetRequestBody).toContain("about_us");
    expect(updateWidgetRequestBody).toContain('name="is_active"');
    expect(updateWidgetRequestBody).toContain('name="data[title]"');
    expect(updateWidgetRequestBody).toContain(title);
    expect(updateWidgetRequestBody).toContain('name="data[content]"');
    expect(updateWidgetRequestBody).toContain(content);
    expect(updateWidgetRequestBody).toContain('name="data[image_id]"');
    expect(updateWidgetRequestBody).toContain("about-image-existing");
    expect(updateWidgetRequestBody).not.toContain('name="files[image]"');
  });

  test("edits about_us widget with new image", async ({ page }) => {
    const widgetId = "widget-playwright-about-image";
    const title = "About with new image";

    let updateWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "about_us",
              is_active: true,
              data: {
                title: "Initial about title",
                content: "Initial about content.",
                image_id: "about-image-existing",
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        updateWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");

    await page.locator("#about-us-title").fill(title);
    await page.locator("#about-us-image").setInputFiles({
      name: "about-updated.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-about-updated-image"),
    });

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(updateWidgetRequestBody).toContain('name="type"');
    expect(updateWidgetRequestBody).toContain("about_us");
    expect(updateWidgetRequestBody).toContain(
      'name="files[image]"; filename="about-updated.png"',
    );
    expect(updateWidgetRequestBody).not.toContain('name="data[image_id]"');
  });

  test("edits contact_us widget", async ({ page }) => {
    const widgetId = "widget-playwright-contact";
    const title = "Playwright Contact Title Updated";
    const email = "updated@example.com";
    const phone = "+1 555 0199";
    const address = "456 Updated Street";

    let updateWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "contact_us",
              is_active: true,
              data: {
                title: "Initial contact title",
                email: "initial@example.com",
                phone: "+1 555 0000",
                address: "Initial address",
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        updateWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");

    await page.locator("#contact-us-title").fill(title);
    await page.locator("#contact-us-email").fill(email);
    await page.locator("#contact-us-phone").fill(phone);
    await page.locator("#contact-us-address").fill(address);

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(updateWidgetRequestBody).toContain('name="type"');
    expect(updateWidgetRequestBody).toContain("contact_us");
    expect(updateWidgetRequestBody).toContain('name="is_active"');
    expect(updateWidgetRequestBody).toContain('name="data[title]"');
    expect(updateWidgetRequestBody).toContain(title);
    expect(updateWidgetRequestBody).toContain('name="data[email]"');
    expect(updateWidgetRequestBody).toContain(email);
    expect(updateWidgetRequestBody).toContain('name="data[phone]"');
    expect(updateWidgetRequestBody).toContain(phone);
    expect(updateWidgetRequestBody).toContain('name="data[address]"');
    expect(updateWidgetRequestBody).toContain(address);
  });

  test("edits footer widget preserving social icon id", async ({ page }) => {
    const widgetId = "widget-playwright-footer";
    const contactInfo = "Updated footer contact text.";
    const copyrightInfo = "© Updated Playwright";

    let updateWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "footer",
              is_active: true,
              data: {
                contact_info: "Initial contact",
                copyright_info: "© Initial",
                link_blocks: [
                  {
                    title: "Company",
                    links: [{ name: "About", url: "/about" }],
                  },
                ],
                social_links: [
                  {
                    url: "https://example.com/social",
                    icon_id: "footer-social-icon-existing",
                  },
                ],
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        updateWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");
    await expandIfCollapsed(page, "footer-social-link-panel-0");

    await page.locator("#footer-contact-info").fill(contactInfo);
    await page.locator("#footer-copyright-info").fill(copyrightInfo);

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(updateWidgetRequestBody).toContain('name="type"');
    expect(updateWidgetRequestBody).toContain("footer");
    expect(updateWidgetRequestBody).toContain('name="data[contact_info]"');
    expect(updateWidgetRequestBody).toContain(contactInfo);
    expect(updateWidgetRequestBody).toContain('name="data[copyright_info]"');
    expect(updateWidgetRequestBody).toContain(copyrightInfo);
    expect(updateWidgetRequestBody).toContain(
      'name="data[social_links][0][icon_id]"',
    );
    expect(updateWidgetRequestBody).toContain("footer-social-icon-existing");
    expect(updateWidgetRequestBody).not.toContain("files[social_links");
  });

  test("edits footer widget with new social icon file", async ({ page }) => {
    const widgetId = "widget-playwright-footer-icon";
    const contactInfo = "Footer text with new icon.";

    let updateWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "footer",
              is_active: true,
              data: {
                contact_info: "Initial",
                copyright_info: "© Initial",
                link_blocks: [
                  {
                    title: "Company",
                    links: [{ name: "About", url: "/about" }],
                  },
                ],
                social_links: [
                  {
                    url: "https://example.com/social",
                    icon_id: "footer-social-icon-existing",
                  },
                ],
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        updateWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");
    await expandIfCollapsed(page, "footer-social-link-panel-0");

    await page.locator("#footer-contact-info").fill(contactInfo);
    await page.locator("#footer-social-icon-0").setInputFiles({
      name: "social-updated.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-footer-social-updated"),
    });

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(updateWidgetRequestBody).toContain('name="type"');
    expect(updateWidgetRequestBody).toContain("footer");
    expect(updateWidgetRequestBody).toContain(
      'name="files[social_links.0.icon]"; filename="social-updated.png"',
    );
    expect(updateWidgetRequestBody).not.toContain(
      'name="data[social_links][0][icon_id]"',
    );
  });

  test("shows server validation for hero_slider nested fields", async ({
    page,
  }) => {
    const widgetId = "widget-playwright-validation";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: widgetId,
              type: "hero_slider",
              is_active: true,
              data: {
                slides: [
                  {
                    title: "Initial slide 1 title",
                    subtitle: "Initial slide 1 subtitle",
                    cta_text: "Initial slide 1 CTA",
                    cta_link: "https://example.com/one",
                    image_id: "slider-image-1",
                  },
                  {
                    title: "Initial slide 2 title",
                    subtitle: "Initial slide 2 subtitle",
                    cta_text: "Initial slide 2 CTA",
                    cta_link: "https://example.com/two",
                    image_id: "slider-image-2",
                  },
                ],
              },
            },
          }),
        });
        return;
      }

      if (request.method() === "PATCH") {
        await route.fulfill({
          status: 422,
          contentType: "application/json",
          body: JSON.stringify({
            type: "ApiValidationException",
            message: "Some data did not pass validation.",
            data: {
              "data.slides.1.cta_link": [
                "The slides.*.cta_link field must be a valid URL.",
              ],
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

    await page.goto(`https://localhost:3000/admin/widgets/${widgetId}/edit`);
    await page.waitForLoadState("networkidle");
    await expandIfCollapsed(page, "hero-slide-panel-1");

    await page.locator("#hero-slider-cta-link-1").fill("not-a-url");
    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(
      new RegExp(`/admin/widgets/${widgetId}/edit(?:\\?|$)`),
    );
    await expect(page.getByRole("alert").first()).toContainText(
      "Some data did not pass validation.",
    );
    await expect(
      page.getByText("The slides.*.cta_link field must be a valid URL."),
    ).toBeVisible();
  });
});
