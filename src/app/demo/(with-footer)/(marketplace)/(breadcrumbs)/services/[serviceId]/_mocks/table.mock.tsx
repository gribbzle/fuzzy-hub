import { DataGridProps } from "@portal/market/ui/molecules";

const tableMock: DataGridProps = {
  columns: [
    {
      field: "service",
      headerName: "Service",
      width: 320,
      renderCell: (children) => <b>{children}</b>,
    },
    {
      field: "price",
      headerName: "Starting Price",
      width: 180,
      renderCell: (children) => <b>{children}</b>,
    },
    {
      field: "description",
      headerName: "Description",
      width: 726,
    },
  ],
  rows: [
    {
      service: "Initial Wellness Exam",
      price: "$65",
      description:
        "A comprehensive head-to-tail physical check-up to assess your pet's overall health. Includes consultation on diet, behavior, and preventive care plan.",
    },
    {
      service: "Vaccination (Core)",
      price: "$35",
      description:
        "Administration of essential vaccines like Rabies, Distemper, or Parvovirus. Includes a brief health check prior to injection to ensure your pet is fit for vaccination.",
    },
    {
      service: "Dental Cleaning",
      price: "$350+",
      description:
        "A professional cleaning under safe anesthesia to remove plaque and tartar, promoting oral health. Includes basic scaling, polishing, and a pre-anesthetic blood screen.",
    },
    {
      service: "Spay/Neuter (Cat)",
      price: "$250+",
      description:
        "A routine surgical procedure to prevent unwanted litters and certain health issues. The package includes anesthesia, surgery, pain medication, and a pre-op blood panel.",
    },
    {
      service: "Spay/Neuter (Dog)",
      price: "$350+",
      description:
        "Surgical sterilization, with cost varying significantly by the dog's size, breed, and age. Includes all pre-operative checks, the procedure, anesthesia, and take-home pain relief.",
    },
    {
      service: "Emergency Triage Fee",
      price: "$95",
      description:
        "The initial assessment fee for urgent walk-in cases, prioritizing pets based on medical severity. This fee covers the immediate evaluation and stabilization plan, separate from further treatment costs.",
    },
    {
      service: "Microchipping",
      price: "$55",
      description:
        "A detailed diagnostic test checking organ function, blood cell counts, and thyroid levels in older pets. Ideal for establishing baselines and detecting age-related issues early during wellness visits.",
    },
  ],
};

export default tableMock;
