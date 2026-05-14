import { BestPropositionsProps } from "@portal/market/ui/organisms";

const bestPropositionsMock: BestPropositionsProps = {
  title: "The Best tails for you",
  items: [
    {
      __typename: "Pet",
      id: 1,
      title: "Duke",
      imageSrc: "/images/best-propositions/best-propositions-1.png",
      tags: ["English Bulldog", "Young"],
      description:
        "A charming, laid-back gentleman with a heart of gold and a signature wrinkled smile, ideal for cozy company.",
      price: "$3,000",
    },
    {
      __typename: "Pet",
      id: 2,
      title: "Cooper",
      imageSrc: "/images/best-propositions/best-propositions-2.png",
      tags: ["Retriever Mix", "Puppy"],
      description:
        "A sweet and intelligent mixed-breed pup with a gorgeous golden-brown coat and a wonderfully friendly temperament.",
      price: "$850",
    },
    {
      __typename: "Pet",
      id: 3,
      title: "Sunny",
      imageSrc: "/images/best-propositions/best-propositions-3.png",
      tags: ["Golden Retriever", "Puppy"],
      description:
        "A fluffy bundle of joy and energy, eager to learn, play, and grow into your family's best friend",
      price: "$2,500",
    },
    {
      __typename: "Pet",
      id: 4,
      title: "Bailey",
      imageSrc: "/images/best-propositions/best-propositions-4.png",
      tags: ["Golden Retriever", "Young"],
      description:
        "A gentle-natured and loyal companion, already trained and perfect for a family seeking a calm, loving friend.",
      price: "$1,200",
    },
    {
      __typename: "Pet",
      id: 5,
      title: "Bailey",
      imageSrc: "/images/best-propositions/best-propositions-4.png",
      tags: ["Golden Retriever", "Young"],
      description:
        "A gentle-natured and loyal companion, already trained and perfect for a family seeking a calm, loving friend.",
      price: "$1,200",
    },
  ],
};

export default bestPropositionsMock;
