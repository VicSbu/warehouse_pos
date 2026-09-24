import { useEnterprise } from "../../context/EnterpriseContext";
export default function PurchaseOrdersPanel() {
  const { notify, purchaseOrders, receivePO, sendPO, setPurchaseOrders } =
    useEnterprise();
  return (
    <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 overflow-auto">
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <div className="text-[14px] font-semibold">
          Supplier Purchase Orders • WhatsApp LPO Flow
        </div>
        <span className="text-[11px] px-2 py-1 rounded bg-[#0f172a] border border-[#2c3b55] mono">
          {purchaseOrders.filter((po) => po.status !== "RECEIVED").length}
          {" Open • E"}
          {purchaseOrders.reduce((sum, po) => sum + po.total, 0)}{" "}
        </span>
        <button
          onClick={() => {
            let poNo = `PO-${Date.now() % 1e4}`;
            setPurchaseOrders((prev) => [
              {
                poNo: poNo,
                date: new Date().toISOString().slice(0, 10),
                supplier: "Autoworld Matsapha",
                phone: "+268 7612 8890",
                items: [
                  {
                    qty: 5,
                    name: "Misc",
                  },
                ],
                total: 2500,
                status: "DRAFT",
                whatsapp: false,
              },
              ...prev,
            ]);
          }}
          className="ml-auto h-8 px-3 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] text-[11px]"
        >
          + New PO
        </button>
      </div>
      <div className="min-w-[720px]">
        <div className="grid grid-cols-[110px_180px_220px_100px_120px_180px] gap-2 text-[11px] text-[#94a3b8] px-2 py-1.5 border-b border-[#2c3b55]">
          <span>PO No / Date</span>
          <span>Supplier</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {purchaseOrders.map((po) => (
          <div className="grid grid-cols-[110px_180px_220px_100px_120px_180px] gap-2 items-center px-2 py-2.5 border-b border-[#1e293b] text-[12px] hover:bg-[#0f172a]/50">
            <div>
              <div className="mono font-semibold">{po.poNo}</div>
              <div className="mono text-[11px] text-[#94a3b8]">{po.date}</div>
            </div>
            <div>
              <div className="font-medium">{po.supplier}</div>
              <div className="mono text-[11px] text-[#94a3b8]">{po.phone}</div>
            </div>
            <div className="leading-4">
              {po.items.map((line, index) => (
                <div className="text-[11px]">
                  {line.qty}
                  {"x "}
                  {line.name}
                </div>
              ))}
            </div>
            <div className="mono font-semibold">E{po.total}</div>
            <div className="flex flex-col gap-1">
              <span
                className={`w-fit text-[10px] px-2 py-0.5 rounded-full font-semibold ${po.status === "DRAFT" ? "bg-[#334155] text-[#94a3b8]" : po.status === "SENT" ? "bg-[#3b82f6]/15 text-[#3b82f6]" : po.status === "RECEIVED" ? "bg-[#10b981]/15 text-[#10b981]" : "bg-[#f59e0b]/15 text-[#f59e0b]"}`}
              >
                {po.status}
              </span>
              <span className="text-[10px] text-[#94a3b8]">
                {po.whatsapp ? "WhatsApp ✓" : "Not sent"}
              </span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => sendPO(po.poNo)}
                className="h-7 px-2.5 rounded-[8px] bg-[#25D366] text-black text-[11px] font-semibold"
              >
                Send LPO
              </button>
              <button
                onClick={() => receivePO(po.poNo)}
                className="h-7 px-2.5 rounded-[8px] bg-[#3b82f6] text-white text-[11px]"
              >
                Receive
              </button>
              <button
                onClick={() => notify(`PDF ${po.poNo}.pdf exported`)}
                className="h-7 px-2.5 rounded-[8px] bg-[#0f172a] border border-[#2c3b55] text-[11px]"
              >
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
