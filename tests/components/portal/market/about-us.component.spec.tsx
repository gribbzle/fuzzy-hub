import { expect, test } from "@playwright/experimental-ct-react";
import { ABOUT_US_MOCK } from "@portal/mocks";

import { AboutUs } from "@portal/market/ui/organisms";

const runWidthCase = (
  viewportWidth: number,
  viewportHeight: number,
  expectedWidth: number,
) => {
  test.describe(`about us ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches ${expectedWidth}px container`, async ({ mount }) => {
      const component = await mount(<AboutUs data={ABOUT_US_MOCK} />);
      const container = component.locator(":scope > div").first();

      await expect(container).toHaveScreenshot(
        `about-us-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 550, 1680);
runWidthCase(1280, 452, 1160);
runWidthCase(768, 752, 720);
runWidthCase(375, 668, 375);
