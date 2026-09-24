import { useEnterprise } from "../context/EnterpriseContext";
export default function TopBar() {
  const { clock, setActiveTab, setScanMode, setScannerOpen, setSidebarOpen } =
    useEnterprise();
  return (
    <header className="sticky top-0 z-20 h-[64px] backdrop-blur-[14px] bg-[#0f172a]/80 border-b border-[#2c3b55] flex items-center px-3 lg:px-5 gap-2 lg:gap-3">
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="lg:hidden w-9 h-9 grid place-items-center rounded-[10px] bg-[#1e293b] border border-[#2c3b55]"
      >
        ☰
      </button>
      <div className="hidden md:flex items-center gap-2">
        <span className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-[#1e293b] border border-[#2c3b55] text-[12px]">
          <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_0_4px_rgba(16,185,129,.18)] animate-[pulseDot_1.5s_infinite]" />
          {" Branch "}
          <b>Mbabane Industrial</b>
        </span>
        <span className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-[#1e293b] border border-[#2c3b55] text-[12px]">
          {"Currency "}
          <b>SZL/E</b>
          {" VAT "}
          <b>15%</b> <span className="mono text-[#94a3b8]">{clock}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-[#10b981]/12 border border-[#10b981]/30 text-[12px] text-[#10b981]">
          ● Firebase Synced 42ms
        </span>
      </div>
      <div className="flex-1" />
      <button
        onClick={() => {
          setScanMode("pos");
          setScannerOpen(true);
        }}
        className="h-9 px-3.5 rounded-[10px] border border-[#3b82f6] text-[#3b82f6] text-[13px] font-medium hover:bg-[#3b82f6]/10 flex items-center gap-2"
      >
        <span>◫</span>
        {" Scan Barcode"}
      </button>
      <span className="hidden md:inline-flex h-9 px-2.5 rounded-[10px] bg-[#1e293b] border border-[#2c3b55] text-[12px] items-center gap-1">
        {"⌘ K "}
        <span className="text-[#94a3b8]">OEM</span>
      </span>
      <button
        onClick={() => setActiveTab("pos")}
        className="h-9 px-4 rounded-[10px] bg-[#3b82f6] text-white text-[13px] font-semibold hover:bg-[#2563eb]"
      >
        + New Sale
      </button>
    </header>
  );
}
