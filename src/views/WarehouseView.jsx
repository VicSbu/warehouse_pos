import { useEnterprise } from "../context/EnterpriseContext";
import PurchaseOrdersPanel from "../components/warehouse/PurchaseOrdersPanel";
import AddStockForm from "../components/warehouse/AddStockForm";
import InventoryTable from "../components/warehouse/InventoryTable";
import StockMovesTab from "../components/warehouse/StockMovesTab";
import PickingTab from "../components/warehouse/PickingTab";
export default function WarehouseView() {
  const {
    binFilter,
    draftLowStockPOs,
    inventory,
    inventorySearch,
    lowStockItems,
    notify,
    purchaseOrders,
    setBinFilter,
    setInventorySearch,
    setScanMode,
    setScannerOpen,
    setShowAddStock,
    setWarehouseTab,
    showAddStock,
    stockValue,
    warehouseTab,
  } = useEnterprise();
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start gap-3">
        <div>
          <h1 className="text-[20px] font-semibold">
            Warehouse + Supplier POs + Barcode Bin Picking
          </h1>
          <p className="text-[12px] text-[#94a3b8]">
            Stock IN/OUT auto PO WhatsApp LPO scanner • V3 scanner-ready
          </p>
        </div>
        <div className="ml-auto flex gap-2 flex-wrap">
          <button
            onClick={() => setShowAddStock((prev) => !prev)}
            className="h-9 px-3 rounded-[10px] bg-[#1e293b] border border-[#2c3b55] text-[12px]"
          >
            Add Stock
          </button>
          <button
            onClick={() => {
              setScanMode("warehouse");
              setScannerOpen(true);
            }}
            className="h-9 px-3 rounded-[10px] border border-[#3b82f6] text-[#3b82f6] text-[12px]"
          >
            Scan Barcode
          </button>
          <button
            onClick={draftLowStockPOs}
            className="h-9 px-4 rounded-[10px] bg-[#3b82f6] text-white text-[12px] font-semibold"
          >
            Auto-Create PO from Low Stock
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
          <div className="text-[11px] text-[#94a3b8]">Total SKUs</div>
          <div className="mono text-[22px] font-semibold">
            {inventory.length}
          </div>
        </div>
        <div className="rounded-[14px] bg-[#ef4444]/10 border border-[#ef4444]/30 p-4">
          <div className="text-[11px] text-[#fca5a5]">Low Stock</div>
          <div className="mono text-[22px] font-semibold text-[#ef4444]">
            {lowStockItems.length}
          </div>
        </div>
        <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
          <div className="text-[11px] text-[#94a3b8]">Stock Value</div>
          <div className="mono text-[22px] font-semibold">
            E{(stockValue / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-[#10b981]">▲ 4.2%</div>
        </div>
        <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
          <div className="text-[11px] text-[#94a3b8]">Open POs</div>
          <div className="mono text-[22px] font-semibold">
            {purchaseOrders.filter((po) => po.status !== "RECEIVED").length}
            {" • E"}
            {purchaseOrders.reduce((sum, po) => sum + po.total, 0) / 1000}k
            transit
          </div>
        </div>
      </div>
      <div className="rounded-[14px] bg-gradient-to-r from-[#ef4444]/15 to-[#1e293b] border-l-4 border-[#ef4444] border border-[#2c3b55] p-3 flex flex-wrap items-center gap-3">
        <div className="w-8 h-8 rounded-[10px] bg-[#ef4444] grid place-items-center">
          🚨
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="text-[13px] font-semibold">
            {lowStockItems.length}
            {" items below reorder • Auto PO draft ready"}
          </div>
          <div className="text-[11px] text-[#94a3b8]">
            Suppliers PPC Eswatini • Autoworld Matsapha • Cashbuild • One-tap
            WhatsApp LPO
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setWarehouseTab("all");
              setInventorySearch("");
              notify("Showing low stock");
            }}
            className="h-8 px-3 rounded-[10px] bg-[#ef4444] text-white text-[12px] font-semibold"
          >
            View Low
          </button>
          <button
            onClick={draftLowStockPOs}
            className="h-8 px-3 rounded-[10px] bg-[#3b82f6] text-white text-[12px] font-semibold"
          >
            Create PO
          </button>
        </div>
      </div>
      <PurchaseOrdersPanel />
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-1 p-1 bg-[#0f172a] border border-[#2c3b55] rounded-[12px] flex-wrap">
          {[
            {
              id: "all",
              label: "All Stock",
            },
            {
              id: "auto",
              label: "Auto Parts",
            },
            {
              id: "raw",
              label: "Raw",
            },
            {
              id: "finished",
              label: "Finished",
            },
            {
              id: "moves",
              label: "Moves",
            },
            {
              id: "picking",
              label: "Bin Picking",
            },
          ].map((item) => (
            <button
              onClick={() => setWarehouseTab(item.id)}
              className={`px-3 h-8 rounded-[10px] text-[12px] font-medium ${warehouseTab === item.id ? "bg-[#1e293b] text-white border border-[#3b82f6]/40" : "text-[#94a3b8] hover:text-white"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto flex-wrap">
          <input
            value={inventorySearch}
            onChange={(event) => setInventorySearch(event.target.value)}
            placeholder="SKU barcode bin"
            className="h-9 w-[220px] rounded-[10px] bg-[#1e293b] border border-[#2c3b55] px-3 text-[12px]"
          />
          <select
            value={binFilter}
            onChange={(event) => setBinFilter(event.target.value)}
            className="h-9 rounded-[10px] bg-[#1e293b] border border-[#2c3b55] px-2 text-[12px]"
          >
            <option>All</option>
            <option>Bin A1-R2</option>
            <option>Bin B3</option>
            <option>Yard Bay</option>
            <option>Bulk Silo</option>
          </select>
          <button
            onClick={() => {
              setScanMode("warehouse");
              setScannerOpen(true);
            }}
            className="h-9 px-3 rounded-[10px] border border-[#3b82f6] text-[#3b82f6] text-[12px]"
          >
            Scan
          </button>
        </div>
      </div>
      {showAddStock && <AddStockForm />}
      {warehouseTab !== "moves" && warehouseTab !== "picking" && (
        <InventoryTable />
      )}
      {warehouseTab === "moves" && <StockMovesTab />}
      {warehouseTab === "picking" && <PickingTab />}
    </div>
  );
}
