import { expect, test } from "@playwright/experimental-ct-react";
import { SERVICE_PROFILE_MOCK } from "@portal/mocks";

import { Header } from "@portal/ui/organisms";

const HEADER_HEIGHT = 84;

const runWidthCase = (viewportWidth: number, expectedWidth: number) => {
  test.describe(`header (service) ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: HEADER_HEIGHT } });

    test(`matches ${expectedWidth}px container`, async ({ mount }) => {
      const component = await mount(
        <Header userProfile={SERVICE_PROFILE_MOCK} />,
      );
      const headerContainer = component.locator(":scope > div").first();

      await expect(headerContainer).toHaveScreenshot(
        `header-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 1680);
runWidthCase(1280, 1160);
runWidthCase(768, 720);
runWidthCase(375, 375);
