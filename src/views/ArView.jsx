import { useEnterprise } from "../context/EnterpriseContext";
export default function ArView() {
  const { notify } = useEnterprise();
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-[20px] font-semibold">AR & WhatsApp Billing</h1>
          <p className="text-[12px] text-[#94a3b8]">
            Credit limits overdue one-tap reminders
          </p>
        </div>
        <button
          onClick={() => notify("Bulk WhatsApp reminders sent to 3 accounts")}
          className="ml-auto h-9 px-4 rounded-[10px] bg-[#25D366] text-black text-[12px] font-semibold"
        >
          Bulk Remind
        </button>
      </div>
      <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 overflow-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="text-[14px] font-semibold">
            Contractor Credit Overview • SZL
          </div>
          <input
            placeholder="Search contractor"
            className="ml-auto h-8 w-[200px] rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[12px]"
          />
          <button
            onClick={() => notify("CSV exported: AR-2026-09-10.csv")}
            className="h-8 px-3 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] text-[11px]"
          >
            Export CSV
          </button>
        </div>
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[200px_100px_100px_100px_140px_80px_160px] gap-2 text-[11px] text-[#94a3b8] px-2 py-2 border-b border-[#2c3b55]">
            <span>Client</span>
            <span>Limit</span>
            <span>Used</span>
            <span>Balance</span>
            <span>Utilization</span>
            <span>Overdue</span>
            <span>Action</span>
          </div>
          {[
            {
              client: "Sifiso Dlamini Projects",
              limit: 50000,
              used: 42000,
              overdue: 7200,
              phone: "+268 7611 0001",
            },
            {
              client: "Matsapha Builders",
              limit: 80000,
              used: 76000,
              overdue: 5000,
              phone: "+268 7611 0002",
            },
            {
              client: "Mbabane Roofing Co",
              limit: 30000,
              used: 12000,
              overdue: 0,
              phone: "+268 7611 0003",
            },
            {
              client: "Eswatini Civils JV",
              limit: 120000,
              used: 115000,
              overdue: 2000,
              phone: "+268 7611 0004",
            },
          ].map((item) => {
            let usagePct = (item.used / item.limit) * 100;
            return (
              <div className="grid grid-cols-[200px_100px_100px_100px_140px_80px_160px] gap-2 items-center px-2 py-3 border-b border-[#0f172a] text-[12px] hover:bg-[#0f172a]/40">
                <span className="font-medium truncate">{item.client}</span>
                <span className="mono">E{item.limit}</span>
                <span className="mono">E{item.used}</span>
                <span className="mono">E{item.limit - item.used}</span>
                <div className="w-[140px] h-2 bg-[#0f172a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(usagePct, 100)}%`,
                      background:
                        usagePct > 90
                          ? "#ef4444"
                          : usagePct > 70
                            ? "#f59e0b"
                            : "#10b981",
                    }}
                  />
                </div>
                <span
                  className={`mono ${item.overdue ? "text-[#ef4444]" : "text-[#94a3b8]"}`}
                >
                  {item.overdue ? `E${item.overdue}` : "—"}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      notify(`WhatsApp invoice sent to ${item.client}`)
                    }
                    className="h-7 px-2.5 rounded-[8px] bg-[#25D366] text-black text-[11px] font-semibold"
                  >
                    WhatsApp Invoice
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
