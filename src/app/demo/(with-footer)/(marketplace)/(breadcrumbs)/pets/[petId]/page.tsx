import { Container } from "@portal/ui/atoms";

import {
  BestPropositions,
  PageHeader,
  PhotoGallery,
  ProductActions,
  ProductInfo,
} from "@portal/market/ui/organisms";

import bestPropositionsMock from "./_mocks/bestPropositions.mock";
import pageHeaderMock from "./_mocks/pageHeader.mock";
import petDetailsSidebarMock from "./_mocks/petDetailsSidebar.mock";
import petInfoMock from "./_mocks/petInfo.mock";
import petPhotoGalleryMock from "./_mocks/petPhotoGallery.mock";

const PetDetailDemoPage = () => (
  <>
    <PageHeader {...pageHeaderMock} />
    <Container className="pt-8 pb-25">
      <div className="flex gap-8">
        <PhotoGallery {...petPhotoGalleryMock} />
        <ProductInfo {...petInfoMock} />
        <ProductActions {...petDetailsSidebarMock} />
      </div>
      <BestPropositions
        {...bestPropositionsMock}
        className="bg-aqua-green mt-25"
      />
    </Container>
  </>
);

export default PetDetailDemoPage;
