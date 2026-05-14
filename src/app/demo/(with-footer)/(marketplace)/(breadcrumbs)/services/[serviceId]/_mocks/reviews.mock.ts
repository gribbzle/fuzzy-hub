import { RatingSectionProps } from "@portal/market/ui/organisms";

const reviewsMock: RatingSectionProps = {
  title: "Reviews",
  rating: 4.9,
  reviewsCountLabel: "47 verified reviews",
  items: [
    {
      id: 1,
      name: "Emily Chen",
      date: "March 12, 2025",
      rating: 5,
      review:
        "We found our perfect Corgi puppy here! The breeder was amazing, provided full health records, and the process was seamless. Highly recommend for a healthy, happy pet!",
      avatarSrc: "/images/avatar-1.jpg",
      images: [
        { src: "/images/pets/corgi-6.jpg", alt: "Corgi photo 1" },
        { src: "/images/pets/corgi-7.jpg", alt: "Corgi photo 2" },
        { src: "/images/pets/corgi-8.jpg", alt: "Corgi photo 3" },
      ],
    },
    {
      id: 2,
      name: "David & Sarah Miller",
      date: "February 28, 2024",
      rating: 5,
      review:
        "Our dream Corgi came from Fuzzy Hub! The breeder was so professional and caring. Everything was transparent and easy. Winston is a happy, healthy bundle of joy!",
      avatarSrc: "/images/avatar-2.jpg",
    },
  ],
};

export default reviewsMock;
