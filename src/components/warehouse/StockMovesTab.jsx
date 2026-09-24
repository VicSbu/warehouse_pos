export default function StockMovesTab() {
  return (
    <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
      <div className="text-[13px] font-semibold mb-3">
        Stock Movements • IN / OUT / ADJUST
      </div>
      <div className="space-y-2">
        {[
          {
            time: "09:21",
            type: "OUT",
            sku: "04465-0K290",
            name: "Brake Pad Hilux",
            qty: -1,
            ref: "INV-MB-8841",
            user: "Thandi",
          },
          {
            time: "08:44",
            type: "IN",
            sku: "PPC-42.5N-50KG",
            name: "PPC Cement",
            qty: 50,
            ref: "GRN-221",
            user: "Musa",
          },
          {
            time: "Yesterday",
            type: "ADJUST",
            sku: "RSAND-BLACK-01",
            name: "River Sand",
            qty: -0.6,
            ref: "Yield Audit",
            user: "System",
          },
        ].map((item, index) => (
          <div className="flex items-center gap-3 text-[12px] bg-[#0f172a] border border-[#2c3b55] rounded-[10px] px-3 py-2">
            <span className="mono text-[#94a3b8]">{item.time}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.type === "IN" ? "bg-[#10b981]/15 text-[#10b981]" : item.type === "OUT" ? "bg-[#ef4444]/15 text-[#ef4444]" : "bg-[#f59e0b]/15 text-[#f59e0b]"}`}
            >
              {item.type}
            </span>
            <span className="mono">{item.sku}</span>
            <span className="flex-1 truncate">{item.name}</span>
            <span
              className={`mono ${item.qty > 0 ? "text-[#10b981]" : "text-[#ef4444]"}`}
            >
              {item.qty > 0 ? `+${item.qty}` : item.qty}
            </span>
            <span className="text-[#94a3b8]">
              {item.ref}
              {" • "}
              {item.user}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
