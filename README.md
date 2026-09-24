# Dual-Enterprise OS v3

Hybrid POS, block yard, warehouse & purchase-order management for Mbabane Industrial Hub.
React 18 + Vite + Tailwind CSS 3.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
src/
  main.jsx                     entry, wraps <App/> in the provider
  App.jsx                      layout shell + tab → view routing
  index.css                    Tailwind + fonts, scrollbar, keyframes
  context/EnterpriseContext.jsx  all app state & actions (scan, POs, GRN, picking…)
  data/                        seed inventory & purchase orders
  utils/beep.js                scanner beep (Web Audio)
  views/                       one file per sidebar tab
    PosView · YardView · WarehouseView · ArView · BiView · SettingsView
  components/
    Sidebar · TopBar · ScannerModal · ToastStack
    pos/        AutoPartsForm · BlockOrderForm · CartPanel
    warehouse/  PurchaseOrdersPanel · AddStockForm · InventoryTable · StockMovesTab · PickingTab
```

Components read state via `const { … } = useEnterprise()`. To add a tab: create a view,
register it in `VIEWS` in `App.jsx`, and add a nav item in `Sidebar.jsx`.
