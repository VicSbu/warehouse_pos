import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { INITIAL_INVENTORY } from "../data/inventory";
import { INITIAL_PURCHASE_ORDERS } from "../data/purchaseOrders";
import { playBeep } from "../utils/beep";

const EnterpriseContext = createContext(null);

const BLOCK_PRODUCTS = {
  "150H - E4.20": { price: 4.2, sku: "BLOCK-150H", name: "Block 150H Hollow" },
  "200S - E6.80": { price: 6.8, sku: "BLOCK-200S", name: "Block 200S Solid" },
  "PAV - E2.90": { price: 2.9, sku: "PAV-60-INT", name: "Paving 60mm Interlock" },
};

const SUPPLIER_PHONES = [
  ["PPC", "+268 2505 4491"],
  ["Cashbuild", "+268 2404 7000"],
];
const DEFAULT_SUPPLIER_PHONE = "+268 7612 8890";

const CORE_CHARGE = 450;
const TRANSPORT_CHARGE = 850;
const VAT_RATE = 0.15;

/** Add 1 to an existing line (matched by SKU) or append a new line. */
function upsertLine(list, item) {
  if (list.some((l) => l.sku === item.sku)) {
    return list.map((l) => (l.sku === item.sku ? { ...l, qty: l.qty + 1 } : l));
  }
  return [
    ...list,
    { sku: item.sku, name: item.name, qty: 1, price: item.price, bin: item.bin },
  ];
}

