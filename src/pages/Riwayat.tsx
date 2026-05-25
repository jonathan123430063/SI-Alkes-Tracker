import React, { useState, useEffect } from "react";
import { 
  Download,
  Activity, 
  Monitor, 
  Syringe, 
  Layers, 
  Stethoscope, 
  FileText,
  X,
  Trash2,
  Calendar,
  History
} from "lucide-react";

export default function Riwayat() {
  const [dataRiwayat, setDataRiwayat] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState("");

  // Mengambil data dari localStorage saat halaman dimuat
  useEffect(() => {
    const savedRiwayat = JSON.parse(localStorage.getItem('dataRiwayat') || '[]');
    setDataRiwayat(savedRiwayat);
  }, []);

  // FUNGSI UNTUK MENGHAPUS SATU ITEM RIWAYAT
  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus riwayat aktivitas ini?")) {
      const updatedRiwayat = dataRiwayat.filter((item) => item.id !== id);
      setDataRiwayat(updatedRiwayat);
      localStorage.setItem('dataRiwayat', JSON.stringify(updatedRiwayat));
    }
  };

  // FUNGSI UNTUK MENGHAPUS SEMUA RIWAYAT
  const handleClearAll = () => {
    if (window.confirm("Hapus seluruh log riwayat aktivitas?")) {
      setDataRiwayat([]);
      localStorage.setItem('dataRiwayat', JSON.stringify([]));
    }
  };

  // LOGIKA FILTER TANGGAL
  const filteredRiwayat = dataRiwayat.filter((item) => {
    if (!filterDate) return true;
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
      case "Maintenance Selesai": return "bg-green-100 text-green-700";
      case "Penambahan Alat": return "bg-blue-100 text-blue-700";
      case "Perubahan Status": return "bg-amber-100 text-amber-700";
      case "Pemindahan Lokasi": return "bg-purple-100 text-purple-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <History size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Riwayat Aktivitas</h1>
            <p className="text-sm text-slate-500 mt-1">Log semua aktivitas sistem inventaris alat kesehatan</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* FILTER TANGGAL */}
          <div className="relative flex items-center">
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
              title="Pilih tanggal untuk memfilter"
            />
            {filterDate && (
              <button 
                onClick={() => setFilterDate("")} 
                className="absolute -right-2 -top-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <button 
            onClick={handleClearAll}
            className="flex items-center gap-2 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer"
          >
            <Trash2 size={16} /> Bersihkan Log
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
                <th className="text-center px-6 py-4 w-20">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
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
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Hapus Riwayat"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">
                    {filterDate ? "Tidak ada riwayat ditemukan pada tanggal tersebut." : "Belum ada riwayat aktivitas yang tercatat."}
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