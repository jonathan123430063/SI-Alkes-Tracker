import React, { useState, useEffect } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from "recharts";
import { 
  Plus, 
  CheckCircle2, 
  Wrench, 
  XCircle, 
  Calendar, 
  PlusCircle, 
  Edit2, 
  Trash2,
  FileText,
  Activity,
  Tv,
  Layers,
  X
} from "lucide-react";
import { useAlat } from "../context/AlatContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { alat = [], setAlat } = useAlat() || {};
  const navigate = useNavigate();

  // 1. STATE UNTUK JADWAL MAINTENANCE
  const [jadwalDashboard, setJadwalDashboard] = useState<any[]>([]);

  // Mengambil data jadwal maintenance saat dashboard dibuka
  useEffect(() => {
    const savedJadwal = JSON.parse(localStorage.getItem('dataJadwal') || '[]');
    setJadwalDashboard(savedJadwal);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "Diagnostik",
    lokasi: "Ruang Poli Umum",
    status: "Aktif",
    tglBeli: ""
  });

  const total = alat.length;
  const aktif = alat.filter((a: any) => a.status === "Aktif").length;
  const maintenance = alat.filter((a: any) => a.status === "Maintenance" || a.status === "Perlu Maintenance").length;
  const rusak = alat.filter((a: any) => a.status === "Rusak").length;

  const persenAktif = total > 0 ? ((aktif / total) * 100).toFixed(1) : "0.0";
  const persenMaintenance = total > 0 ? ((maintenance / total) * 100).toFixed(1) : "0.0";
  const persenRusak = total > 0 ? ((rusak / total) * 100).toFixed(1) : "0.0";

  const chartData = [
    { name: "Alat Aktif", value: aktif, color: "#10b981" },
    { name: "Perlu Maintenance", value: maintenance, color: "#f59e0b" },
    { name: "Alat Rusak", value: rusak, color: "#ef4444" },
  ];

  // 2. DAFTAR DINAMIS DARI DATA MAINTENANCE (Maksimal 3 teratas yang belum selesai)
  const maintenanceList = jadwalDashboard
    .filter((j: any) => j.status !== "Selesai")
    .slice(0, 3);

  const getIcon = (kategori: string) => {
    const k = (kategori || "").toLowerCase();
    if (k === "diagnostik") return <Activity size={16} />;
    if (k === "terapi") return <Layers size={16} />;
    return <FileText size={16} />;
  };

  const handleDelete = (id: number) => {
    if (!setAlat) return alert("Fungsi setAlat tidak ditemukan di context.");
    if (window.confirm("Apakah Anda yakin ingin menghapus alat ini?")) {
      setAlat(alat.filter((item: any) => item.id !== id));
    }
  };

  const handleOpenModal = (item: any = null) => {
    if (item) {
      setIsEditing(true);
      setEditId(item.id);
      setFormData({
        nama: item.nama || "",
        kategori: item.kategori || "Diagnostik",
        lokasi: item.lokasi || "",
        status: item.status || "Aktif",
        tglBeli: item.tglBeli || ""
      });
    } else {
      setIsEditing(false);
      setEditId(null);
      setFormData({ nama: "", kategori: "Diagnostik", lokasi: "Ruang Poli Umum", status: "Aktif", tglBeli: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setAlat) return alert("Fungsi setAlat tidak ditemukan di context.");

    if (isEditing && editId !== null) {
      setAlat(alat.map((item: any) => 
        item.id === editId ? { ...item, ...formData } : item
      ));
    } else {
      const newItem = {
        id: alat.length > 0 ? Math.max(...alat.map((i: any) => i.id || 0)) + 1 : 1,
        ...formData
      };
      setAlat([newItem, ...alat]);
    }
    handleCloseModal();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen relative">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      </div>

      {/* 4 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Plus size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Alat</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{total}</p>
            <p className="text-xs text-slate-400 mt-1">Semua alat terdaftar</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alat Aktif</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{aktif}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{persenAktif}% dari total alat</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Wrench size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Perlu Maint...</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{maintenance}</p>
            <p className="text-xs text-amber-600 font-medium mt-1">{persenMaintenance}% dari total alat</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <XCircle size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alat Rusak</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">{rusak}</p>
            <p className="text-xs text-red-500 font-medium mt-1">{persenRusak}% dari total alat</p>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: CHART & MAINTENANCE LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <h2 className="text-md font-bold text-slate-800 mb-4">Grafik Status Alat</h2>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 h-full min-h-[220px]">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={65} outerRadius={85} paddingAngle={3} dataKey="value">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <p className="text-2xl font-bold text-slate-800 leading-none">{total}</p>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-1">Total</p>
              </div>
            </div>
            <div className="flex-1 w-full max-w-xs space-y-3.5">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 block" /> Alat Aktif
                </div>
                <span className="font-semibold text-slate-700">{aktif}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                  <span className="w-3 h-3 rounded-full bg-amber-500 block" /> Perlu Maintenance
                </div>
                <span className="font-semibold text-slate-700">{maintenance}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2.5 text-slate-600 font-medium">
                  <span className="w-3 h-3 rounded-full bg-red-500 block" /> Alat Rusak
                </div>
                <span className="font-semibold text-slate-700">{rusak}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-md font-bold text-slate-800">Alat Perlu Maintenance</h2>
            <button 
              onClick={() => navigate('/maintenance')}
              className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            {/* 3. MENAMPILKAN DATA MAINTENANCE ASLI BESERTA STATUS PRIORITASNYA */}
            {maintenanceList.length > 0 ? (
              maintenanceList.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                      {getIcon(item.kategori)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 leading-tight truncate pr-2">{item.namaAlat}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 truncate pr-2">{item.lokasi} • {item.tanggal}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mt-1 ${
                      item.status === "Segera" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-slate-400 py-4">Semua jadwal maintenance telah selesai.</div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: TABEL DAFTAR ALAT */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-md font-bold text-slate-800">Daftar Alat Kesehatan</h2>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <PlusCircle size={14} /> Tambah Alat
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-3.5 w-16">NO</th>
                <th className="text-left px-6 py-3.5">NAMA ALAT</th>
                <th className="text-left px-6 py-3.5">KATEGORI</th>
                <th className="text-left px-6 py-3.5">LOKASI</th>
                <th className="text-left px-6 py-3.5">STATUS</th>
                <th className="text-left px-6 py-3.5">TGL PEMBELIAN</th>
                <th className="text-left px-6 py-3.5">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alat.length > 0 ? (
                alat.map((item: any, index: number) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 text-slate-400 text-sm">{index + 1}</td>
                    <td className="px-6 py-4 text-slate-800 text-sm font-semibold">
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-400">{getIcon(item.kategori)}</span>
                        {item.nama}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{item.kategori}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{item.lokasi}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${
                        item.status === "Aktif" ? "bg-green-50 text-green-600" : 
                        item.status === "Rusak" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{item.tglBeli || "-"}</td>
                    <td className="px-6 py-4 flex gap-2.5">
                      <button onClick={() => handleOpenModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded transition cursor-pointer" title="Hapus">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400 text-sm">
                    Belum ada data alat kesehatan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM TAMBAH/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {isEditing ? "Edit Data Alat" : "Tambah Alat Baru"}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Alat</label>
                  <input 
                    type="text" required value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <select 
                    value={formData.kategori}
                    onChange={(e) => setFormData({...formData, kategori: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Diagnostik">Diagnostik</option>
                    <option value="Terapi">Terapi</option>
                    <option value="Bedah">Bedah</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
                  <input 
                    type="text" required value={formData.lokasi}
                    onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Perlu Maintenance">Perlu Maintenance</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Rusak">Rusak</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tgl Beli</label>
                    <input 
                      type="date" required value={formData.tglBeli}
                      onChange={(e) => setFormData({...formData, tglBeli: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={handleCloseModal} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition cursor-pointer">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}