export function EnterpriseProvider({ children }) {
  // ── navigation ───────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("pos");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [warehouseTab, setWarehouseTab] = useState("all");
  const [settingsTab, setSettingsTab] = useState("Company & Branch");

  // ── POS ──────────────────────────────────────────────────
  const [posMode, setPosMode] = useState("auto");
  const [cart, setCart] = useState([]);
  const [vehicleMake, setVehicleMake] = useState("Toyota");
  const [vehicleModel, setVehicleModel] = useState("Hilux");
  const [vehicleYear, setVehicleYear] = useState("2022");
  const [partQuery, setPartQuery] = useState("");
  const [partQty, setPartQty] = useState(1);
  const [partPrice, setPartPrice] = useState(1250);
  const [coreCharge, setCoreCharge] = useState(false);
  const [blockProduct, setBlockProduct] = useState("150H - E4.20");
  const [blockQty, setBlockQty] = useState(2500);
  const [transport, setTransport] = useState("Own Truck - E850");
  const [deliveryZone, setDeliveryZone] = useState("Zone 1 Mbabane - E0");
  const [invoiceNo] = useState("INV-MB-8841");
  const [paymentMethod, setPaymentMethod] = useState("Net-30");

  // ── yard ─────────────────────────────────────────────────
  const [bomQty, setBomQty] = useState(1000);

  // ── warehouse ────────────────────────────────────────────
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [purchaseOrders, setPurchaseOrders] = useState(INITIAL_PURCHASE_ORDERS);
  const [pickList, setPickList] = useState([]);
  const [inventorySearch, setInventorySearch] = useState("");
  const [binFilter, setBinFilter] = useState("All");
  const [showAddStock, setShowAddStock] = useState(false);
  const [newSku, setNewSku] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Auto Parts");
  const [newBin, setNewBin] = useState("Bin A1-R2");
  const [newQty, setNewQty] = useState(10);
  const [newMin, setNewMin] = useState(5);
  const [newPrice, setNewPrice] = useState(100);
  const [newSupplier, setNewSupplier] = useState("Autoworld Matsapha");

  // ── scanner ──────────────────────────────────────────────
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanMode, setScanMode] = useState("pos");
  const [scanInput, setScanInput] = useState("");
  const [lastScanned, setLastScanned] = useState(null);
  const scannerInputRef = useRef(null);

  // ── misc ─────────────────────────────────────────────────
  const [toasts, setToasts] = useState([]);
  const [clock, setClock] = useState("09:42:11");

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!scannerOpen) return;
    const timer = setTimeout(() => scannerInputRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, [scannerOpen]);

  // ── derived data ─────────────────────────────────────────
  const lowStockItems = useMemo(
    () => inventory.filter((item) => item.qty <= item.min),
    [inventory],
  );

  const stockValue = useMemo(
    () => inventory.reduce((sum, item) => sum + item.qty * item.price, 0),
    [inventory],
  );

  const filteredInventory = useMemo(() => {
    let list = inventory;
    if (["auto", "raw", "finished"].includes(warehouseTab)) {
      list = list.filter((item) => item.type === warehouseTab);
    }
    if (inventorySearch) {
      const q = inventorySearch.toLowerCase();
      list = list.filter(
        (item) =>
          item.sku.toLowerCase().includes(q) ||
          item.barcode.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.bin.toLowerCase().includes(q),
      );
    }
    if (binFilter !== "All") list = list.filter((item) => item.bin.includes(binFilter));
    return list;
  }, [inventory, warehouseTab, inventorySearch, binFilter]);

  const totals = useMemo(() => {
    const sub = cart.reduce((sum, line) => sum + line.qty * line.price, 0);
    const core = cart.filter((line) => line.core).length * CORE_CHARGE;
    const trans = cart.some((line) => line.transport) ? TRANSPORT_CHARGE : 0;
    const vat = (sub + core + trans) * VAT_RATE;
    return { sub, core, trans, vat, total: sub + core + trans + vat };
  }, [cart]);

  // ── actions ──────────────────────────────────────────────
  const notify = useCallback((msg, type = "ok") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
  }, []);

  const adjustStock = useCallback((sku, delta) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
      ),
    );
  }, []);

  const handleScan = (override) => {
    const code = (override ?? scanInput).trim();
    if (!code) return;
    const needle = code.toLowerCase();
    const match = inventory.find(
      (item) =>
        item.sku.toLowerCase() === needle ||
        item.barcode.toLowerCase() === needle ||
        item.sku.toLowerCase().includes(needle),
    );
    if (!match) {
      notify(`No match for ${code}`, "err");
      setScanInput("");
      return;
    }
    setLastScanned(match);
    playBeep();
    notify(`Scanned ${match.sku} • ${match.name}`);

    if (scanMode === "pos") {
      setCart((prev) => upsertLine(prev, match));
    } else if (scanMode === "picking" || scanMode === "warehouse") {
      setPickList((prev) => upsertLine(prev, match));
      if (scanMode === "picking") setWarehouseTab("picking");
    }
    setScanInput("");
  };

  const addAutoPartToCart = () => {
    if (!partQuery) {
      notify("Enter OEM/SKU/Barcode", "warn");
      return;
    }
    const q = partQuery.toLowerCase();
    const found = inventory.find(
      (item) => item.sku.toLowerCase().includes(q) || item.barcode.toLowerCase().includes(q),
    );
    const name = found ? found.name : partQuery;
    setCart((prev) => [
      ...prev,
      {
        sku: found ? found.sku : partQuery.toUpperCase(),
        name,
        qty: partQty,
        price: found ? found.price : partPrice,
        bin: found?.bin ?? "Bin A1-R2",
        core: coreCharge,
      },
    ]);
    notify(`Added ${partQty}× ${name} to Job Card`);
    setPartQuery("");
  };

  const addBlockOrderToCart = () => {
    const product = BLOCK_PRODUCTS[blockProduct] || BLOCK_PRODUCTS["150H - E4.20"];
    setCart((prev) => [
      ...prev,
      {
        sku: product.sku,
        name: `${product.name} • ${blockQty} units`,
        qty: blockQty,
        price: product.price,
        transport,
      },
    ]);
    notify(`Added ${blockQty} ${product.name} to order`, "ok");
  };

  const draftLowStockPOs = () => {
    if (!lowStockItems.length) {
      notify("No low stock", "warn");
      return;
    }
    const bySupplier = {};
    lowStockItems.forEach((item) => {
      (bySupplier[item.supplier] ||= []).push(item);
    });
    const reorderQty = (item) => Math.max(item.min * 2 - item.qty, item.min);

    const drafts = Object.entries(bySupplier).map(([supplier, items], idx) => ({
      poNo: `PO-${8844 + idx + purchaseOrders.length}`,
      date: new Date().toISOString().slice(0, 10),
      supplier,
      phone:
        SUPPLIER_PHONES.find(([key]) => supplier.includes(key))?.[1] ??
        DEFAULT_SUPPLIER_PHONE,
      items: items.map((item) => ({ qty: reorderQty(item), name: item.name })),
      total: items.reduce((sum, item) => sum + reorderQty(item) * item.price, 0),
      status: "DRAFT",
      whatsapp: false,
    }));
    setPurchaseOrders((prev) => [...drafts, ...prev]);
    notify(`Drafted ${drafts.length} POs from ${lowStockItems.length} low items`, "ok");
  };

  const sendPO = (poNo) => {
    setPurchaseOrders((prev) =>
      prev.map((po) => (po.poNo === poNo ? { ...po, status: "SENT", whatsapp: true } : po)),
    );
    notify(`WhatsApp LPO ${poNo} sent • +268 7600 1234`, "ok");
  };

  /** Goods received note: adds PO quantities to matching stock and closes the PO. */
  const receivePO = (poNo) => {
    const po = purchaseOrders.find((p) => p.poNo === poNo);
    if (!po) return;
    po.items.forEach((line) => {
      const lineKey = line.name.split(" ")[0].toLowerCase();
      const match = inventory.find(
        (item) =>
          item.name.toLowerCase().includes(lineKey) ||
          line.name.toLowerCase().includes(item.name.split(" ")[0].toLowerCase()),
      );
      if (match) adjustStock(match.sku, line.qty);
    });
    setPurchaseOrders((prev) =>
      prev.map((p) => (p.poNo === poNo ? { ...p, status: "RECEIVED" } : p)),
    );
    notify(`GRN ${poNo} received • Stock IN`, "ok");
  };

  const completePicking = () => {
    if (!pickList.length) return;
    pickList.forEach((line) => adjustStock(line.sku, -line.qty));
    notify(`Picking complete • ${pickList.length} SKUs deducted • Stock OUT logged`);
    setPickList([]);
  };

  const value = {
    activeTab, setActiveTab, sidebarOpen, setSidebarOpen,
    warehouseTab, setWarehouseTab, settingsTab, setSettingsTab,
    posMode, setPosMode, cart, setCart,
    vehicleMake, setVehicleMake, vehicleModel, setVehicleModel, vehicleYear, setVehicleYear,
    partQuery, setPartQuery, partQty, setPartQty, partPrice, setPartPrice,
    coreCharge, setCoreCharge, blockProduct, setBlockProduct, blockQty, setBlockQty,
    transport, setTransport, deliveryZone, setDeliveryZone, invoiceNo,
    paymentMethod, setPaymentMethod, bomQty, setBomQty,
    inventory, setInventory, purchaseOrders, setPurchaseOrders, pickList, setPickList,
    inventorySearch, setInventorySearch, binFilter, setBinFilter,
    showAddStock, setShowAddStock,
    newSku, setNewSku, newName, setNewName, newCategory, setNewCategory,
    newBin, setNewBin, newQty, setNewQty, newMin, setNewMin,
    newPrice, setNewPrice, newSupplier, setNewSupplier,
    scannerOpen, setScannerOpen, scanMode, setScanMode, scanInput, setScanInput,
    lastScanned, setLastScanned, scannerInputRef,
    toasts, clock,
    lowStockItems, stockValue, filteredInventory, totals,
    notify, adjustStock, handleScan, addAutoPartToCart, addBlockOrderToCart,
    draftLowStockPOs, sendPO, receivePO, completePicking,
  };

  return <EnterpriseContext.Provider value={value}>{children}</EnterpriseContext.Provider>;
}

export function useEnterprise() {
  const ctx = useContext(EnterpriseContext);
  if (!ctx) throw new Error("useEnterprise must be used inside <EnterpriseProvider>");
  return ctx;
}
