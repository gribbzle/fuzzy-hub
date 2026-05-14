import { ServiceInfoProps } from "@portal/market/ui/organisms";

const serviceInfoMock: ServiceInfoProps = {
  title: "Orange Canyon Pet Clinic",
  description: "Compassionate Care for Your Whole Family",
  location: "7614 E Chapman Ave, Orange, CA 92869",
  rating: "4.8 (247 reviews)",
  phone: "(555) 123-4567",
  hours: "Open now",
  overview:
    "Welcome to Orange Canyon Pet Clinic, where your pet's health and comfort are our top priority. Our team of certified veterinarians and caring staff provides a full range of medical services in a calm, state-of-the-art facility. We believe in preventive care and transparent communication with every pet parent.",
  slotProps: {
    specificationsGrid: {
      data: [
        {
          label: "Hours:",
          value:
            "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 3:00 PM\nSunday: Closed",
        },
        {
          label: "Services:",
          value:
            "Primary Care, Surgery, Dentistry, Diagnostics, Emergency Triage.",
        },
        {
          label: "Species Treated:",
          value: "Dogs, Cats, Small Mammals (Rabbits, Guinea Pigs).",
        },
        {
          label: "Accepted:",
          value: "Most pet insurance plans; direct billing available.",
        },
      ],
      socialLinks: {
        facebook: "/",
        instagram: "/",
        youtube: "/",
      },
    },
  },
};

export default serviceInfoMock;
