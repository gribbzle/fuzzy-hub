import { DataGridProps } from "@portal/market/ui/molecules";

const sellerMetricsMock: DataGridProps = {
  columns: [
    {
      field: "metric",
      headerName: "Metric",
      width: 260,
      renderCell: (children) => <b>{children}</b>,
    },
    {
      field: "value",
      headerName: "Value",
      width: 340,
    },
    {
      field: "detail",
      headerName: "Detail",
      width: 260,
    },
  ],
  rows: [
    {
      metric: "Total Orders (Puppies Placed)",
      value: "124",
      detail: "Happy homes since 2020",
    },
    {
      metric: "Total Orders Refunded",
      value: "0",
      detail: "Zero refunds issued",
    },
    {
      metric: "Customers Served",
      value: "124",
      detail: "100% satisfaction rate",
    },
    {
      metric: "Best Selling Product",
      value: "Pembroke Welsh Corgi (Red & White)",
      detail: "Our signature companions",
    },
  ],
};

export default sellerMetricsMock;
