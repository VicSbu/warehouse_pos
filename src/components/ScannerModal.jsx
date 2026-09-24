import { useEnterprise } from "../context/EnterpriseContext";
export default function ScannerModal() {
  const {
    adjustStock,
    handleScan,
    lastScanned,
    notify,
    scanInput,
    scannerInputRef,
    setCart,
    setScanInput,
    setScannerOpen,
  } = useEnterprise();
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(2,8,23,.78)",
        backdropFilter: "blur(12px)",
      }}
      onClick={() => setScannerOpen(false)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[460px] rounded-[18px] overflow-hidden border border-[#2c3b55] shadow-[0_24px_60px_rgba(0,0,0,.6)]"
        style={{
          background: "linear-gradient(180deg,#1e293b,#162032)",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#2c3b55]">
          <div>
            <div className="text-[14px] font-semibold">
              Scan Barcode • Bin Picking
            </div>
            <div className="text-[11px] text-[#94a3b8]">
              USB HID / Camera • Code128 QR EAN13
            </div>
          </div>
          <button
            onClick={() => setScannerOpen(false)}
            className="w-8 h-8 grid place-items-center rounded-[10px] bg-[#0f172a] border border-[#2c3b55]"
          >
            ✕
          </button>
        </div>
        <div className="p-[18px] bg-[#0f172a]">
          <div className="h-[160px] rounded-[12px] bg-[#0a1220] border border-[#2c3b55] grid place-items-center relative overflow-hidden">
            <div className="absolute inset-6 border-2 border-dashed border-[#2c3b55] rounded-[10px] grid place-items-center">
              <div className="text-[11px] text-[#94a3b8]">
                Position barcode inside frame
              </div>
            </div>
            <div
              className="absolute left-[14%] right-[14%] h-[2px] bg-gradient-to-r from-transparent via-[#ef4444] to-transparent shadow-[0_0_12px_#ef4444]"
              style={{
                animation: "scan 1.8s ease-in-out infinite",
              }}
            />
          </div>
          {lastScanned && (
            <div className="mt-4 rounded-[12px] bg-[#1e293b] border border-[#2c3b55] p-3 flex gap-3">
              <div className="w-[42px] h-[42px] rounded-[10px] bg-[#3b82f6]/15 grid place-items-center text-[#3b82f6] text-[20px]">
                ▤
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold truncate">
                  {lastScanned.name}
                </div>
                <div className="mono text-[11px] text-[#94a3b8]">
                  {lastScanned.sku}
                  {" • "}
                  {lastScanned.barcode}
                  {" • "}
                  {lastScanned.bin}
                  {" • Qty "}
                  {lastScanned.qty}
                </div>
                <div className="mt-1">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${lastScanned.qty <= lastScanned.min ? "bg-[#ef4444]/15 text-[#ef4444]" : "bg-[#10b981]/15 text-[#10b981]"}`}
                  >
                    {lastScanned.qty <= lastScanned.min ? "Low" : "In Stock"}
                  </span>
                </div>
              </div>
            </div>
          )}
          <input
            ref={scannerInputRef}
            value={scanInput}
            onChange={(event) => setScanInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleScan();
              if (event.key === "Escape") setScannerOpen(false);
            }}
            placeholder="Scan barcode here — focus stays for USB scanner"
            className="mt-4 w-full h-11 rounded-[12px] bg-[#0a1220] border border-[#2c3b55] px-3 mono text-[13px] outline-none focus:border-[#3b82f6]"
            autoFocus={true}
          />
          <div className="mt-3 text-[11px] text-[#94a3b8]">
            {"Tip: USB scanners type SKU + Enter • Try "}
            <b className="text-white">04465-0K290</b>
            {" then Enter"}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleScan()}
              className="flex-1 h-10 rounded-[10px] bg-[#3b82f6] text-white text-[12px] font-semibold"
            >
              Add to Pick
            </button>
            <button
              onClick={() => {
                if (lastScanned)
                  (setCart((prev) => [
                    ...prev,
                    {
                      sku: lastScanned.sku,
                      name: lastScanned.name,
                      qty: 1,
                      price: lastScanned.price,
                      bin: lastScanned.bin,
                    },
                  ]),
                    notify(`Added ${lastScanned.sku} to cart`));
              }}
              className="h-10 px-4 rounded-[10px] bg-[#1e293b] border border-[#2c3b55] text-[12px]"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                if (lastScanned) adjustStock(lastScanned.sku, 1);
              }}
              className="h-10 px-4 rounded-[10px] bg-[#1e293b] border border-[#2c3b55] text-[12px]"
            >
              +1 Stock
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["04465-0K290", "6001688001012", "BLOCK-150H"].map((option) => (
              <button
                onClick={() => {
                  setScanInput(option);
                  setTimeout(() => handleScan(option), 20);
                }}
                className="h-8 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] mono text-[11px]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
