import { CheckboxGroupFilterProps } from "@portal/market/ui/organisms";

const ageFilterMock: CheckboxGroupFilterProps = {
  title: "Filter by Age",
  items: [
    { id: "puppy-6-12-months", label: "Puppy (6-12 months)", count: 54 },
    { id: "young-1-3-years", label: "Young (1-3 years)", count: 21 },
    { id: "adult-3-7-years", label: "Adult (3-7 years)", count: 16 },
    { id: "senior-7-plus-years", label: "Senior (7+ years)", count: 154 },
  ],
};

export default ageFilterMock;
