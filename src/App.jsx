import { useEnterprise } from "./context/EnterpriseContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ScannerModal from "./components/ScannerModal";
import ToastStack from "./components/ToastStack";
import PosView from "./views/PosView";
import YardView from "./views/YardView";
import WarehouseView from "./views/WarehouseView";
import ArView from "./views/ArView";
import BiView from "./views/BiView";
import SettingsView from "./views/SettingsView";

const VIEWS = {
  pos: PosView,
  yard: YardView,
  warehouse: WarehouseView,
  ar: ArView,
  bi: BiView,
  settings: SettingsView,
};

export default function App() {
  const { activeTab, scannerOpen, sidebarOpen, setSidebarOpen } = useEnterprise();
  const View = VIEWS[activeTab];

  return (
    <div
      className="min-h-screen bg-[#0f172a] text-[#f8fafc] selection:bg-[#3b82f6]/30"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <Sidebar />
      <div className="lg:pl-[260px]">
        <TopBar />
        <main className="p-3 lg:p-5">{View && <View />}</main>
      </div>
      {scannerOpen && <ScannerModal />}
      <ToastStack />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
