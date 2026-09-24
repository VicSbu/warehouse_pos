import { useEnterprise } from "../../context/EnterpriseContext";
export default function AutoPartsForm() {
  const {
    addAutoPartToCart,
    coreCharge,
    partPrice,
    partQty,
    partQuery,
    pickList,
    setCoreCharge,
    setPartPrice,
    setPartQty,
    setPartQuery,
    setScanMode,
    setScannerOpen,
    setVehicleMake,
    setVehicleModel,
    setVehicleYear,
    vehicleMake,
    vehicleModel,
    vehicleYear,
  } = useEnterprise();
  return (
    <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <select
          value={vehicleMake}
          onChange={(event) => setVehicleMake(event.target.value)}
          className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[13px]"
        >
          <option>Toyota</option>
          <option>Nissan</option>
          <option>Ford</option>
        </select>
        <select
          value={vehicleModel}
          onChange={(event) => setVehicleModel(event.target.value)}
          className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[13px]"
        >
          <option>Hilux</option>
          <option>Corolla</option>
          <option>NP200</option>
          <option>Ranger</option>
        </select>
        <select
          value={vehicleYear}
          onChange={(event) => setVehicleYear(event.target.value)}
          className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[13px]"
        >
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
          <option>2018</option>
        </select>
      </div>
      <div className="relative">
        <input
          value={partQuery}
          onChange={(event) => setPartQuery(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && addAutoPartToCart()}
          placeholder="Scan barcode or type 04465-0K290"
          className="w-full h-11 rounded-[12px] bg-[#0f172a] border border-[#2c3b55] px-3.5 mono text-[13px] outline-none focus:border-[#3b82f6]"
        />
        <span className="absolute right-2 top-1.5 text-[10px] px-2 py-1 rounded bg-[#0f172a] border border-[#2c3b55] text-[#94a3b8]">
          ↵ Enter
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={partQty}
            onChange={(event) => setPartQty(Number(event.target.value))}
            className="h-10 w-full rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[13px]"
            placeholder="Qty"
          />
          <input
            type="number"
            value={partPrice}
            onChange={(event) => setPartPrice(Number(event.target.value))}
            className="h-10 w-full rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[13px]"
            placeholder="Price"
          />
        </div>
        <label className="h-10 flex items-center justify-between px-3 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] text-[13px]">
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 grid place-items-center rounded bg-[#f59e0b]/15 text-[#f59e0b]">
              E
            </span>
            {" Core Deposit E450"}
          </span>
          <button
            onClick={() => setCoreCharge((prev) => !prev)}
            className={`w-10 h-6 rounded-full transition relative ${coreCharge ? "bg-[#3b82f6]" : "bg-[#334155]"}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${coreCharge ? "left-[18px]" : "left-0.5"}`}
            />
          </button>
        </label>
      </div>
      <div className="flex gap-2">
        <button
          onClick={addAutoPartToCart}
          className="flex-1 h-11 rounded-[12px] bg-[#3b82f6] text-white font-semibold text-[13px] hover:bg-[#2563eb]"
        >
          Add to Job Card
        </button>
        <button
          onClick={() => {
            setScanMode("pos");
            setScannerOpen(true);
          }}
          className="h-11 px-4 rounded-[12px] bg-[#0f172a] border border-[#2c3b55] text-[13px]"
        >
          Scan & Add
        </button>
      </div>
      <div className="rounded-[12px] border border-dashed border-[#2c3b55] bg-[#0f172a]/60 p-3 min-h-[88px]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[12px] font-semibold">Bin Pick Box</div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e293b] border border-[#2c3b55] text-[#94a3b8]">
            pick-list
          </span>
        </div>
        {pickList.length === 0 ? (
          <div className="text-[12px] text-[#94a3b8]">
            No picks — scan items to guide walk A1 → Yard.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[140px] overflow-auto pr-1">
            {pickList.map((line) => (
              <div className="flex items-center justify-between text-[12px] bg-[#1e293b] border border-[#2c3b55] rounded-[10px] px-2.5 py-1.5">
                <span className="mono">{line.sku}</span>
                <span className="truncate mx-2">{line.name}</span>
                <span className="text-[#94a3b8]">
                  {line.bin}
                  {" • x"}
                  {line.qty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
