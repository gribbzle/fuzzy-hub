import { CheckboxGroupFilterProps } from "@portal/market/ui/organisms";

const operatingHoursFilterMock: CheckboxGroupFilterProps = {
  title: "Operating Hours",
  items: [
    {
      label: "Open Now",
      count: 34,
      value: "open-now",
    },
    {
      label: "Open Weekends",
      count: 14,
      value: "open-weekends",
    },
    {
      label: "Open Late (after 8 PM)",
      count: 16,
      value: "open-late",
    },
    {
      label: "Open Early (before 8 AM)",
      count: 76,
      value: "open-early",
    },
    {
      label: "By Appointment Only",
      count: 35,
      value: "by-appointment-only",
    },
  ],
};

export default operatingHoursFilterMock;
