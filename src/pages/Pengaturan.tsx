import React, { useState } from "react";
import { User, Bell, Shield, Database, Globe, Save } from "lucide-react";

export default function Pengaturan() {
  // State untuk melacak menu sidebar yang sedang aktif
  const [activeTab, setActiveTab] = useState("Profil");

  // Daftar menu sidebar
  const tabs = [
    { id: "Profil", icon: <User size={18} /> },
    { id: "Notifikasi", icon: <Bell size={18} /> },
    { id: "Keamanan", icon: <Shield size={18} /> },
    { id: "Backup", icon: <Database size={18} /> },
    { id: "Umum", icon: <Globe size={18} /> },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Pengaturan Sistem</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Konfigurasi dan pengaturan aplikasi
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* KIRI: SIDEBAR KATEGORI */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 w-full lg:w-72 h-fit shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 px-4 mb-4">
            Kategori Pengaturan
          </h2>
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                {tab.id}
              </button>
            ))}
          </div>
        </div>

        {/* KANAN: MAIN CONTENT FORM */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 flex-1 shadow-sm">
          {activeTab === "Profil" && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">
                Pengaturan Profil
              </h2>

              {/* Foto Profil */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Foto Profil
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                    A
                  </div>
                  <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition">
                    Ganti Foto
                  </button>
                </div>
              </div>

              {/* Form Data Diri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue="admin"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@sialkestracker.com"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    No. Telepon
                  </label>
                  <input
                    type="text"
                    defaultValue="+62 812-3456-7890"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue="Administrator"
                    disabled
                    className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-lg px-4 py-2.5 text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Form Ubah Password */}
              <h3 className="text-md font-bold text-slate-800 border-t border-slate-100 pt-8 mb-6">
                Ubah Password
              </h3>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password Lama
                  </label>
                  <input
                    type="password"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password Baru
                  </label>
                  <input
                    type="password"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => alert("Pengaturan berhasil disimpan!")}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition"
                >
                  <Save size={18} />
                  Simpan Perubahan
                </button>
                <button className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-lg text-sm font-medium transition">
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* Fallback konten untuk tab lainnya (opsional) */}
          {activeTab !== "Profil" && (
            <div className="flex items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
              <p>Pengaturan {activeTab} belum tersedia.</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-slate-400 mt-12 pb-4">
        SI ALKES TRACKER © 2024 - Sistem Informasi Alat Kesehatan
      </div>
    </div>
  );
}