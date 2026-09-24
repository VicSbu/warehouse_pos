import { useEnterprise } from "../../context/EnterpriseContext";
export default function AddStockForm() {
  const {
    newBin,
    newCategory,
    newMin,
    newName,
    newPrice,
    newQty,
    newSku,
    newSupplier,
    notify,
    setInventory,
    setNewBin,
    setNewCategory,
    setNewMin,
    setNewName,
    setNewPrice,
    setNewQty,
    setNewSku,
    setNewSupplier,
    setShowAddStock,
  } = useEnterprise();
  return (
    <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="md:col-span-2 text-[13px] font-semibold">
        Add Stock • Scannable Code128 / QR / EAN13
      </div>
      <input
        value={newSku}
        onChange={(event) => setNewSku(event.target.value)}
        placeholder="SKU / Barcode e.g. 6001688001012"
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[12px]"
      />
      <input
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
        placeholder="Product Name"
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[12px]"
      />
      <select
        value={newCategory}
        onChange={(event) => setNewCategory(event.target.value)}
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[12px]"
      >
        <option>Auto Parts</option>
        <option>Raw Materials</option>
        <option>Finished Goods</option>
      </select>
      <select
        value={newBin}
        onChange={(event) => setNewBin(event.target.value)}
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[12px]"
      >
        <option>Bin A1-R2</option>
        <option>Bin A2-R1</option>
        <option>Bulk Silo 1</option>
        <option>Yard Bay A3</option>
        <option>Bay B3</option>
        <option>Bay C2</option>
      </select>
      <input
        type="number"
        value={newQty}
        onChange={(event) => setNewQty(Number(event.target.value))}
        placeholder="Qty"
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[12px]"
      />
      <input
        type="number"
        value={newMin}
        onChange={(event) => setNewMin(Number(event.target.value))}
        placeholder="Min"
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[12px]"
      />
      <input
        type="number"
        value={newPrice}
        onChange={(event) => setNewPrice(Number(event.target.value))}
        placeholder="Price"
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[12px]"
      />
      <select
        value={newSupplier}
        onChange={(event) => setNewSupplier(event.target.value)}
        className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[12px]"
      >
        <option>Autoworld Matsapha</option>
        <option>PPC Eswatini</option>
        <option>Cashbuild Mbabane</option>
        <option>Internal</option>
      </select>
      <div className="md:col-span-2 flex gap-2">
        <button
          onClick={() => {
            if (!newSku || !newName) {
              notify("SKU & Name required", "warn");
              return;
            }
            let itemType =
              newCategory === "Auto Parts"
                ? "auto"
                : newCategory === "Raw Materials"
                  ? "raw"
                  : "finished";
            setInventory((prev) => [
              {
                sku: newSku,
                barcode: newSku.replace(/-/g, ""),
                name: newName,
                cat: newCategory,
                bin: newBin,
                qty: newQty,
                min: newMin,
                price: newPrice,
                type: itemType,
                supplier: newSupplier,
              },
              ...prev,
            ]);
            notify(`Stock ${newSku} added`);
            setShowAddStock(false);
            setNewSku("");
            setNewName("");
          }}
          className="h-10 px-5 rounded-[10px] bg-[#3b82f6] text-white text-[12px] font-semibold"
        >
          Save
        </button>
        <button
          onClick={() => setShowAddStock(false)}
          className="h-10 px-5 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] text-[12px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
