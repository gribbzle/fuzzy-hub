import { CategorySectionProps } from "@portal/market/ui/organisms";

const categoryMock: CategorySectionProps = {
  tabsDefaultValue: "services",
  tabs: [
    { label: "Companion & Small Pets", value: "pets" },
    { label: "Pet Services", value: "services" },
  ],
  categoriesDefaultValue: "vet-care",
  categories: [
    {
      value: "vet-care",
      imageSrc: "/images/categories/category-veterinary-care.png",
      label: "Veterinary Care",
    },
    {
      value: "grooming-spa",
      imageSrc: "/images/categories/category-grooming-spa.png",
      label: "Grooming & Spa",
    },
    {
      value: "training-behavior",
      imageSrc: "/images/categories/category-training-behavior.png",
      label: "Training & Behavior",
    },
    {
      value: "walking-sitting",
      imageSrc: "/images/categories/category-walking-sitting.png",
      label: "Walking & Sitting",
    },
    {
      value: "boarding-daycare",
      imageSrc: "/images/categories/category-boarding-daycare.png",
      label: "Boarding & Daycare",
    },
    {
      value: "transportation",
      imageSrc: "/images/categories/category-transportation.png",
      label: "Transportation",
    },
    {
      value: "other-services",
      imageSrc: "/images/categories/category-other-services.png",
      label: "Other Services",
    },
  ],
};

export default categoryMock;
