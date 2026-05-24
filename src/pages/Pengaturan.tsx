import React, { useState, useEffect } from "react";
import { 
  User, Bell, Shield, Database, Settings as SettingsIcon,
  Camera, Save, UploadCloud, DownloadCloud, Smartphone, Monitor, ChevronRight, Lock
} from "lucide-react";

export default function Pengaturan() {
  const [activeTab, setActiveTab] = useState("Profil");

  // 1. STATE TERPUSAT (Single Source of Truth)
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("siAlkesConfig");
    return saved ? JSON.parse(saved) : {
      // Profil
      namaAdmin: "Fitriah Ramadhani",
      username: "admin_fitriah",
      email: "admin@si-alkes.com",
      telepon: "+6281234567890",
      jabatan: "Administrator",
      
      // Notifikasi
      notifMaintenance: true,
      notifRusak: true,
      notifBaru: true,
      notifStok: true,
      emailNotif: true,
      popupNotif: true,
      frekuensi: "Real-time",
      
      // Keamanan
      use2FA: true,
      sessionTimeout: "30 menit",
      
      // Backup
      autoBackup: true,
      backupJadwal: "Harian",
      backupCloud: true,
      backupLocal: false,
      
      // Umum
      tema: "Light",
      bahasa: "Indonesia",
      zonaWaktu: "WIB",
      namaRS: "RS Harapan Sehat"
    };
  });

  // 2. FUNGSI SINKRONISASI KE LOCAL STORAGE
  const updateConfig = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    localStorage.setItem("siAlkesConfig", JSON.stringify(newConfig));
  };

  const handleSimpanGlobal = () => {
    localStorage.setItem("siAlkesConfig", JSON.stringify(config));
    alert("Berhasil! Semua konfigurasi pengaturan telah disimpan.");
  };

  const menuTabs = [
    { id: "Profil", icon: <User size={18} /> },
    { id: "Notifikasi", icon: <Bell size={18} /> },
    { id: "Keamanan", icon: <Shield size={18} /> },
    { id: "Backup", icon: <Database size={18} /> },
    { id: "Umum", icon: <SettingsIcon size={18} /> },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Pengaturan Sistem</h1>
        <p className="text-slate-500 mt-1 text-sm">Kelola preferensi akun dan konfigurasi SI-ALKES Tracker</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* KIRI: SIDEBAR TAB */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-3">
            <div className="space-y-1">
              {menuTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeTab === tab.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">{tab.icon} {tab.id}</div>
                  {activeTab === tab.id && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN: KONTEN DINAMIS */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 min-h-[500px]">
          
          {/* ================= 1. TAB PROFIL ================= */}
          {activeTab === "Profil" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Profil Pengguna</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden group">
                    <span className="text-4xl font-bold text-blue-600">FR</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer">Ubah Foto</button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                    <input type="text" value={config.namaAdmin} onChange={(e) => updateConfig("namaAdmin", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Username</label>
                    <input type="text" value={config.username} onChange={(e) => updateConfig("username", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" value={config.email} onChange={(e) => updateConfig("email", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nomor Telepon</label>
                    <input type="text" value={config.telepon} onChange={(e) => updateConfig("telepon", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Jabatan</label>
                    <select value={config.jabatan} onChange={(e) => updateConfig("jabatan", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                      <option value="Administrator">Administrator</option>
                      <option value="Kepala Unit">Kepala Unit</option>
                      <option value="Teknisi">Teknisi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. TAB NOTIFIKASI ================= */}
          {activeTab === "Notifikasi" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Pengaturan Notifikasi</h2>
              
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Pemicu Sistem</h3>
                <div className="space-y-3">
                  {[
                    { key: "notifMaintenance", label: "Notifikasi maintenance jatuh tempo" },
                    { key: "notifRusak", label: "Notifikasi alat rusak" },
                    { key: "notifBaru", label: "Notifikasi alat baru ditambahkan" },
                    { key: "notifStok", label: "Notifikasi stok alat menipis" }
                  ].map(item => (
                    <label key={item.key} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" checked={config[item.key]} onChange={(e) => updateConfig(item.key, e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Metode Pengiriman</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={config.emailNotif} onChange={(e) => updateConfig("emailNotif", e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition">Email Notifikasi</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={config.popupNotif} onChange={(e) => updateConfig("popupNotif", e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition">Popup Sistem In-App</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Frekuensi Notifikasi</h3>
                <div className="flex gap-6">
                  {["Real-time", "Harian", "Mingguan"].map((freq) => (
                    <label key={freq} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="freq" checked={config.frekuensi === freq} onChange={() => updateConfig("frekuensi", freq)} className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition">{freq}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 3. TAB KEAMANAN ================= */}
          {activeTab === "Keamanan" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Keamanan Akun</h2>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Password Sistem</h3>
                  <p className="text-sm text-slate-500 mt-1">********</p>
                </div>
                <button className="flex items-center gap-2 border border-slate-300 bg-white hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
                  <Lock size={16} /> Ubah Password
                </button>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group p-5 border border-blue-100 bg-blue-50/50 rounded-xl">
                <input type="checkbox" checked={config.use2FA} onChange={(e) => updateConfig("use2FA", e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <div>
                  <span className="text-sm font-bold text-blue-900 block mb-1">Aktifkan Verifikasi 2 Langkah (2FA)</span>
                  <span className="text-sm text-blue-700/80">Tambahkan lapisan keamanan ekstra saat login.</span>
                </div>
              </label>

              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Riwayat Login</h3>
                <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="text-slate-400" size={20} />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Windows - Chrome</p>
                        <p className="text-xs text-slate-500 mt-0.5">22/05/2026 (Sesi Saat Ini)</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">Aktif</span>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                      <Smartphone className="text-slate-400" size={20} />
                      <div>
                        <p className="text-sm font-medium text-slate-800">Android - Chrome Mobile</p>
                        <p className="text-xs text-slate-500 mt-0.5">21/05/2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Session Timeout</h3>
                <select value={config.sessionTimeout} onChange={(e) => updateConfig("sessionTimeout", e.target.value)} className="w-full md:w-64 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                  <option value="15 menit">15 Menit</option>
                  <option value="30 menit">30 Menit</option>
                  <option value="1 jam">1 Jam</option>
                </select>
              </div>
            </div>
          )}

          {/* ================= 4. TAB BACKUP ================= */}
          {activeTab === "Backup" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Backup & Restore</h2>
              
              <div className="p-5 border border-slate-200 rounded-xl space-y-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={config.autoBackup} onChange={(e) => updateConfig("autoBackup", e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-bold text-slate-800">Backup Otomatis</span>
                </label>

                <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase">Jadwal Backup</h4>
                    <div className="space-y-3 flex flex-col">
                      {["Harian", "Mingguan", "Bulanan"].map((jadwal) => (
                        <label key={jadwal} className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="jadwalBackup" checked={config.backupJadwal === jadwal} onChange={() => updateConfig("backupJadwal", jadwal)} className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                          <span className="text-sm text-slate-600 group-hover:text-slate-900">{jadwal}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase">Lokasi Simpan</h4>
                    <div className="space-y-3 flex flex-col">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" checked={config.backupCloud} onChange={(e) => updateConfig("backupCloud", e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900">Cloud Storage</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" checked={config.backupLocal} onChange={(e) => updateConfig("backupLocal", e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900">Local Server</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Aksi Manual</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <button className="flex-1 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 px-5 py-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer font-semibold text-sm">
                    <UploadCloud size={20} /> Backup Sekarang
                  </button>
                  <button className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 px-5 py-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer font-semibold text-sm">
                    <DownloadCloud size={20} /> Restore Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. TAB UMUM ================= */}
          {activeTab === "Umum" && (
            <div className="animate-in fade-in duration-300 space-y-8">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">Pengaturan Umum</h2>
              
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Nama Rumah Sakit</label>
                  <input type="text" value={config.namaRS} onChange={(e) => updateConfig("namaRS", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Bahasa</label>
                    <select value={config.bahasa} onChange={(e) => updateConfig("bahasa", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                      <option value="Indonesia">Indonesia</option>
                      <option value="English">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Zona Waktu</label>
                    <select value={config.zonaWaktu} onChange={(e) => updateConfig("zonaWaktu", e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
                      <option value="WIB">WIB</option>
                      <option value="WITA">WITA</option>
                      <option value="WIT">WIT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Tema Sistem</label>
                  <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="tema" checked={config.tema === "Light"} onChange={() => updateConfig("tema", "Light")} className="peer sr-only" />
                      <div className="border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 rounded-xl p-4 text-center transition">
                        <span className="text-sm font-semibold text-slate-700">Light Mode</span>
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="tema" checked={config.tema === "Dark"} onChange={() => updateConfig("tema", "Dark")} className="peer sr-only" />
                      <div className="border-2 border-slate-200 peer-checked:border-slate-500 peer-checked:bg-slate-800 rounded-xl p-4 text-center transition bg-slate-900">
                        <span className="text-sm font-semibold text-white">Dark Mode</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TOMBOL SIMPAN GLOBAL ================= */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
            <button onClick={handleSimpanGlobal} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-sm">
              <Save size={18} /> Simpan Semua Perubahan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}