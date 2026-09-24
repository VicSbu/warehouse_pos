import { useEnterprise } from "../context/EnterpriseContext";
export default function Sidebar() {
  const {
    activeTab,
    inventory,
    setActiveTab,
    setSidebarOpen,
    sidebarOpen,
    stockValue,
  } = useEnterprise();
  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 w-[260px] bg-[#162032] border-r border-[#2c3b55] z-30 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="h-[64px] px-5 flex items-center gap-3 border-b border-[#2c3b55]">
        <div className="w-9 h-9 rounded-[10px] bg-[#3b82f6] grid place-items-center font-bold text-[15px]">
          D
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-tight">
            Dual-Enterprise OS
          </div>
          <div className="text-[11px] text-[#94a3b8] flex items-center gap-1.5">
            {"v3.0.0 "}
            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-[#1e293b] border border-[#2c3b55] text-[#10b981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-[pulseDot_1.5s_infinite]" />
              {" Scanner Ready"}
            </span>
          </div>
        </div>
      </div>
      <div className="p-3 overflow-auto flex-1">
        <div className="text-[10px] tracking-[0.12em] font-semibold text-[#94a3b8] mb-2 px-2">
          OPERATIONS
        </div>
        {[
          {
            id: "pos",
            label: "Hybrid POS Live",
            icon: "◍",
            active: activeTab === "pos",
          },
          {
            id: "yard",
            label: "Block Yard Monitor",
            icon: "◫",
          },
          {
            id: "warehouse",
            label: "Warehouse + POs",
            icon: "▤",
            badge: 7,
          },
        ].map((item) => (
          <button
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-medium transition ${activeTab === item.id ? "bg-[#3b82f6]/14 text-[#f8fafc] border border-[#3b82f6]/30" : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc] border border-transparent"}`}
          >
            <span
              className={`w-7 h-7 grid place-items-center rounded-[8px] text-[13px] ${activeTab === item.id ? "bg-[#3b82f6] text-white" : "bg-[#1e293b] border border-[#2c3b55]"}`}
            >
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.id === "pos" && (
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_0_4px_rgba(16,185,129,.15)]" />
            )}
            {item.badge && (
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#ef4444] text-white font-semibold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
        <div className="text-[10px] tracking-[0.12em] font-semibold text-[#94a3b8] mt-6 mb-2 px-2">
          FINANCE
        </div>
        {[
          {
            id: "ar",
            label: "AR & WhatsApp Billing",
            badge: 3,
          },
          {
            id: "bi",
            label: "Executive BI & Yield",
          },
        ].map((item) => (
          <button
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-medium transition ${activeTab === item.id ? "bg-[#3b82f6]/14 text-[#f8fafc] border border-[#3b82f6]/30" : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc] border border-transparent"}`}
          >
            <span
              className={`w-7 h-7 grid place-items-center rounded-[8px] ${activeTab === item.id ? "bg-[#3b82f6] text-white" : "bg-[#1e293b] border border-[#2c3b55]"} text-[12px]`}
            >
              {item.id === "ar" ? "ₑ" : "◑"}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#ef4444] text-white font-semibold">
                {item.badge}
              </span>
            )}
          </button>
        ))}
        <div className="text-[10px] tracking-[0.12em] font-semibold text-[#94a3b8] mt-6 mb-2 px-2">
          SYSTEMS
        </div>
        <button
          onClick={() => {
            setActiveTab("settings");
            setSidebarOpen(false);
          }}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-medium transition ${activeTab === "settings" ? "bg-[#3b82f6]/14 text-[#f8fafc] border border-[#3b82f6]/30" : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f8fafc] border border-transparent"}`}
        >
          <span
            className={`w-7 h-7 grid place-items-center rounded-[8px] ${activeTab === "settings" ? "bg-[#3b82f6] text-white" : "bg-[#1e293b] border border-[#2c3b55]"} text-[12px]`}
          >
            ⚙
          </span>
          <span className="flex-1 text-left">Settings</span>
        </button>
        <div className="mt-8 p-3 rounded-[12px] bg-[#1e293b] border border-[#2c3b55]">
          <div className="text-[11px] text-[#94a3b8]">Stock Value</div>
          <div className="mono text-[18px] font-semibold">
            E
            {stockValue.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="text-[11px] text-[#10b981] mt-1">
            {"▲ 4.2% • "}
            {inventory.length}
            {" SKUs"}
          </div>
          <div className="mt-2 h-1.5 bg-[#0f172a] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#3b82f6]"
              style={{
                width: "68%",
              }}
            />
            <div
              className="h-full bg-[#f59e0b]"
              style={{
                width: "22%",
              }}
            />
            <div
              className="h-full bg-[#ef4444]"
              style={{
                width: "10%",
              }}
            />
          </div>
        </div>
      </div>
      <div className="p-3 border-t border-[#2c3b55] text-[11px] text-[#94a3b8]">
        © Mbabane Industrial Hub • SAST
      </div>
    </aside>
  );
}
