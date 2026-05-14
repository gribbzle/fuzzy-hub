"use client";

import { twMerge } from "@utils";
import { useForm } from "react-hook-form";

import { Container, Form, FormGroup } from "@portal/ui/atoms";
import { TemplateMain } from "@portal/ui/templates";

import {
  Banners,
  BestPropositions,
  CategorySection,
  CheckboxGroupFilter,
  LocationFilter,
  PageHeader,
  ProductsGrid,
  SearchEmptyState,
  ToggleFilter,
  TopPick,
} from "@portal/market/ui/organisms";

import bannerItemsMock from "./_mocks/banners.mock";
import bestPropositionsMock from "./_mocks/bestPropositions.mock";
import categoryMock from "./_mocks/category.mock";
import clinicTypeFilterMock from "./_mocks/clinicTypeFilter.mock";
import locationFilterMock from "./_mocks/locationFilter.mock";
import operatingHoursFilterMock from "./_mocks/operatingHoursFilter.mock";
import pageHeaderMock from "./_mocks/pageHeader.mock";
import serviceCardMock from "./_mocks/serviceCard.mock";
import servicesMock from "./_mocks/services.mock";
import speciesFilterMock from "./_mocks/speciesFilter.mock";

const ServicesDemoPage = () => {
  const methods = useForm();

  return (
    <TemplateMain>
      <PageHeader {...pageHeaderMock} />
      <Container className="pt-8 pb-25">
        <CategorySection {...categoryMock} />
        <div className="mt-20 flex gap-8">
          <div className="w-77.5 shrink-0">
            <Form
              methods={methods}
              onSubmit={async () => {
                return;
              }}
            >
              <FormGroup className="bg-bg-light w-full overflow-hidden rounded-2xl p-4">
                <LocationFilter {...locationFilterMock} />
                <ToggleFilter
                  title="Ratings & Verification"
                  label="Minimum Star Rating (4.5+)"
                />
                <CheckboxGroupFilter {...clinicTypeFilterMock} />
                <CheckboxGroupFilter {...speciesFilterMock} />
                <CheckboxGroupFilter {...operatingHoursFilterMock} />
                <TopPick {...serviceCardMock} />
              </FormGroup>
            </Form>
          </div>
          <ProductsGrid items={servicesMock} emptyState={SearchEmptyState}>
            <BestPropositions
              {...bestPropositionsMock}
              className={twMerge(
                !!servicesMock.length && "col-start-1 col-end-5 row-start-3",
              )}
            />
          </ProductsGrid>
        </div>
        <Banners items={bannerItemsMock} className="mt-25" />
      </Container>
    </TemplateMain>
  );
};

export default ServicesDemoPage;
