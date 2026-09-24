import { useEnterprise } from "../../context/EnterpriseContext";
export default function BlockOrderForm() {
  const {
    addBlockOrderToCart,
    blockProduct,
    blockQty,
    deliveryZone,
    setBlockProduct,
    setBlockQty,
    setDeliveryZone,
    setTransport,
    transport,
  } = useEnterprise();
  return (
    <div className="rounded-[14px] bg-[#1e293b] border border-[#f59e0b]/30 p-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <select
          value={blockProduct}
          onChange={(event) => setBlockProduct(event.target.value)}
          className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[13px]"
        >
          <option>150H - E4.20</option>
          <option>200S - E6.80</option>
          <option>PAV - E2.90</option>
        </select>
        <input
          type="number"
          value={blockQty}
          onChange={(event) => setBlockQty(Number(event.target.value))}
          className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[13px]"
          placeholder="Qty"
        />
      </div>
      <div className="rounded-[12px] bg-[#0f172a] border border-[#2c3b55] p-3 text-[12px] leading-5">
        <div className="font-semibold mb-1 flex items-center gap-2">
          {"BOM Box "}
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30">
            Yield 98.4%
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 text-[#94a3b8]">
          <span>
            {"Cement bags: "}
            <b className="text-white">{(blockQty * 0.013).toFixed(1)}</b>
          </span>
          <span>
            {"Sand m³: "}
            <b className="text-white">{(blockQty * 0.0042).toFixed(2)}</b>
          </span>
          <span>
            {"Agg tons: "}
            <b className="text-white">{(blockQty * 0.005).toFixed(2)}</b>
          </span>
          <span>
            {"Water L: "}
            <b className="text-white">{(blockQty * 0.84).toFixed(0)}</b>
          </span>
        </div>
        <div className="mt-2 text-[11px] text-[#94a3b8]">
          Settings • Recipes • Curing 7 days
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <select
          value={transport}
          onChange={(event) => setTransport(event.target.value)}
          className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[13px]"
        >
          <option>Own Truck - E850</option>
          <option>Client Pickup - E0</option>
          <option>Hired 6T - E1200</option>
        </select>
        <select
          value={deliveryZone}
          onChange={(event) => setDeliveryZone(event.target.value)}
          className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[13px]"
        >
          <option>Zone 1 Mbabane - E0</option>
          <option>Zone 2 Matsapha - E250</option>
          <option>Zone 3 Manzini - E450</option>
        </select>
      </div>
      <button
        onClick={addBlockOrderToCart}
        className="w-full h-11 rounded-[12px] bg-[#f59e0b] text-black font-semibold text-[13px] hover:bg-[#fbbf24]"
      >
        Add Blocks
      </button>
    </div>
  );
}
