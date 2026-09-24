/** Seed purchase orders. status: "DRAFT" | "SENT" | "RECEIVED" */
export const INITIAL_PURCHASE_ORDERS = [
  {
    poNo: "PO-8842",
    date: "2026-09-09",
    supplier: "Autoworld Matsapha",
    phone: "+268 7612 8890",
    items: [
      {
        qty: 20,
        name: "Oil Filter NP200 195",
      },
      {
        qty: 3,
        name: "Starter Motor 3200",
      },
    ],
    total: 13500,
    status: "SENT",
    whatsapp: true,
  },
  {
    poNo: "PO-8843",
    date: "2026-09-10",
    supplier: "Cashbuild Mbabane",
    phone: "+268 2404 7000",
    items: [
      {
        qty: 15,
        name: "River Sand 280",
      },
    ],
    total: 4200,
    status: "DRAFT",
    whatsapp: false,
  },
];
