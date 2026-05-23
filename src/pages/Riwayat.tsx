import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Download,
  Activity, 
  Monitor, 
  Syringe, 
  Layers, 
  Stethoscope, 
  FileText
} from "lucide-react";

export default function Riwayat() {
  const [dataRiwayat, setDataRiwayat] = useState<any[]>([]);

  // Mengambil data murni HANYA dari localStorage
  useEffect(() => {
    const savedRiwayat = JSON.parse(localStorage.getItem('dataRiwayat') || '[]');
    setDataRiwayat(savedRiwayat);
  }, []);

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
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer">
            <Calendar size={18} className="text-slate-500" />
            Filter Tanggal
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm cursor-pointer">
            <Download size={18} />
            Export
          </button>
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
              {dataRiwayat.length > 0 ? (
                dataRiwayat.map((item: any, index: number) => (
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
                    Belum ada riwayat aktivitas yang tercatat.
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