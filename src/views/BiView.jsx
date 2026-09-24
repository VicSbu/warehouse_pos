export default function BiView() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-[20px] font-semibold">Executive BI & Yield</h1>
          <p className="text-[12px] text-[#94a3b8]">
            Branch performance • Margin • Stock integrity
          </p>
        </div>
        <span className="ml-auto px-3 h-8 grid place-items-center rounded-full bg-[#1e293b] border border-[#2c3b55] text-[12px]">
          Today 10 Sep 2026 • Branch Mbabane • SZL
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          {
            label: "Total Daily Sales",
            value: "E48,500",
            up: "12.4% • 23 invoices",
            color: "#3b82f6",
          },
          {
            label: "Auto Margin",
            value: "34.2%",
            up: "2.1pp vs avg",
            color: "#10b981",
          },
          {
            label: "Yield",
            value: "98.4%",
            up: "-0.6% sand loss",
            color: "#f59e0b",
            warn: true,
          },
          {
            label: "Overdue",
            value: "E14,200",
            up: "3 accounts",
            color: "#ef4444",
            warn: true,
          },
        ].map((item) => (
          <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
            <div className="text-[11px] text-[#94a3b8]">{item.label}</div>
            <div className="mono text-[22px] font-semibold mt-1">
              {item.value}
            </div>
            <div
              className={`text-[11px] mt-1 ${item.warn ? "text-[#f59e0b]" : "text-[#10b981]"}`}
            >
              {item.up}
            </div>
            <div className="mt-3 h-1.5 bg-[#0f172a] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: "72%",
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
          <div className="text-[13px] font-semibold">
            Yield Audit • Raw vs Actual
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="text-[11px] text-[#94a3b8]">
                Expected 12.45t vs Actual 12.65t
              </div>
              <div className="text-[12px] mt-1">
                {"Variance +0.20t "}
                <span className="text-[#f59e0b]">1.6% leak</span>
              </div>
              <div className="mt-3 h-2 bg-[#0f172a] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-[#10b981] to-[#3b82f6]"
                  style={{
                    width: "98.4%",
                  }}
                />
              </div>
              <div className="mono text-[11px] mt-1">98.4% yield</div>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-[#10b981]/30 grid place-items-center">
              <span className="mono font-bold text-[16px]">98.4%</span>
            </div>
          </div>
        </div>
        <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
          <div className="text-[13px] font-semibold">Sales Mix Today</div>
          <div className="mt-4 h-3 bg-[#0f172a] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#3b82f6]"
              style={{
                width: "58%",
              }}
            />
            <div
              className="h-full bg-[#f59e0b]"
              style={{
                width: "42%",
              }}
            />
          </div>
          <div className="mt-3 flex gap-4 text-[12px]">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3b82f6]" />
              {" 58% Auto E28,130"}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              {" 42% Blocks E20,370"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
