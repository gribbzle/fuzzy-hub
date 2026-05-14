import { SellerInfoProps } from "@portal/market/ui/organisms";

const sellerInfo: SellerInfoProps = {
  name: "Royal Paws Corgis",
  location: "Portland, Oregon, USA",
  specifications: [
    {
      label: "Store Category:",
      value: "Dog Breeder - Pembroke Welsh Corgis",
    },
    {
      label: "Store Tags:",
      value: [
        "Ethical Breeding",
        "Health Guarantee",
        "AKC Registered",
        "Family-Raised Puppies",
        "Lifetime Support",
      ],
    },
    {
      label: "Joining Date:",
      value: "Member of Fuzzy Hub since February 2020",
    },
    {
      label: "Response Time:",
      value: "Typically replies within 1 hour",
    },
  ],
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export default sellerInfo;
