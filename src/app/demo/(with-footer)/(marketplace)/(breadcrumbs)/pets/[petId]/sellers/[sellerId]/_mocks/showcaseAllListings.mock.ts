import { ShowcaseAllListingsProps } from "@portal/market/ui/organisms";

const showcaseAllListingsMock: ShowcaseAllListingsProps = {
  title: "Showcase All Listings",
  activeTab: "available",
  items: [
    {
      __typename: "Pet",
      id: 1,
      title: "Archie",
      price: "$2,800",
      tags: ["Pembroke Corgi", "Puppy"],
      description:
        "A clever and affectionate little herder with a big personality, ready to fill your home with joy and short-legged antics.",
      imageSrc: "/images/listing-card/listing-card-pet-1.jpg",
    },
    {
      __typename: "Pet",
      id: 2,
      title: "Nana",
      price: "$2,600",
      tags: ["Pembroke Corgi", "Puppy"],
      description:
        "A clever and affectionate little herder with a big personality, ready to fill your home with joy and short-legged antics.",
      imageSrc: "/images/listing-card/listing-card-pet-2.jpg",
    },
    {
      __typename: "Pet",
      id: 3,
      title: "Elsie",
      price: "$2,800",
      tags: ["Pembroke Corgi", "Puppy"],
      description:
        "A clever and affectionate little herder with a big personality, ready to fill your home with joy and short-legged antics.",
      imageSrc: "/images/listing-card/listing-card-pet-3.jpg",
    },
    {
      __typename: "Pet",
      id: 4,
      title: "Winston",
      price: "$2,700",
      tags: ["Pembroke Corgi", "Puppy"],
      description:
        "A clever and affectionate little herder with a big personality, ready to fill your home with joy and short-legged antics.",
      imageSrc: "/images/listing-card/listing-card-pet-4.jpg",
    },
    {
      __typename: "Pet",
      id: 5,
      title: "Pixel",
      price: "$2,900",
      tags: ["Pembroke Corgi", "Puppy"],
      description:
        "A clever and affectionate little herder with a big personality, ready to fill your home with joy and short-legged antics.",
      imageSrc: "/images/listing-card/listing-card-pet-5.jpg",
    },
  ],
  tabs: [
    {
      label: "Available Puppies",
      value: "available",
      // counter: 5,
    },
    {
      label: "Upcoming Litters",
      value: "upcoming",
      // counter: 3,
    },
    {
      label: "Adult Dogs",
      value: "adults",
      // counter: 1,
    },
    {
      label: "Breeding Services",
      value: "breeding",
    },
    {
      label: "Merchandise",
      value: "merchandise",
    },
  ],
};

export default showcaseAllListingsMock;
