import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

test.use({
  viewport: { width: 1920, height: 1080 },
});

/** Match widget list/create API on the real backend host (glob is flaky for this URL on WebKit). */
const ADMIN_WIDGETS_API_URL_PATTERN =
  /\/api\/v1\/admin\/widgets(?:\/.*)?(?:\?.*)?$/;

async function expandIfCollapsed(page: Page, controlsId: string) {
  const toggle = page.locator(`button[aria-controls="${controlsId}"]`);
  if ((await toggle.getAttribute("aria-expanded")) !== "true") {
    await toggle.click();
  }
}

test.describe("Admin widgets create", () => {
  test("creates hero_section widget", async ({ page }) => {
    const heroTitle = "Playwright Hero Title";
    const heroSubtitle = "Playwright Hero Subtitle";
    const heroCtaText = "Get Started";
    const heroCtaLink = "https://example.com/cta";

    let createWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
        createWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: "widget-playwright-hero",
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

    await page.goto("https://localhost:3000/admin/widgets/new");
    await page.waitForLoadState("networkidle");

    await page.getByLabel("Title", { exact: true }).fill(heroTitle);
    await page.getByLabel("Subtitle", { exact: true }).fill(heroSubtitle);
    await page.getByLabel("CTA text", { exact: true }).fill(heroCtaText);
    await page.getByLabel("CTA link", { exact: true }).fill(heroCtaLink);
    await page.locator("#hero-background_image_large_desktop").setInputFiles({
      name: "hero-large-desktop.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-large-desktop-image"),
    });
    await page.locator("#hero-background_image_desktop").setInputFiles({
      name: "hero-desktop.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-desktop-image"),
    });
    await page.locator("#hero-background_image_tablet").setInputFiles({
      name: "hero-tablet.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-tablet-image"),
    });
    await page.locator("#hero-background_image_mobile").setInputFiles({
      name: "hero-mobile.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-mobile-image"),
    });

    await page.getByRole("button", { name: "Create widget" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(createWidgetRequestBody).toContain('name="type"');
    expect(createWidgetRequestBody).toContain("hero_section");
    expect(createWidgetRequestBody).toContain('name="is_active"');
    expect(createWidgetRequestBody).toContain('name="data[title]"');
    expect(createWidgetRequestBody).toContain(heroTitle);
    expect(createWidgetRequestBody).toContain('name="data[subtitle]"');
    expect(createWidgetRequestBody).toContain(heroSubtitle);
    expect(createWidgetRequestBody).toContain('name="data[cta_text]"');
    expect(createWidgetRequestBody).toContain(heroCtaText);
    expect(createWidgetRequestBody).toContain('name="data[cta_link]"');
    expect(createWidgetRequestBody).toContain(heroCtaLink);
    expect(createWidgetRequestBody).toContain(
      'name="files[background_image_large_desktop]"; filename="hero-large-desktop.png"',
    );
    expect(createWidgetRequestBody).toContain(
      'name="files[background_image_desktop]"; filename="hero-desktop.png"',
    );
    expect(createWidgetRequestBody).toContain(
      'name="files[background_image_tablet]"; filename="hero-tablet.png"',
    );
    expect(createWidgetRequestBody).toContain(
      'name="files[background_image_mobile]"; filename="hero-mobile.png"',
    );
  });

  test("submits only selected type data on create", async ({ page }) => {
    const contactTitle = "Create Contact Widget";
    const contactEmail = "contact@fuzzyhub.test";
    const contactPhone = "+1 555 0101";
    const contactAddress = "123 Contact Street";

    let createWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
        createWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: "widget-playwright-contact-only",
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

    await page.goto("https://localhost:3000/admin/widgets/new");
    await page.waitForLoadState("networkidle");

    await page.getByRole("radio", { name: "hero_section" }).click();
    await page
      .getByLabel("Title", { exact: true })
      .fill("Temporary hero title");
    await page.getByRole("radio", { name: "contact_us" }).click();

    await page.locator("#contact-us-title").fill(contactTitle);
    await page.locator("#contact-us-email").fill(contactEmail);
    await page.locator("#contact-us-phone").fill(contactPhone);
    await page.locator("#contact-us-address").fill(contactAddress);

    await page.getByRole("button", { name: "Create widget" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(createWidgetRequestBody).toContain('name="type"');
    expect(createWidgetRequestBody).toContain("contact_us");
    expect(createWidgetRequestBody).toContain('name="data[title]"');
    expect(createWidgetRequestBody).toContain(contactTitle);
    expect(createWidgetRequestBody).toContain('name="data[email]"');
    expect(createWidgetRequestBody).toContain(contactEmail);
    expect(createWidgetRequestBody).not.toContain('name="data[subtitle]"');
    expect(createWidgetRequestBody).not.toContain("Temporary hero title");
    expect(createWidgetRequestBody).not.toContain("background_image");
  });

  test("creates hero_slider widget", async ({ page }) => {
    const slideTitle = "Playwright Slider Title";
    const slideSubtitle = "Playwright Slider Subtitle";
    const slideCtaText = "Explore Breeders";
    const slideCtaLink = "/breeders";

    let createWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
        createWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: "widget-playwright-hero-slider",
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

    await page.goto("https://localhost:3000/admin/widgets/new");
    await page.waitForLoadState("networkidle");

    await page.getByRole("radio", { name: "hero_slider" }).click();
    await expandIfCollapsed(page, "hero-slide-panel-0");

    await page.getByLabel("Title", { exact: true }).fill(slideTitle);
    await page.getByLabel("Subtitle", { exact: true }).fill(slideSubtitle);
    await page.getByLabel("CTA text", { exact: true }).fill(slideCtaText);
    await page.getByLabel("CTA link", { exact: true }).fill(slideCtaLink);
    await page.getByLabel("Slide image").setInputFiles({
      name: "hero-slider-1.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-slider-image"),
    });

    await page.getByRole("button", { name: "Create widget" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(createWidgetRequestBody).toContain('name="type"');
    expect(createWidgetRequestBody).toContain("hero_slider");
    expect(createWidgetRequestBody).toContain('name="is_active"');
    expect(createWidgetRequestBody).toContain('name="data[slides][0][title]"');
    expect(createWidgetRequestBody).toContain(slideTitle);
    expect(createWidgetRequestBody).toContain(
      'name="data[slides][0][subtitle]"',
    );
    expect(createWidgetRequestBody).toContain(slideSubtitle);
    expect(createWidgetRequestBody).toContain(
      'name="data[slides][0][cta_text]"',
    );
    expect(createWidgetRequestBody).toContain(slideCtaText);
    expect(createWidgetRequestBody).toContain(
      'name="data[slides][0][cta_link]"',
    );
    expect(createWidgetRequestBody).toContain(slideCtaLink);
    expect(createWidgetRequestBody).toContain(
      'name="files[slides.0]"; filename="hero-slider-1.png"',
    );
  });

  test("creates about_us widget", async ({ page }) => {
    const title = "Playwright About Title";
    const content = "Playwright about body content.";

    let createWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
        createWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: "widget-playwright-about",
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

    await page.goto("https://localhost:3000/admin/widgets/new");
    await page.waitForLoadState("networkidle");

    await page.getByRole("radio", { name: "about_us" }).click();

    await page.locator("#about-us-title").fill(title);
    await page.locator("#about-us-content").fill(content);
    await page.locator("#about-us-image").setInputFiles({
      name: "about-us.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-about-image"),
    });

    await page.getByRole("button", { name: "Create widget" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(createWidgetRequestBody).toContain('name="type"');
    expect(createWidgetRequestBody).toContain("about_us");
    expect(createWidgetRequestBody).toContain('name="is_active"');
    expect(createWidgetRequestBody).toContain('name="data[title]"');
    expect(createWidgetRequestBody).toContain(title);
    expect(createWidgetRequestBody).toContain('name="data[content]"');
    expect(createWidgetRequestBody).toContain(content);
    expect(createWidgetRequestBody).toContain(
      'name="files[image]"; filename="about-us.png"',
    );
  });

  test("creates contact_us widget", async ({ page }) => {
    const title = "Playwright Contact Title";
    const email = "contact@example.com";
    const phone = "+1 555 0100";
    const address = "123 Playwright Lane";

    let createWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
        createWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: "widget-playwright-contact",
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

    await page.goto("https://localhost:3000/admin/widgets/new");
    await page.waitForLoadState("networkidle");

    await page.getByRole("radio", { name: "contact_us" }).click();

    await page.locator("#contact-us-title").fill(title);
    await page.locator("#contact-us-email").fill(email);
    await page.locator("#contact-us-phone").fill(phone);
    await page.locator("#contact-us-address").fill(address);

    await page.getByRole("button", { name: "Create widget" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(createWidgetRequestBody).toContain('name="type"');
    expect(createWidgetRequestBody).toContain("contact_us");
    expect(createWidgetRequestBody).toContain('name="is_active"');
    expect(createWidgetRequestBody).toContain('name="data[title]"');
    expect(createWidgetRequestBody).toContain(title);
    expect(createWidgetRequestBody).toContain('name="data[email]"');
    expect(createWidgetRequestBody).toContain(email);
    expect(createWidgetRequestBody).toContain('name="data[phone]"');
    expect(createWidgetRequestBody).toContain(phone);
    expect(createWidgetRequestBody).toContain('name="data[address]"');
    expect(createWidgetRequestBody).toContain(address);
  });

  test("creates footer widget", async ({ page }) => {
    const contactInfo = "Playwright footer contact blurb.";
    const copyrightInfo = "© Playwright Footer";
    const blockTitle = "Company";
    const linkName = "About Us";
    const linkUrl = "/about";
    const socialUrl = "https://social.example.com/fuzzyhub";

    let createWidgetRequestBody = "";

    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
        createWidgetRequestBody = request.postDataBuffer()?.toString() ?? "";
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              public_id: "widget-playwright-footer",
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

    await page.goto("https://localhost:3000/admin/widgets/new");
    await page.waitForLoadState("networkidle");

    await page.getByRole("radio", { name: "footer" }).click();
    await expandIfCollapsed(page, "footer-link-block-panel-0");
    await expandIfCollapsed(page, "footer-social-link-panel-0");

    await page.locator("#footer-contact-info").fill(contactInfo);
    await page.locator("#footer-copyright-info").fill(copyrightInfo);
    await page.locator("#footer-link-block-title-0").fill(blockTitle);
    await page.locator("#footer-link-name-0-0").fill(linkName);
    await page.locator("#footer-link-url-0-0").fill(linkUrl);
    await page.locator("#footer-social-url-0").fill(socialUrl);
    await page.locator("#footer-social-icon-0").setInputFiles({
      name: "social-icon.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-footer-social-icon"),
    });

    await page.getByRole("button", { name: "Create widget" }).click();

    await expect(page).toHaveURL(/\/admin(?:\?|$)/);

    expect(createWidgetRequestBody).toContain('name="type"');
    expect(createWidgetRequestBody).toContain("footer");
    expect(createWidgetRequestBody).toContain('name="is_active"');
    expect(createWidgetRequestBody).toContain('name="data[contact_info]"');
    expect(createWidgetRequestBody).toContain(contactInfo);
    expect(createWidgetRequestBody).toContain('name="data[copyright_info]"');
    expect(createWidgetRequestBody).toContain(copyrightInfo);
    expect(createWidgetRequestBody).toContain(
      'name="data[link_blocks][0][title]"',
    );
    expect(createWidgetRequestBody).toContain(blockTitle);
    expect(createWidgetRequestBody).toContain(
      'name="data[link_blocks][0][links][0][name]"',
    );
    expect(createWidgetRequestBody).toContain(linkName);
    expect(createWidgetRequestBody).toContain(
      'name="data[link_blocks][0][links][0][url]"',
    );
    expect(createWidgetRequestBody).toContain(linkUrl);
    expect(createWidgetRequestBody).toContain(
      'name="data[social_links][0][url]"',
    );
    expect(createWidgetRequestBody).toContain(socialUrl);
    expect(createWidgetRequestBody).toContain(
      'name="files[social_links.0.icon]"; filename="social-icon.png"',
    );
  });

  test("shows server validation for hero_slider nested fields", async ({
    page,
  }) => {
    await page.route(ADMIN_WIDGETS_API_URL_PATTERN, async (route) => {
      const request = route.request();

      if (request.method() === "POST") {
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

    await page.goto("https://localhost:3000/admin/widgets/new");
    await page.waitForLoadState("networkidle");

    await page.getByRole("radio", { name: "hero_slider" }).click();
    await page.getByRole("button", { name: "Add slide" }).click();
    await expandIfCollapsed(page, "hero-slide-panel-0");

    await page.locator("#hero-slider-title-0").fill("Slide 1 title");
    await page.locator("#hero-slider-subtitle-0").fill("Slide 1 subtitle");
    await page.locator("#hero-slider-cta-text-0").fill("Slide 1 CTA");
    await page
      .locator("#hero-slider-cta-link-0")
      .fill("https://example.com/one");
    await page.locator("#hero-slider-image-0").setInputFiles({
      name: "hero-slider-1.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-slider-image-1"),
    });

    await expandIfCollapsed(page, "hero-slide-panel-1");

    await page.locator("#hero-slider-title-1").fill("Slide 2 title");
    await page.locator("#hero-slider-subtitle-1").fill("Slide 2 subtitle");
    await page.locator("#hero-slider-cta-text-1").fill("Slide 2 CTA");
    await page.locator("#hero-slider-cta-link-1").fill("not-a-url");
    await page.locator("#hero-slider-image-1").setInputFiles({
      name: "hero-slider-2.png",
      mimeType: "image/png",
      buffer: Buffer.from("playwright-slider-image-2"),
    });

    await page.getByRole("button", { name: "Create widget" }).click();

    await expect(page).toHaveURL(/\/admin\/widgets\/new(?:\?|$)/);
    await expect(page.getByRole("alert").first()).toContainText(
      "Some data did not pass validation.",
    );
    await expect(
      page.getByText("The slides.*.cta_link field must be a valid URL."),
    ).toBeVisible();
  });
});
