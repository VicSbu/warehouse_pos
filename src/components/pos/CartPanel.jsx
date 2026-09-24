import { useEnterprise } from "../../context/EnterpriseContext";
export default function CartPanel() {
  const {
    cart,
    invoiceNo,
    notify,
    paymentMethod,
    setCart,
    setPaymentMethod,
    totals,
  } = useEnterprise();
  return (
    <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 h-fit lg:sticky lg:top-[80px]">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold">Order Summary</div>
        <span className="mono text-[11px] px-2 py-1 rounded-[8px] bg-[#0f172a] border border-[#2c3b55]">
          {invoiceNo}
        </span>
      </div>
      <div className="mt-3 min-h-[120px] rounded-[12px] border border-dashed border-[#2c3b55] bg-[#0f172a] p-2.5">
        {cart.length === 0 ? (
          <div className="h-[90px] grid place-items-center text-[12px] text-[#94a3b8]">
            Cart empty — scan barcode to add
          </div>
        ) : (
          <div className="space-y-2 max-h-[260px] overflow-auto pr-1">
            {cart.map((line, index) => (
              <div className="flex gap-2 items-start bg-[#1e293b] border border-[#2c3b55] rounded-[10px] px-2.5 py-2">
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium truncate">
                    {line.name}
                  </div>
                  <div className="mono text-[10px] text-[#94a3b8]">
                    {line.sku} {line.transport ? `• ${line.transport}` : ""}{" "}
                    {line.bin ? `• ${line.bin}` : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="mono text-[12px]">
                    x{line.qty}
                    {" • E"}
                    {(line.qty * line.price).toFixed(2)}
                  </div>
                  <button
                    onClick={() =>
                      setCart(cart.filter((line2, index2) => index2 !== index))
                    }
                    className="text-[10px] text-[#ef4444] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1.5 text-[12px] border-t border-[#2c3b55] pt-3">
        <div className="flex justify-between">
          <span className="text-[#94a3b8]">Subtotal</span>
          <span className="mono">E{totals.sub.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#94a3b8]">Core Deposit</span>
          <span className="mono">E{totals.core.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#94a3b8]">Transport</span>
          <span className="mono">E{totals.trans.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#94a3b8]">VAT 15%</span>
          <span className="mono">E{totals.vat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[14px] font-bold pt-2 border-t border-[#2c3b55]">
          <span>Total</span>
          <span className="mono">E{totals.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-[11px] text-[#94a3b8] mb-2">Credit Terms</div>
        <div className="grid grid-cols-2 gap-2">
          {["Cash", "Card", "WhatsApp Pay", "Net-30"].map((option) => (
            <button
              onClick={() => setPaymentMethod(option)}
              className={`h-9 rounded-[10px] border text-[12px] font-medium ${paymentMethod === option ? "bg-[#3b82f6]/15 border-[#3b82f6]/40 text-[#f8fafc]" : "bg-[#0f172a] border-[#2c3b55] text-[#94a3b8] hover:text-white"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          if (!cart.length) {
            notify("Cart empty", "warn");
            return;
          }
          notify(
            `Invoice ${invoiceNo} sent via WhatsApp • E${totals.total.toFixed(2)}`,
          );
          setCart([]);
        }}
        className="mt-4 w-full h-11 rounded-[12px] bg-[#3b82f6] text-white font-semibold text-[13px] hover:bg-[#2563eb]"
      >
        Complete & Send WhatsApp Invoice
      </button>
      <div className="mt-2 text-[11px] text-[#94a3b8] text-center">
        Auto-deduct • Low-stock alerts • GRN log
      </div>
    </div>
  );
}
