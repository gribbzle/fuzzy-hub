import { expect, test } from "@playwright/experimental-ct-react";
import { SUBSCRIBE_BANNER_MOCK } from "@portal/mocks";

import { SubscribeBannerSection } from "@portal/market/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`subscribe banner ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(
        <SubscribeBannerSection {...SUBSCRIBE_BANNER_MOCK} />,
      );

      const container = component.locator(":scope > div").first();

      await expect(container).toHaveScreenshot(
        `subscribe-banner-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 304);
runWidthCase(1280, 304);
runWidthCase(768, 304);
runWidthCase(375, 404);
