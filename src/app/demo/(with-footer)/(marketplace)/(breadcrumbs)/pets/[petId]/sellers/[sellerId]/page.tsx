import { Box, Container, Divider } from "@portal/ui/atoms";

import { BoxLabel, DataGrid, SellerGallery } from "@portal/market/ui/molecules";
import {
  OurStory,
  PageHeader,
  RatingSection,
  SellerInfo,
  ShowcaseAllListings,
} from "@portal/market/ui/organisms";

import ourStoryMock from "./_mocks/ourStory.mock";
import pageHeaderMock from "./_mocks/pageHeader.mock";
import reviewItemsMock from "./_mocks/reviews.mock";
import sellerGalleryMock from "./_mocks/sellerGallery.mock";
import sellerInfoMock from "./_mocks/sellerInfo.mock";
import sellerMetricsMock from "./_mocks/sellerMetrics.mock";
import showcaseAllListingsMock from "./_mocks/showcaseAllListings.mock";

const SellerDetailDemoPage = () => (
  <>
    <PageHeader {...pageHeaderMock} />
    <Container className="gap-25 pt-8">
      <div className="flex gap-8">
        <SellerGallery {...sellerGalleryMock} />
        <Box className="flex-1 gap-12">
          <SellerInfo {...sellerInfoMock} />
          <Divider />
          <Box>
            <BoxLabel>Performance & Trust Metrics</BoxLabel>
            <DataGrid {...sellerMetricsMock} />
          </Box>
        </Box>
      </div>
    </Container>
    <RatingSection {...reviewItemsMock} className="my-25" />
    <Container className="gap-25 pb-25">
      <ShowcaseAllListings {...showcaseAllListingsMock} />
      <OurStory {...ourStoryMock} />
    </Container>
  </>
);

export default SellerDetailDemoPage;
