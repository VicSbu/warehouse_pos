import { useEnterprise } from "../context/EnterpriseContext";
import AutoPartsForm from "../components/pos/AutoPartsForm";
import BlockOrderForm from "../components/pos/BlockOrderForm";
import CartPanel from "../components/pos/CartPanel";
export default function PosView() {
  const { posMode, setPosMode } = useEnterprise();
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_.8fr] gap-4">
      <div className="space-y-4">
        <div>
          <h1 className="text-[20px] font-semibold leading-tight">
            {"Hybrid POS Terminal "}
            <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-[#3b82f6]/15 text-[#3b82f6] border border-[#3b82f6]/30">
              Barcode Ready
            </span>
          </h1>
          <p className="text-[12px] text-[#94a3b8] mt-1">
            Scan OEM pick from bin. Auto / Block yard billing in one flow.
          </p>
        </div>
        <div className="flex gap-2 p-1 bg-[#0f172a] border border-[#2c3b55] rounded-[12px] w-fit">
          <button
            onClick={() => setPosMode("auto")}
            className={`px-4 h-8 rounded-[10px] text-[13px] font-medium transition ${posMode === "auto" ? "bg-[#3b82f6] text-white shadow" : "text-[#94a3b8] hover:text-white"}`}
          >
            Auto
          </button>
          <button
            onClick={() => setPosMode("block")}
            className={`px-4 h-8 rounded-[10px] text-[13px] font-medium transition ${posMode === "block" ? "bg-[#f59e0b] text-black shadow" : "text-[#94a3b8] hover:text-white"}`}
          >
            Block
          </button>
        </div>
        {posMode === "auto" ? <AutoPartsForm /> : <BlockOrderForm />}
      </div>
      <CartPanel />
    </div>
  );
}
