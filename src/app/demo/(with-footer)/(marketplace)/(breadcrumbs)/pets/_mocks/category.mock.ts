import { CategorySectionProps } from "@portal/market/ui/organisms";

const categoryMock: CategorySectionProps = {
  tabsDefaultValue: "pets",
  tabs: [
    { label: "Companion & Small Pets", value: "pets" },
    { label: "Pet Services", value: "services" },
  ],
  categoriesDefaultValue: "dogs",
  categories: [
    {
      value: "dogs",
      imageSrc: "/images/categories/category-dogs.png",
      label: "Dogs",
    },
    {
      value: "cats",
      imageSrc: "/images/categories/category-cats.png",
      label: "Cats",
    },
    {
      value: "small-mammals",
      imageSrc: "/images/categories/category-small-mammals.png",
      label: "Small Mammals",
    },
    {
      value: "birds",
      imageSrc: "/images/categories/category-birds.png",
      label: "Birds",
    },
    {
      value: "fish",
      imageSrc: "/images/categories/category-fish-aquatics.png",
      label: "Fish & Aquatics",
    },
    {
      value: "reptiles",
      imageSrc: "/images/categories/category-amphibians-reptiles.png",
      label: "Amphibians & Reptiles",
    },
    {
      value: "exotic",
      imageSrc: "/images/categories/category-exotic-other.png",
      label: "Exotic & Other",
    },
  ],
};

export default categoryMock;
