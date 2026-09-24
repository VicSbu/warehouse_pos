import { useEnterprise } from "../context/EnterpriseContext";
export default function YardView() {
  const { bomQty, notify, setBomQty } = useEnterprise();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <h1 className="text-[20px] font-semibold">Block Yard Monitor</h1>
          <p className="text-[12px] text-[#94a3b8]">
            Curing bays • Stockpiles • Yield
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#1e293b] border border-[#2c3b55] text-[12px]">
          🌡 27°C 68% • Wind NW
        </span>
        <button
          onClick={() => notify("Yard refreshed")}
          className="ml-auto h-8 px-3 rounded-[10px] bg-[#1e293b] border border-[#2c3b55] text-[12px]"
        >
          ↻ Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_.8fr] gap-4">
        <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
          <div className="text-[13px] font-semibold mb-3">
            Bay Status Grid • 9 Bays
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                bay: "A1",
                status: "curing",
                day: "Day 2/7",
              },
              {
                bay: "A2",
                status: "curing",
                day: "Day 5/7",
              },
              {
                bay: "A3",
                status: "ready",
                day: "Ready for Sale",
              },
              {
                bay: "B1",
                status: "curing",
                day: "Day 1/7",
              },
              {
                bay: "B2",
                status: "empty",
                day: "Empty",
              },
              {
                bay: "B3",
                status: "ready",
                day: "Ready for Sale",
              },
              {
                bay: "C1",
                status: "curing",
                day: "Day 3/7",
              },
              {
                bay: "C2",
                status: "ready",
                day: "Ready for Sale",
              },
              {
                bay: "C3",
                status: "empty",
                day: "Empty",
              },
            ].map((item) => (
              <div className="rounded-[12px] bg-[#0f172a] border border-[#2c3b55] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold">
                    {"Bay "}
                    {item.bay}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.status === "ready" ? "bg-[#10b981]/15 text-[#10b981]" : item.status === "curing" ? "bg-[#f59e0b]/15 text-[#f59e0b]" : "bg-[#334155] text-[#94a3b8]"}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#94a3b8] mt-1">
                  {item.day}
                </div>
                <div className="mt-2 h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.status === "ready" ? "bg-[#10b981] w-[100%]" : item.status === "curing" ? "bg-[#f59e0b] w-[60%]" : "bg-[#475569] w-[8%]"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 space-y-4">
            {[
              {
                label: "Cement",
                pct: 78,
                meta: "156 bags",
                color: "#3b82f6",
              },
              {
                label: "River Sand",
                pct: 42,
                meta: "8.4m³ Warning",
                color: "#f59e0b",
              },
              {
                label: "Agg 19mm",
                pct: 90,
                meta: "18 tons",
                color: "#10b981",
              },
            ].map((item) => (
              <div>
                <div className="flex justify-between text-[12px]">
                  <span>{item.label}</span>
                  <span className="mono text-[#94a3b8]">
                    {item.pct}
                    {"% • "}
                    {item.meta}
                  </span>
                </div>
                <div className="mt-1.5 h-2 bg-[#0f172a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
            <div className="text-[13px] font-semibold">Batch Calculator</div>
            <div className="flex gap-2 mt-3">
              <input
                type="number"
                value={bomQty}
                onChange={(event) => setBomQty(Number(event.target.value))}
                className="flex-1 h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[13px]"
              />
              <button
                onClick={() => notify(`BOM calc for ${bomQty} blocks`)}
                className="h-10 px-4 rounded-[10px] bg-[#3b82f6] text-white text-[12px] font-semibold"
              >
                Calculate
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-[#0f172a] border border-[#2c3b55] rounded-[12px] p-3 leading-5">
              <span>
                {"Cement Bags: "}
                <b className="text-white">{(bomQty * 0.013).toFixed(1)}</b>
              </span>
              <span>
                {"Agg tons: "}
                <b className="text-white">{(bomQty * 0.005).toFixed(2)}</b>
              </span>
              <span>
                {"Sand m³: "}
                <b className="text-white">{(bomQty * 0.0042).toFixed(2)}</b>
              </span>
              <span>
                {"Water L: "}
                <b className="text-white">{(bomQty * 0.84).toFixed(0)}</b>
              </span>
              <span>
                {"Est Cost: "}
                <b className="text-white">E{(bomQty * 2.8).toFixed(0)}</b>
              </span>
              <span>
                {"Est Revenue: "}
                <b className="text-white">E{(bomQty * 4.2).toFixed(0)}</b>
              </span>
              <span className="col-span-2 text-[#10b981] font-semibold mt-1">
                Margin: E{(bomQty * 1.4).toFixed(0)}
                {" • 33.3%"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
