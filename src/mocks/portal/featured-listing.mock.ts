import { Pet } from "@portal/market/ui/molecules";
import { TabProps } from "@portal/ui/atoms";
import { FeaturedListingProps } from "@portal/market/ui/organisms";

const itemsMock: Pet[] = [
  {
    __typename: "Pet",
    isFavorite: true,
    id: 1,
    title: "Luna",
    imageSrc: "/images/pet-1.jpg",
    tags: ["⭐ Pet of the Week", "Good with kids"],
    description:
      "This dreamy kitten with emerald eyes is looking for a home where she'll be adored for her gentle nature and love of long evening cuddles.",
  },
  {
    __typename: "Pet",
    id: 2,
    title: "Australian Shepherd",
    imageSrc: "/images/pet-2.jpg",
    tags: ["🔥 Breed Spotlight", "Energetic"],
    description:
      "A highly intelligent, agile, and devoted herding breed that excels in obedience and thrives with an active, engaging lifestyle.",
  },
  {
    __typename: "Pet",
    id: 3,
    title: "Orange Canyon Pet Clinic",
    imageSrc: "/images/pet-3.jpg",
    tags: ["🏅 Top Rated Services", "Veterinary care"],
    description:
      "We provide compassionate veterinary care, grooming, and boarding services for your beloved companions.",
    rating: 4.8,
  },
  {
    __typename: "Pet",
    id: 4,
    title: "Beyond Sits and Stays: Unlocking Your Pet's Hidden Genius",
    imageSrc: "/images/pet-4.jpg",
    tags: ["📘 Learning Center Picks"],
    description:
      "Discover the science-backed games and exercises that can sharpen your dog or cat's mind and deepen your bond.",
  },
  {
    __typename: "Pet",
    id: 5,
    title: "Marshmallow",
    imageSrc: "/images/pet-5.jpg",
    tags: ["⭐ Pet of the Week"],
    description:
      "A sweet-natured and calm rabbit with incredibly soft fur, perfect as a gentle and affectionate companion for a peaceful home.",
  },
];

const tabsMock: TabProps[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "⭐ Pet of the Week",
    value: "pets",
  },
  {
    label: "🔥 Breed Spotlight",
    value: "breeds",
  },
  {
    label: "🏅 Top Rated Services",
    value: "top_rated_services",
  },
  {
    label: "📘 Learning Center Picks",
    value: "learning_center_picks",
  },
];

export const FEATURED_LISTING_MOCK: FeaturedListingProps = {
  title: "Featured Highlights",
  subtitle: "Explore pets, services and learning highlights from our community",
  items: itemsMock,
  tabs: tabsMock,
};
