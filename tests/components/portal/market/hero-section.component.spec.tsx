import { expect, test } from "@playwright/experimental-ct-react";
import { HERO_SECTION_MOCK } from "@portal/mocks";

import { HeroSection } from "@portal/market/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`hero section ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(<HeroSection data={HERO_SECTION_MOCK} />);

      await expect(component).toHaveScreenshot(
        `hero-section-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 538);
runWidthCase(1280, 465);
runWidthCase(768, 800);
runWidthCase(375, 600);
