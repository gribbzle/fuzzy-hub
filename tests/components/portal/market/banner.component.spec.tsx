import { expect, test } from "@playwright/experimental-ct-react";

import { Container } from "@portal/ui/atoms";

import { Banner } from "@portal/market/ui/organisms";

const runWidthCase = (
  viewportWidth: number,
  viewportHeight: number,
  expectedWidth: number,
) => {
  test.describe(`banner ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches ${expectedWidth}px container`, async ({ mount }) => {
      const component = await mount(
        <Container component="section">
          <Banner />
        </Container>,
      );

      const container = component.locator(":scope > div").first();

      await expect(container).toHaveScreenshot(`banner-${viewportWidth}.png`);
    });
  });
};

runWidthCase(1920, 292, 1680);
runWidthCase(1280, 248, 1160);
runWidthCase(768, 320, 720);
runWidthCase(375, 348, 375);
