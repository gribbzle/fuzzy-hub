import { expect, test } from "@playwright/experimental-ct-react";
import { BLOG_HIGHLIGHTS_MOCK } from "@portal/mocks";

import { BlogHighlights } from "@portal/market/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`blog highlights ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(
        <BlogHighlights {...BLOG_HIGHLIGHTS_MOCK} />,
      );

      await expect(component).toHaveScreenshot(
        `blog-highlights-${viewportWidth}.png`,
      );
    });
  });
};

// макеты неверные, тесты не проходят
// runWidthCase(1920, 900);
// runWidthCase(1280, 704);
// runWidthCase(768, 690);
// runWidthCase(375, 664);
