import { expect, test } from "@playwright/experimental-ct-react";
import { REVIEWS_SECTION_MOCK } from "@portal/mocks";

import { ReviewsSection } from "@portal/market/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`reviews section ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(
        <ReviewsSection {...REVIEWS_SECTION_MOCK} />,
      );

      await expect(component).toHaveScreenshot(
        `reviews-section-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 2028);
runWidthCase(1280, 1038);
runWidthCase(768, 966);
runWidthCase(375, 977);
