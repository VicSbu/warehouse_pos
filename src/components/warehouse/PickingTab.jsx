import { useEnterprise } from "../../context/EnterpriseContext";
export default function PickingTab() {
  const {
    completePicking,
    lastScanned,
    pickList,
    setPickList,
    setScanMode,
    setScannerOpen,
  } = useEnterprise();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-4">
      <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[13px] font-semibold">Bin Picking Queue</div>
          <span className="text-[11px] px-2 py-1 rounded bg-[#0f172a] border border-[#2c3b55]">
            {"Dashed • "}
            {pickList.length}
            {" picks"}
          </span>
        </div>
        <div className="rounded-[12px] border border-dashed border-[#2c3b55] bg-[#0f172a] p-3 min-h-[160px]">
          {pickList.length === 0 ? (
            <div className="h-[120px] grid place-items-center text-center">
              <div>
                <div className="text-[12px] text-[#94a3b8]">
                  No picks — scan items
                </div>
                <div className="mt-1">
                  <span className="text-[10px] px-2 py-1 rounded bg-[#1e293b] border border-[#2c3b55]">
                    Kbd Scan barcode to add
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {pickList.map((line, index) => (
                <div className="flex items-center gap-2 bg-[#1e293b] border border-[#2c3b55] rounded-[10px] px-3 py-2 text-[12px]">
                  <span className="mono font-semibold">{line.sku}</span>
                  <span className="flex-1 truncate">{line.name}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#0f172a] border border-[#2c3b55]">
                    {line.bin}
                  </span>
                  <span className="mono">x{line.qty}</span>
                  <button
                    onClick={() =>
                      setPickList((prev) =>
                        prev.filter((_line, i) => i !== index),
                      )
                    }
                    className="w-6 h-6 grid place-items-center rounded bg-[#0f172a] border border-[#2c3b55] text-[#ef4444]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between text-[12px] pt-3 border-t border-[#2c3b55]">
            <span className="text-[#94a3b8]">
              {"Total: "}
              {pickList.length}
              {" SKUs • "}
              {pickList.reduce((sum, line) => sum + line.qty, 0)}
              {" units"}
            </span>
            <span className="mono">
              E
              {pickList
                .reduce((sum, line) => sum + line.qty * line.price, 0)
                .toFixed(0)}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              setScanMode("picking");
              setScannerOpen(true);
            }}
            className="h-9 px-4 rounded-[10px] border border-[#3b82f6] text-[#3b82f6] text-[12px]"
          >
            Scan to Pick
          </button>
          <button
            onClick={completePicking}
            className="flex-1 h-9 rounded-[10px] bg-[#3b82f6] text-white text-[12px] font-semibold"
          >
            Complete Picking
          </button>
          <button
            onClick={() => setPickList([])}
            className="h-9 px-4 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] text-[12px]"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
        <div className="text-[13px] font-semibold">
          Pick Logic • Bin Guidance
        </div>
        <ul className="mt-3 space-y-2 text-[12px] text-[#94a3b8] list-disc pl-4">
          <li>
            Scanner reads Code128 / QR — lookup SKU, highlight bin priority walk
            A1 → B3 → Yard
          </li>
          <li>
            Auto-deduct on Complete — Stock OUT log + voice TTS placeholder
          </li>
          <li>Bin A1-R2 → A2 → B1 → Bulk Silo → Yard Stockpile optimal walk</li>
          <li>Last scanned mono box persists for USB HID focus</li>
        </ul>
        <div className="mt-4 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] p-3">
          <div className="text-[11px] text-[#94a3b8]">Last Scanned</div>
          <div className="mono text-[12px] mt-1">
            {lastScanned
              ? `${lastScanned.sku} • ${lastScanned.bin} • Qty ${lastScanned.qty}`
              : "— none —"}
          </div>
        </div>
      </div>
    </div>
  );
}
