import { useEnterprise } from "../../context/EnterpriseContext";
export default function InventoryTable() {
  const {
    adjustStock,
    filteredInventory,
    notify,
    setLastScanned,
    setPickList,
    setScanMode,
    setScannerOpen,
  } = useEnterprise();
  return (
    <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] overflow-auto">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-[140px_220px_100px_130px_90px_80px_80px_90px_140px] gap-2 px-3 py-2.5 text-[11px] text-[#94a3b8] border-b border-[#2c3b55] bg-[#0f172a]/40">
          <span>SKU / Barcode</span>
          <span>Product + Supplier</span>
          <span>Category</span>
          <span>Location</span>
          <span>Qty</span>
          <span>Min</span>
          <span>Value</span>
          <span>Status</span>
          <span>Pick / Adjust</span>
        </div>
        {filteredInventory.map((item) => {
          let isLow = item.qty <= item.min,
            isWarning = item.qty <= item.min * 1.5 && !isLow;
          return (
            <div className="grid grid-cols-[140px_220px_100px_130px_90px_80px_80px_90px_140px] gap-2 px-3 py-2.5 items-center text-[12px] border-b border-[#0f172a] hover:bg-[#0f172a]/40">
              <div>
                <div className="mono font-semibold">{item.sku}</div>
                <div className="mono text-[10px] text-[#94a3b8]">
                  {item.barcode}
                </div>
              </div>
              <div>
                <div className="font-medium truncate">{item.name}</div>
                <div className="text-[11px] text-[#94a3b8] truncate">
                  {item.supplier}
                </div>
              </div>
              <div className="text-[11px]">{item.cat}</div>
              <div>
                <span className="text-[11px] px-2 py-1 rounded bg-[#0f172a] border border-[#2c3b55] mono">
                  {item.bin}
                </span>
              </div>
              <div
                className={`mono font-semibold ${isLow ? "text-[#ef4444]" : ""}`}
              >
                {item.qty}
              </div>
              <div className="mono text-[#94a3b8]">{item.min}</div>
              <div className="mono">E{(item.qty * item.price).toFixed(0)}</div>
              <div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isLow ? "bg-[#ef4444]/15 text-[#ef4444]" : isWarning ? "bg-[#f59e0b]/15 text-[#f59e0b]" : "bg-[#10b981]/15 text-[#10b981]"}`}
                >
                  {isLow
                    ? item.qty === 0
                      ? "Out of Stock"
                      : "Low"
                    : isWarning
                      ? "Near Low"
                      : "In Stock"}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => adjustStock(item.sku, 1)}
                  className="w-7 h-7 grid place-items-center rounded-[8px] bg-[#0f172a] border border-[#2c3b55]"
                >
                  +1
                </button>
                <button
                  onClick={() => adjustStock(item.sku, -1)}
                  className="w-7 h-7 grid place-items-center rounded-[8px] bg-[#0f172a] border border-[#2c3b55]"
                >
                  -1
                </button>
                <button
                  onClick={() => {
                    setPickList((prev) => [
                      ...prev,
                      {
                        sku: item.sku,
                        name: item.name,
                        qty: 1,
                        price: item.price,
                        bin: item.bin,
                      },
                    ]);
                    notify(`Pick ${item.sku} added`);
                  }}
                  className="h-7 px-2 rounded-[8px] bg-[#3b82f6]/15 border border-[#3b82f6]/30 text-[#3b82f6] text-[11px]"
                >
                  Pick
                </button>
                <button
                  onClick={() => {
                    setScanMode("warehouse");
                    setLastScanned(item);
                    setScannerOpen(true);
                  }}
                  className="h-7 px-2 rounded-[8px] bg-[#0f172a] border border-[#2c3b55] text-[11px]"
                >
                  Scan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
