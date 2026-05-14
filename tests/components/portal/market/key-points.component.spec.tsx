import { expect, test } from "@playwright/experimental-ct-react";
import { KEY_POINTS_MOCK } from "@portal/mocks";

import { KeyPointsSection } from "@portal/market/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`key points ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(
        <KeyPointsSection
          title={KEY_POINTS_MOCK.title}
          data={KEY_POINTS_MOCK.data}
        />,
      );

      const container = component.locator(":scope > div").first();

      await expect(container).toHaveScreenshot(
        `key-points-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 406);
runWidthCase(1280, 308);
runWidthCase(768, 350);
runWidthCase(375, 688);
