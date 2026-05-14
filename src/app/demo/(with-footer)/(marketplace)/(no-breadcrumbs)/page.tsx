import {
  ABOUT_US_MOCK,
  BLOG_HIGHLIGHTS_MOCK,
  FEATURED_LISTING_MOCK,
  HERO_SECTION_MOCK,
  HERO_SLIDER_MOCK,
  KEY_POINTS_MOCK,
  MAIN_FEATURES_MOCK,
  REVIEWS_SECTION_MOCK,
  SUBSCRIBE_BANNER_MOCK,
} from "@portal/mocks";

import {
  AboutUs,
  Banner,
  BlogHighlights,
  FeaturedListingSection,
  FeaturedServices,
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

import featuredServicesMock from "./_mocks/featuredServices.mock";

const HomeDemoPage = () => (
  <TemplateHomeMain>
    <HeroSection data={HERO_SECTION_MOCK} />
    <TemplateHeroContainer
      slider={<HeroSlider data={HERO_SLIDER_MOCK} />}
      banner={<Banner href="/demo/pets-matching-quiz" />}
    />
    <FeaturedListingSection {...FEATURED_LISTING_MOCK} />
    <MainFeaturesSection
      title={MAIN_FEATURES_MOCK.title}
      subtitle={MAIN_FEATURES_MOCK.subtitle}
      data={MAIN_FEATURES_MOCK.data}
    />
    <AboutUs data={ABOUT_US_MOCK} />
    <KeyPointsSection
      title={KEY_POINTS_MOCK.title}
      data={KEY_POINTS_MOCK.data}
    />
    <BlogHighlights {...BLOG_HIGHLIGHTS_MOCK} />
    <ReviewsSection {...REVIEWS_SECTION_MOCK} />
    <FeaturedServices {...featuredServicesMock} className="py-20" />
    <SubscribeBannerSection {...SUBSCRIBE_BANNER_MOCK} />
  </TemplateHomeMain>
);

export default HomeDemoPage;
