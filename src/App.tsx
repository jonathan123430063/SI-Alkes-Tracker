import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react"; // Tambahan icon untuk Topbar

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import DataAlat from "./pages/DataAlat";
import Maintenance from "./pages/Maintenance";
import Laporan from "./pages/Laporan"; // Hapus ekstensi .tsx di import
import Tracking from "./pages/Tracking";
import Riwayat from "./pages/Riwayat";
import Login from "./pages/Login";
import Pengguna from "./pages/Pengguna";
import Notifikasi from "./pages/Notifikasi";
import Pengaturan from "./pages/Pengaturan";

export default function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("login") === "true"
  );

  // LOGIN
  if (!isLogin) {
    return <Login onLogin={() => setIsLogin(true)} />;
  }

  return (
    <BrowserRouter>
      {/* 1. WRAPPER UTAMA: Menggunakan flex dan membatasi tinggi sebesar layar (h-screen) */}
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
        
        {/* SIDEBAR: Akan menyesuaikan tinggi layar secara otomatis */}
        <Sidebar
          onLogout={() => {
            localStorage.removeItem("login");
            setIsLogin(false);
          }}
        />

        {/* AREA KANAN (HEADER + KONTEN UTAMA) */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          
          {/* 2. GLOBAL TOPBAR: Menambah kesan dinamis sesuai desain Figma */}
          <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-end px-8 z-10 shrink-0 shadow-sm">
            <div className="flex items-center gap-6">
              
              {/* Icon Notifikasi */}
              <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition">
                <Bell size={20} />
                {/* Dot indikator notifikasi merah */}
                <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              
              {/* Profil Admin */}
              <div className="flex items-center gap-3 border-l border-slate-100 pl-6 cursor-pointer group">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm group-hover:bg-blue-700 transition">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="font-bold text-slate-700 text-sm leading-tight">Admin</p>
                  <p className="text-[11px] text-slate-400 font-medium">Administrator</p>
                </div>
                <ChevronDown size={16} className="text-slate-400 ml-1 group-hover:text-slate-600 transition" />
              </div>

            </div>
          </header>

          {/* 3. KONTEN UTAMA YANG BISA DI-SCROLL */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/data-alat" element={<DataAlat />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/laporan" element={<Laporan />} />
              <Route path="/riwayat" element={<Riwayat />} />
              <Route path="/notifikasi" element={<Notifikasi />} />
              <Route path="/pengguna" element={<Pengguna />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/pengaturan" element={<Pengaturan />} />
            </Routes>
          </main>

        </div>
      </div>
    </BrowserRouter>
  );
}