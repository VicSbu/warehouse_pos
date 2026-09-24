import { useEnterprise } from "../context/EnterpriseContext";
export default function ToastStack() {
  const { toasts } = useEnterprise();
  return (
    <div className="fixed bottom-4 right-4 z-[120] space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          className={`pointer-events-auto min-w-[280px] max-w-[380px] rounded-[12px] border px-4 py-3 text-[12px] shadow-[0_12px_30px_rgba(0,0,0,.4)] flex gap-2 items-start ${toast.type === "err" ? "bg-[#450a0a] border-[#ef4444]/40 text-[#fecaca]" : toast.type === "warn" ? "bg-[#451a03] border-[#f59e0b]/40 text-[#fde68a]" : "bg-[#1e293b] border-[#2c3b55] text-white"}`}
          style={{
            animation: "slideIn .25s ease",
          }}
        >
          <span
            className={`w-6 h-6 grid place-items-center rounded-[8px] text-[12px] ${toast.type === "err" ? "bg-[#ef4444] text-white" : toast.type === "warn" ? "bg-[#f59e0b] text-black" : "bg-[#3b82f6] text-white"}`}
          >
            {toast.type === "err" ? "!" : "✓"}
          </span>
          <span className="flex-1 leading-5">{toast.msg}</span>
        </div>
      ))}
    </div>
  );
}
