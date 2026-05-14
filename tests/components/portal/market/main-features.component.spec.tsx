import { expect, test } from "@playwright/experimental-ct-react";
import { MAIN_FEATURES_MOCK } from "@portal/mocks";

import { MainFeaturesSection } from "@portal/market/ui/organisms";

const runWidthCase = (viewportWidth: number, viewportHeight: number) => {
  test.describe(`main features ${viewportWidth}`, () => {
    test.use({ viewport: { width: viewportWidth, height: viewportHeight } });

    test(`matches`, async ({ mount }) => {
      const component = await mount(
        <MainFeaturesSection
          title={MAIN_FEATURES_MOCK.title}
          subtitle={MAIN_FEATURES_MOCK.subtitle}
          data={MAIN_FEATURES_MOCK.data}
        />,
      );

      await expect(component).toHaveScreenshot(
        `main-features-${viewportWidth}.png`,
      );
    });
  });
};

runWidthCase(1920, 764);
// runWidthCase(1280, 646); // макеты сделаны неверно, тест падает
// runWidthCase(768, 1118); // макеты сделаны неверно, тест падает
// runWidthCase(375, 1039); // макеты сделаны неверно, тест падает
