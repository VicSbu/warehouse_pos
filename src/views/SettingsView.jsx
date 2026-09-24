import { useEnterprise } from "../context/EnterpriseContext";
export default function SettingsView() {
  const { handleScan, notify, setSettingsTab, settingsTab } = useEnterprise();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div>
          <h1 className="text-[20px] font-semibold">
            Settings & System Configuration
          </h1>
          <p className="text-[12px] text-[#94a3b8]">
            Branches • VAT • WhatsApp • Recipes • Users • Scanner
          </p>
        </div>
        <button
          onClick={() => notify("All settings saved • Firebase synced")}
          className="ml-auto h-9 px-4 rounded-[10px] bg-[#3b82f6] text-white text-[12px] font-semibold"
        >
          Save All
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
        <div className="lg:sticky lg:top-[80px] h-fit rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-2">
          {[
            "Company & Branch",
            "Inventory & Thresholds",
            "Recipes & BOM",
            "Billing & Tax",
            "Integrations",
            "Suppliers & LPO",
            "Barcode Scanner",
            "Users",
            "System",
          ].map((option) => (
            <button
              onClick={() => setSettingsTab(option)}
              className={`w-full text-left px-3 py-2.5 rounded-[10px] text-[13px] font-medium transition ${settingsTab === option ? "bg-[#3b82f6]/15 text-[#f8fafc] border border-[#3b82f6]/30" : "text-[#94a3b8] hover:bg-[#0f172a] hover:text-white border border-transparent"}`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {settingsTab === "Company & Branch" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Company",
                  val: "Mbabane Auto & Block Yard Pty Ltd",
                },
                {
                  label: "Branch",
                  val: "Mbabane Industrial",
                },
                {
                  label: "Address",
                  val: "Matsapha Rd, Mbabane Industrial Hub",
                },
                {
                  label: "Currency",
                  val: "SZL/E",
                },
              ].map((item) => (
                <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
                  <div className="text-[11px] text-[#94a3b8]">{item.label}</div>
                  <input
                    defaultValue={item.val}
                    className="mt-2 w-full h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 text-[13px]"
                  />
                </div>
              ))}
            </div>
          )}
          {settingsTab === "Inventory & Thresholds" && (
            <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 space-y-4">
              <div className="text-[13px] font-semibold">
                Thresholds • Auto-deduct • Alerts
              </div>
              <div className="grid grid-cols-3 gap-3 text-[12px]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={true} />
                  {" Auto-deduct on Sale"}
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={true} />
                  {" Low stock alerts"}
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  {" Voice-guided picking"}
                </label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-[11px] text-[#94a3b8]">Low Auto</div>
                  <input
                    defaultValue={5}
                    type="number"
                    className="mt-1 w-full h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-[#94a3b8]">Low Raw</div>
                  <input
                    defaultValue={10}
                    type="number"
                    className="mt-1 w-full h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-[#94a3b8]">
                    Core Deposit E
                  </div>
                  <input
                    defaultValue={450}
                    type="number"
                    className="mt-1 w-full h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono"
                  />
                </div>
              </div>
            </div>
          )}
          {settingsTab === "Recipes & BOM" && (
            <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4">
              <div className="text-[13px] font-semibold">
                Recipes per Block • Yield 98.4% • Curing 7 days
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                {[
                  {
                    k: "Cement",
                    v: 0.56,
                  },
                  {
                    k: "Sand",
                    v: 1.68,
                  },
                  {
                    k: "Agg",
                    v: 2.05,
                  },
                  {
                    k: "Water",
                    v: 0.34,
                  },
                  {
                    k: "Yield %",
                    v: 98.4,
                  },
                ].map((item) => (
                  <div>
                    <div className="text-[11px] text-[#94a3b8]">{item.k}</div>
                    <input
                      defaultValue={item.v}
                      type="number"
                      step="0.01"
                      className="mt-1 w-full h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {settingsTab === "Billing & Tax" && (
            <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 space-y-3">
              <div className="text-[13px] font-semibold">
                Billing • VAT 15% live updates
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[11px] text-[#94a3b8]">VAT %</div>
                  <input
                    defaultValue={15}
                    className="mt-1 w-full h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono"
                  />
                </div>
                <div>
                  <div className="text-[11px] text-[#94a3b8]">VAT Reg</div>
                  <input
                    defaultValue="SZL-1000-8841"
                    className="mt-1 w-full h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["Net-7", "Net-15", "Net-30", "Net-45"].map((option) => (
                  <div
                    className={`h-9 grid place-items-center rounded-[10px] border text-[12px] ${option === "Net-30" ? "bg-[#3b82f6]/15 border-[#3b82f6]/30" : "bg-[#0f172a] border-[#2c3b55] text-[#94a3b8]"}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
          {settingsTab === "Barcode Scanner" && (
            <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-4 space-y-4">
              <div className="text-[13px] font-semibold">
                Scanner • USB HID / Camera • Both • All symbologies
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <select className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3">
                  <option>USB HID</option>
                  <option>Camera</option>
                  <option>Both</option>
                </select>
                <select className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3">
                  <option>All Symbologies</option>
                  <option>Code128 / QR / EAN13</option>
                </select>
              </div>
              <div className="flex gap-2 text-[12px]">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={true} />
                  {" Auto-add to cart"}
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={true} />
                  {" Beep on scan"}
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  {" Voice-guided"}
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="Test barcode e.g. 04465-0K290"
                  className="flex-1 h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 mono text-[12px]"
                  id="test-barcode"
                />
                <button
                  onClick={() => {
                    let input = document.getElementById("test-barcode");
                    if (input) handleScan(input.value);
                  }}
                  className="h-10 px-4 rounded-[10px] bg-[#3b82f6] text-white text-[12px]"
                >
                  Test Scan
                </button>
              </div>
            </div>
          )}
          {settingsTab !== "Company & Branch" &&
            settingsTab !== "Inventory & Thresholds" &&
            settingsTab !== "Recipes & BOM" &&
            settingsTab !== "Billing & Tax" &&
            settingsTab !== "Barcode Scanner" && (
              <div className="rounded-[14px] bg-[#1e293b] border border-[#2c3b55] p-6 text-[13px] text-[#94a3b8]">
                <div className="text-white font-semibold mb-2">
                  {settingsTab}
                </div>
                <div className="space-y-2 leading-6">
                  {settingsTab === "Integrations" && (
                    <>
                      <div>
                        {"Firebase project: "}
                        <span className="mono text-white">
                          mbabane-dual-os-8841
                        </span>
                        {
                          " • Collections sales / stock • WhatsApp API key • Phone +268 7600 1234"
                        }
                      </div>
                      <div className="h-10 rounded-[10px] bg-[#0f172a] border border-[#2c3b55] px-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                        {" Synced 42ms • Realtime enabled"}
                      </div>
                    </>
                  )}
                  {settingsTab === "Suppliers & LPO" && (
                    <div className="space-y-2">
                      {[
                        "PPC Eswatini +268 2505 4491",
                        "Autoworld Matsapha +268 7612 8890",
                        "Cashbuild Mbabane +268 2404 7000",
                      ].map((option) => (
                        <div className="flex items-center justify-between bg-[#0f172a] border border-[#2c3b55] rounded-[10px] px-3 py-2">
                          <span>{option}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981]">
                            Verified
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {settingsTab === "Users" && (
                    <div className="space-y-2">
                      {[
                        {
                          n: "Sibusiso Khumalo",
                          r: "Admin",
                          s: "Now",
                        },
                        {
                          n: "Thandi Nkosi",
                          r: "Counter",
                          s: "2h ago",
                        },
                        {
                          n: "Musa Dube",
                          r: "Yard",
                          s: "5h ago",
                        },
                      ].map((item) => (
                        <div className="flex items-center justify-between bg-[#0f172a] border border-[#2c3b55] rounded-[10px] px-3 py-2">
                          <span>
                            {item.n}
                            {" • "}
                            {item.r}
                          </span>
                          <span className="text-[11px] text-[#94a3b8]">
                            {item.s}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {settingsTab === "System" && (
                    <div className="space-y-2">
                      <div>
                        Backup Daily 18:00 SAST • Printer Epson TM-T20III
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => notify("Backup started")}
                          className="h-9 px-4 rounded-[10px] bg-[#1e293b] border border-[#2c3b55] text-[12px]"
                        >
                          Backup now
                        </button>
                        <button
                          onClick={() =>
                            notify("Factory reset requires admin", "warn")
                          }
                          className="h-9 px-4 rounded-[10px] bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-[12px]"
                        >
                          Factory reset
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
