import { FeaturedServicesProps } from "@portal/market/ui/organisms";

const featuredServicesMock: FeaturedServicesProps = {
  title: "Here to Help, 24/7",
  tabs: [
    {
      label: "All",
      value: "",
    },
    {
      label: "Veterinary care",
      value: "veterinary-care",
    },
    {
      label: "Grooming",
      value: "grooming",
    },
    {
      label: "Training",
      value: "training",
    },
  ],
  items: [
    {
      __typename: "Service",
      id: 1,
      title: "Orange Canyon Pet Clinic",
      imageSrc: "/images/service-1.jpg",
      location: "7614 E Chapman Ave, Orange, CA 92869",
      hours: "08:30–18:00",
      phone: "+13236857257",
      rating: 4.8,
      isFavorite: true,
    },
    {
      __typename: "Service",
      id: 2,
      title: "Veterinary Healthcare Center",
      imageSrc: "/images/service-2.jpg",
      location: "241 W Pomona Blvd, Monterey Park, CA 91754",
      hours: "08:30–18:00",
      phone: "+13236857257",
      rating: 4.8,
      isFavorite: false,
    },
    {
      __typename: "Service",
      id: 3,
      title: "Gemcore Veterinary Services",
      imageSrc: "/images/service-3.jpg",
      location: "21701 Devonshire St Suite F, Chatsworth, CA 91311",
      hours: "Day-and-night",
      phone: "+13236857257",
      rating: 4.6,
      isFavorite: false,
    },
    {
      __typename: "Service",
      id: 4,
      title: "Irvine Valley Veterinary Hospital Emergency",
      imageSrc: "/images/service-4.jpg",
      location: "14980 Sand Canyon Ave, Irvine, CA 92618",
      hours: "08:30–18:00",
      phone: "+13236857257",
      rating: 4.1,
      isFavorite: false,
    },
    {
      __typename: "Service",
      id: 5,
      title: "Inland Valley Veterinary Specialists & Emergency Center",
      imageSrc: "/images/service-5.jpg",
      location: "10 W 7th St, Upland, CA 91786",
      hours: "Day-and-night",
      phone: "+13236857257",
      rating: 3.8,
      isFavorite: false,
    },
  ],
};

export default featuredServicesMock;
