import { expect, test } from "@playwright/experimental-ct-react";
import { HERO_SLIDER_MOCK } from "@portal/mocks";

import { Container } from "@portal/ui/atoms";

import { HeroSlider } from "@portal/market/ui/organisms";

const runWidthCase = (
  viewportWidth: number,
  viewportHeight: number,
  expectedWidth: number,
) => {
  test.describe(`hero slider ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches ${expectedWidth}px container`, async ({ mount }) => {
      const component = await mount(
        <Container
          component="section"
          className="tablet:max-w-auto max-tablet:px-0"
        >
          <HeroSlider data={HERO_SLIDER_MOCK} />
        </Container>,
      );

      const container = component.locator(":scope > div").first();

      await expect(container).toHaveScreenshot(
        `hero-slider-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 540, 1680);
runWidthCase(1280, 248, 1160);
runWidthCase(768, 1328, 768);
runWidthCase(375, 348, 375);
