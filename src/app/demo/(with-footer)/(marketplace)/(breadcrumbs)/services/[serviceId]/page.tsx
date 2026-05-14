import { Box, Container } from "@portal/ui/atoms";

import { BoxLabel, DataGrid } from "@portal/market/ui/molecules";
import {
  PageHeader,
  PhotoGallery,
  RatingSection,
  ServiceActions,
  ServiceInfo,
} from "@portal/market/ui/organisms";

import pageHeaderMock from "./_mocks/pageHeader.mock";
import reviewsMock from "./_mocks/reviews.mock";
import serviceInfo from "./_mocks/serviceInfo.mock";
import servicePhotoGalleryMock from "./_mocks/servicePhotoGallery.mock";
import tableMock from "./_mocks/table.mock";

const ServiceDetailDemoPage = () => (
  <>
    <PageHeader {...pageHeaderMock} />
    <Container className="pt-8">
      <div className="flex gap-8">
        <div className="flex flex-col gap-8">
          <div className="flex gap-8">
            <PhotoGallery {...servicePhotoGalleryMock} />
            <ServiceInfo {...serviceInfo} />
          </div>
          <Box>
            <BoxLabel>Services & Price Guide</BoxLabel>
            <DataGrid {...tableMock} />
          </Box>
        </div>
        <div className="flex w-full max-w-77.5 flex-col items-start gap-6.5">
          <ServiceActions price="from $35" />
        </div>
      </div>
    </Container>
    <RatingSection {...reviewsMock} className="mt-20 mb-25" />
  </>
);

export default ServiceDetailDemoPage;
