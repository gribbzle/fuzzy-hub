import { CheckboxGroupFilterProps } from "@portal/market/ui/organisms";

const clinicTypeFilterMock: CheckboxGroupFilterProps = {
  title: "Type of Service/Clinic",
  items: [
    {
      id: "1",
      label: "Emergency Veterinary Hospital",
      count: 54,
      value: "emergency-veterinary-hospital",
    },
    {
      id: "2",
      label: "Veterinary Dentist",
      count: 21,
      value: "veterinary-dentist",
    },
    {
      id: "3",
      label: "Veterinary Dermatologist",
      count: 16,
      value: "veterinary-dermatologist",
    },
    {
      id: "4",
      label: "Veterinary Cardiologist",
      count: 154,
      value: "veterinary-cardiologist",
    },
    {
      id: "5",
      label: "Veterinary Surgeon",
      count: 65,
      value: "veterinary-surgeon",
    },
    {
      id: "6",
      label: "Vaccination Clinic",
      count: 43,
      value: "vaccination-clinic",
    },
    {
      id: "7",
      label: "Pet Pharmacy",
      count: 132,
      value: "pet-pharmacy",
    },
  ],
};

export default clinicTypeFilterMock;
