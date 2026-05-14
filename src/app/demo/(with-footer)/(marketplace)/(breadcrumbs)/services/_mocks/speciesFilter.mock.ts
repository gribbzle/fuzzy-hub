import { CheckboxGroupFilterProps } from "@portal/market/ui/organisms";

const speciesFilterMock: CheckboxGroupFilterProps = {
  title: "Species & Animal Type",
  items: [
    {
      label: "Dogs",
      count: 154,
      value: "dogs",
    },
    {
      label: "Cats",
      count: 154,
      value: "cats",
    },
    {
      label: "Small Mammals",
      count: 98,
      value: "small-mammals",
    },
    {
      label: "Birds",
      count: 45,
      value: "birds",
    },
    {
      label: "Reptiles & Exotic Pets",
      count: 43,
      value: "reptiles-exotic-pets",
    },
  ],
};

export default speciesFilterMock;
