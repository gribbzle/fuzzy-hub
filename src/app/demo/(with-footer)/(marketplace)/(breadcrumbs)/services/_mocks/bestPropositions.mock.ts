import { BestPropositionsProps } from "@portal/market/ui/organisms";

const bestPropositionsMock: BestPropositionsProps = {
  title: "Recommended for you",
  items: [
    {
      __typename: "Service",
      id: 1,
      title: "Orange Canyon Pet Clinic",
      imageSrc: "/images/services/service-1.png",
      tags: ["Veterinary care", "Specialized care", "Grooming"],
      location: "7614 E Chapman Ave, Orange, CA 92869",
      hours: "08:30–18:00",
      phone: "+13236857257",
      rating: 4.8,
    },
    {
      __typename: "Service",
      id: 2,
      title: "Inland Valley Veterinary Specialists & Emergency Center",
      imageSrc: "/images/services/service-2.png",
      tags: ["Veterinary care", "Specialized care"],
      location: "10 W 7th St, Upland, CA 91786",
      hours: "08:30–18:00",
      phone: "+13236857257",
      rating: 4.8,
    },
    {
      __typename: "Service",
      id: 3,
      title: "Yosemite Veterinary Hospital Modesto",
      imageSrc: "/images/services/service-3.png",
      tags: ["Veterinary care"],
      location: "1706 Yosemite Blvd, Modesto, CA 95354",
      hours: "08:00–13:00",
      phone: "+13236857257",
      rating: 4.0,
    },
    {
      __typename: "Service",
      id: 4,
      title: "Irvine Valley Veterinary Hospital Emergency",
      imageSrc: "/images/services/service-6.png",
      tags: ["Veterinary care"],
      location: "14980 Sand Canyon Ave, Irvine, CA 92618",
      hours: "08:30–18:00",
      phone: "+13236857257",
      rating: 3.8,
    },
  ],
};

export default bestPropositionsMock;
