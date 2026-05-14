import {
  BLOG_HIGHLIGHTS_MOCK,
  KEY_POINTS_MOCK,
  MAIN_FEATURES_MOCK,
  REVIEWS_SECTION_MOCK,
  SUBSCRIBE_BANNER_MOCK,
} from "@portal/mocks";

import { getMainPageWidgetsAction } from "@portal/market/actions";
import {
  AboutUsResource,
  HeroSectionResource,
  HeroSliderResource,
} from "@portal/market/models";
import {
  AboutUs,
  Banner,
  BlogHighlights,
  HeroSection,
  HeroSlider,
  KeyPointsSection,
  MainFeaturesSection,
  ReviewsSection,
  SubscribeBannerSection,
} from "@portal/market/ui/organisms";
import {
  TemplateHeroContainer,
  TemplateHomeMain,
} from "@portal/market/ui/templates";
import { getWidgetsMap } from "@portal/market/utils";

const HomePage = async () => {
  const { data: widgets } = await getMainPageWidgetsAction();

  if (!widgets) {
    return null;
  }

  const widgetsMap = getWidgetsMap(widgets);

  const heroSectionWidget = widgetsMap.hero_section as HeroSectionResource;
  const heroSliderWidget = widgetsMap.hero_slider as HeroSliderResource;
  const aboutUsWidget = widgetsMap.about_us as AboutUsResource;

  return (
    <TemplateHomeMain>
      {heroSectionWidget && <HeroSection data={heroSectionWidget.data} />}
      <TemplateHeroContainer
        slider={heroSliderWidget && <HeroSlider data={heroSliderWidget.data} />}
        banner={<Banner href="/pets-matching-quiz" />}
      />
      {aboutUsWidget && <AboutUs data={aboutUsWidget.data} />}
      <KeyPointsSection
        title={KEY_POINTS_MOCK.title}
        data={KEY_POINTS_MOCK.data}
      />
      <MainFeaturesSection
        title={MAIN_FEATURES_MOCK.title}
        subtitle={MAIN_FEATURES_MOCK.subtitle}
        data={MAIN_FEATURES_MOCK.data}
      />
      <BlogHighlights {...BLOG_HIGHLIGHTS_MOCK} />
      <ReviewsSection {...REVIEWS_SECTION_MOCK} />
      <SubscribeBannerSection {...SUBSCRIBE_BANNER_MOCK} />
    </TemplateHomeMain>
  );
};

export default HomePage;
