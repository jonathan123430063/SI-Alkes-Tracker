import React, { useState, useEffect } from "react";
import { 
  Download,
  Activity, 
  Monitor, 
  Syringe, 
  Layers, 
  Stethoscope, 
  FileText,
  X
} from "lucide-react";

export default function Riwayat() {
  const [dataRiwayat, setDataRiwayat] = useState<any[]>([]);
  // 1. STATE UNTUK FILTER TANGGAL
  const [filterDate, setFilterDate] = useState("");

  // Mengambil data murni HANYA dari localStorage
  useEffect(() => {
    const savedRiwayat = JSON.parse(localStorage.getItem('dataRiwayat') || '[]');
    setDataRiwayat(savedRiwayat);
  }, []);

  // 2. LOGIKA FILTER DATA
  const filteredRiwayat = dataRiwayat.filter((item) => {
    if (!filterDate) return true; // Jika filter kosong, tampilkan semua

    // Mengubah tanggal dari input (YYYY-MM-DD) agar formatnya sama dengan yang disimpan di tabel (DD Mmm YYYY)
    const dateObj = new Date(filterDate);
    const formattedFilter = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    
    return item.tanggal === formattedFilter;
  });

  const getIcon = (nama: string, kategori: string) => {
    const n = (nama || "").toLowerCase();
    if (n.includes("ecg") || n.includes("tensimeter") || n.includes("oximeter")) return <Activity size={16} className="text-blue-500" />;
    if (n.includes("ventilator") || n.includes("monitor")) return <Monitor size={16} className="text-indigo-500" />;
    if (n.includes("suction") || n.includes("syringe") || n.includes("nebulizer")) return <Syringe size={16} className="text-cyan-500" />;
    if (n.includes("stetoskop")) return <Stethoscope size={16} className="text-slate-500" />;
    if (kategori === "Terapi") return <Layers size={16} className="text-purple-500" />;
    return <FileText size={16} className="text-blue-400" />;
  };

  const getBadgeStyle = (aktivitas: string) => {
    switch (aktivitas) {
      case "Maintenance Selesai":
        return "bg-green-100 text-green-700";
      case "Penambahan Alat":
        return "bg-blue-100 text-blue-700";
      case "Perubahan Status":
        return "bg-amber-100 text-amber-700";
      case "Pemindahan Lokasi":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* HEADER & TOMBOL AKSI */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Riwayat Aktivitas</h1>
          <p className="text-sm text-slate-500 mt-1">Log semua aktivitas sistem inventaris alat kesehatan</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* INPUT FILTER TANGGAL */}
          <div className="relative flex items-center">
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
              title="Pilih tanggal untuk memfilter"
            />
            {/* Tombol Hapus Filter (Muncul jika ada tanggal yang dipilih) */}
            {filterDate && (
              <button 
                onClick={() => setFilterDate("")} 
                className="absolute -right-2 -top-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition"
                title="Hapus Filter"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABEL RIWAYAT */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 w-16">NO</th>
                <th className="text-left px-6 py-4">TANGGAL & WAKTU</th>
                <th className="text-left px-6 py-4">AKTIVITAS</th>
                <th className="text-left px-6 py-4">NAMA ALAT</th>
                <th className="text-left px-6 py-4">PENGGUNA</th>
                <th className="text-left px-6 py-4">DESKRIPSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* 3. GUNAKAN DATA YANG SUDAH DIFILTER */}
              {filteredRiwayat.length > 0 ? (
                filteredRiwayat.map((item: any, index: number) => (
                  <tr key={item.id || index} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 text-slate-500 text-sm">{index + 1}</td>
                    
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{item.tanggal}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.waktu}</p>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1.5 rounded-md text-xs font-semibold ${getBadgeStyle(item.aktivitas)}`}>
                        {item.aktivitas}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                          {getIcon(item.namaAlat, item.kategori)}
                        </div>
                        <span className="text-slate-800 font-semibold text-sm">{item.namaAlat}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-slate-600 text-sm">{item.pengguna}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm whitespace-normal min-w-[200px]">{item.deskripsi}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-sm">
                    {filterDate 
                      ? `Tidak ada riwayat aktivitas pada tanggal ${new Date(filterDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}.` 
                      : "Belum ada riwayat aktivitas yang tercatat."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}