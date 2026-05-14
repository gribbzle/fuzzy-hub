import { expect, test } from "@playwright/experimental-ct-react";
import { FOOTER_MOCK } from "@portal/mocks";

import { Footer } from "@portal/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`footer ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(<Footer data={FOOTER_MOCK} />);

      await expect(component).toHaveScreenshot(`footer-${viewportWidth}.png`);
    });
  });
};

runWidthCase(1920, 324);
runWidthCase(1280, 442);
runWidthCase(768, 444);
runWidthCase(375, 934);
