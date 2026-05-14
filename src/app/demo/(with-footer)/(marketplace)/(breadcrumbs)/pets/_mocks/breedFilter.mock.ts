import { CheckboxGroupFilterProps } from "@portal/market/ui/organisms";

const breedFilterMock: CheckboxGroupFilterProps = {
  title: "Filter by Breed",
  items: [
    { id: "golden-retriever", label: "Golden Retriever", count: 54 },
    { id: "french-bulldog", label: "French Bulldog", count: 21 },
    { id: "german-shepherd", label: "German Shepherd", count: 16 },
    { id: "labrador-retriever", label: "Labrador Retriever", count: 154 },
    { id: "poodle", label: "Poodle", count: 65 },
    { id: "bulldog", label: "Bulldog", count: 43 },
    { id: "beagle", label: "Beagle", count: 15 },
  ],
};

export default breedFilterMock;
