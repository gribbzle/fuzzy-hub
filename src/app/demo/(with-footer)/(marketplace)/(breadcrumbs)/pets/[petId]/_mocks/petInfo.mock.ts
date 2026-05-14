import { PetInfoProps } from "@portal/market/ui/organisms";

const petInfoMock: PetInfoProps = {
  title: "Peanut – Affectionate Pembroke Welsh Corgi Adult",
  tags: ["⭐ Pet of the Week", "Pembroke Corgi", "Dogs", "Adult", "Male"],
  description:
    "Peanut is a clever and strikingly handsome Pembroke Welsh Corgi puppy who promises to be more than just a pet – he's a future best friend, a source of daily laughter with his playful antics, and a loyal shadow. Bred for intelligence and a loving temperament, he's already showing fantastic socialization skills, curiosity about the world, and that signature corgi charm. He's looking for an active family or individual who understands the herding spirit and is ready for a lifetime of adventure, training, and cuddles on the couch.",
  specifications: [
    { label: "Breed:", value: "Pembroke Welsh Corgi" },
    { label: "Age:", value: "4 years (Adult)" },
    { label: "Gender:", value: "Male" },
    { label: "Color:", value: "Red & White with classic markings" },
    { label: "Size:", value: "Expected to be standard (10-12 kg / 22-28 lbs)" },
    {
      label: "Pedigree:",
      value: "AKC registered, full documentation provided",
    },
    {
      label: "Vaccination & Health:",
      value:
        "Fully vet-checked, dewormed, and up-to-date on first vaccinations. Comes with a health guarantee",
    },
    {
      label: "Temperament:",
      value: "Intelligent, Alert, Affectionate, Playful",
    },
    {
      label: "Training Status:",
      value: "Litter-trained, started on basic socialization",
    },
  ],
  availability:
    "Available for a meet & greet. Ready for his new home in 2 weeks.",
};

export default petInfoMock;
