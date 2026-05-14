import { Container, TabPanel } from "@portal/ui/atoms";
import { TemplateMain } from "@portal/ui/templates";

import { PageHeader } from "@portal/market/ui/organisms";

import {
  ArticleComments,
  CommentsEmptyState,
  MyReviewsTabs,
  SellerReviews,
  SellerReviewsEmptyState,
} from "@portal/customer/ui/organisms";

import articleComments from "./_mocks/articleComments.mock";
import pageHeaderMock from "./_mocks/pageHeader.mock";
import sellerReviews from "./_mocks/sellerReviews.mock";
import tabsMock from "./_mocks/tabs.mock";

const ReviewsDemoPage = () => (
  <TemplateMain>
    <PageHeader {...pageHeaderMock} />
    <Container className="gap-8 pt-8 pb-20">
      <MyReviewsTabs tabs={tabsMock} defaultValue="seller_reviews">
        <TabPanel value="seller_reviews">
          <SellerReviews
            items={sellerReviews}
            emptyState={SellerReviewsEmptyState}
          />
        </TabPanel>
        <TabPanel value="article_comments">
          <ArticleComments
            items={articleComments}
            emptyState={CommentsEmptyState}
          />
        </TabPanel>
      </MyReviewsTabs>
    </Container>
  </TemplateMain>
);

export default ReviewsDemoPage;
