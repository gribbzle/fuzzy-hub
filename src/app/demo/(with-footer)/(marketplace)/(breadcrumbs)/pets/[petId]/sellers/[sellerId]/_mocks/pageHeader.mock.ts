import { PageHeaderProps } from "@portal/market/ui/organisms";

const pageHeaderMock: PageHeaderProps = {
  breadcrumbs: [
    { label: "Home", href: "/demo" },
    { label: "Find a Pet", href: "/demo/pets" },
    {
      label: "Peanut – Affectionate Pembroke Welsh Corgi Puppy",
      href: "/demo/pets/1",
    },
    { label: "Royal Paws Corgis" },
  ],
};

export default pageHeaderMock;
