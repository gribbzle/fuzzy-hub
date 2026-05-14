import { expect, test } from "@playwright/experimental-ct-react";
import { FEATURED_LISTING_MOCK } from "@portal/mocks";

import { FeaturedListingSection } from "@portal/market/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`featured listing ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(
        <FeaturedListingSection {...FEATURED_LISTING_MOCK} />,
      );

      await expect(component).toHaveScreenshot(
        `featured-listing-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 962);
// runWidthCase(1280, 704);
// runWidthCase(768, 690);
// runWidthCase(375, 664);
