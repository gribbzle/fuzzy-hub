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
  PriceFilter,
  ProductsGrid,
  SearchEmptyState,
  ToggleFilter,
  TopPick,
} from "@portal/market/ui/organisms";

import ageFilterMock from "./_mocks/ageFilter.mock";
import bannerItemsMock from "./_mocks/banners.mock";
import bestPropositionsMock from "./_mocks/bestPropositions.mock";
import breedFilterMock from "./_mocks/breedFilter.mock";
import categoryMock from "./_mocks/category.mock";
import genderFilterMock from "./_mocks/genderFilter.mock";
import locationFilterMock from "./_mocks/locationFilter.mock";
import pageHeaderMock from "./_mocks/pageHeader.mock";
import petOfWeekMock from "./_mocks/petOfWeek.mock";
import petsMock from "./_mocks/pets.mock";
import priceFilterMock from "./_mocks/priceFilter.mock";
import sellerRatingFilterMock from "./_mocks/sellerRatingFilter.mock";

const PetsDemoPage = () => {
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
                <ToggleFilter {...sellerRatingFilterMock} />
                <CheckboxGroupFilter {...breedFilterMock} />
                <PriceFilter {...priceFilterMock} />
                <CheckboxGroupFilter {...ageFilterMock} />
                <CheckboxGroupFilter {...genderFilterMock} />
                <TopPick {...petOfWeekMock} />
              </FormGroup>
            </Form>
          </div>
          <ProductsGrid items={petsMock} emptyState={SearchEmptyState}>
            <BestPropositions
              {...bestPropositionsMock}
              className={twMerge(
                !!petsMock.length && "col-start-1 col-end-5 row-start-3",
              )}
            />
          </ProductsGrid>
        </div>
        <Banners items={bannerItemsMock} className="mt-25" />
      </Container>
    </TemplateMain>
  );
};

export default PetsDemoPage;
