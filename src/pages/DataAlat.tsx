import React, { useState } from "react";
import { useAlat } from "../context/AlatContext";
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit2, 
  Trash2, 
  Activity, 
  Monitor, 
  Syringe, 
  Layers, 
  Stethoscope, 
  X,
  FileText
} from "lucide-react";

export default function DataAlat() {
  const { alat = [], setAlat } = useAlat() || {};

  // 1. STATE PENCARIAN & FILTER
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [showExtraFilter, setShowExtraFilter] = useState(false);

  // 2. STATE UNTUK MODAL TAMBAH/EDIT
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null); 
  
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "Diagnostik",
    lokasi: "Ruang Poli Umum",
    status: "Aktif",
    harga: "",
    tglBeli: ""
  });

  // --- FUNGSI HELPER: PENGIRIM NOTIFIKASI ---
  const createNotification = (title: string, description: string, tipe: string) => {
    const newNotif = {
      id: Date.now(),
      title,
      description,
      waktu: new Date().toISOString(),
      tipe,
      isRead: false
    };
    const savedNotifs = JSON.parse(localStorage.getItem('dataNotifikasi') || '[]');
    localStorage.setItem('dataNotifikasi', JSON.stringify([newNotif, ...savedNotifs]));
  };

  // --- FUNGSI HELPER: PENCATAT RIWAYAT ---
  const createRiwayat = (aktivitas: string, namaAlat: string, kategori: string, deskripsi: string) => {
    const newRiwayat = {
      id: Date.now() + 1, // +1 agar id tidak bentrok jika dipanggil bersamaan dgn notif
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      aktivitas,
      namaAlat,
      kategori,
      pengguna: "Admin",
      deskripsi
    };
    const savedRiwayat = JSON.parse(localStorage.getItem('dataRiwayat') || '[]');
    localStorage.setItem('dataRiwayat', JSON.stringify([newRiwayat, ...savedRiwayat]));
  };

  // 3. FILTER DATA UNTUK TABEL
  const filteredAlat = alat.filter((item: any) => {
    const matchSearch = item.nama?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" || item.status === filterStatus;
    const matchKategori = filterKategori === "Semua" || item.kategori === filterKategori;
    
    return matchSearch && matchStatus && matchKategori;
  });

  // 4. HELPER ICON DINAMIS
  const getIcon = (nama: string, kategori: string) => {
    const n = (nama || "").toLowerCase();
    if (n.includes("ecg") || n.includes("tensimeter")) return <Activity size={18} className="text-blue-500" />;
    if (n.includes("ventilator") || n.includes("monitor")) return <Monitor size={18} className="text-indigo-500" />;
    if (n.includes("suction") || n.includes("syringe")) return <Syringe size={18} className="text-cyan-500" />;
    if (n.includes("stetoskop")) return <Stethoscope size={18} className="text-slate-500" />;
    if (kategori === "Terapi") return <Layers size={18} className="text-purple-500" />;
    return <FileText size={18} className="text-blue-400" />;
  };

  // 5. FORMATTER MATA UANG
  const formatRupiah = (angka: any) => {
    if (!angka) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka));
  };

  // 6. FUNGSI HANDLER (CRUD) MENGGUNAKAN INDEX + INTEGRASI NOTIFIKASI
  const handleDelete = (index: number) => {
    if (!setAlat) return alert("Fungsi setAlat tidak ditemukan di context.");
    
    const alatYangDihapus = alat[index];
    
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${alatYangDihapus.nama}?`)) {
      const dataBaru = alat.filter((_: any, i: number) => i !== index);
      setAlat(dataBaru);

      // Trigger Notifikasi & Riwayat
      createNotification("Alat Dihapus", `${alatYangDihapus.nama} telah dihapus dari inventaris`, "error");
      createRiwayat("Penghapusan Alat", alatYangDihapus.nama, alatYangDihapus.kategori, "Alat dihapus dari sistem inventaris");
    }
  };

  const handleOpenModal = (item: any = null, index: number | null = null) => {
    if (item && index !== null) {
      setIsEditing(true);
      setEditIndex(index);
      setFormData({
        nama: item.nama || "",
        kategori: item.kategori || "Diagnostik",
        lokasi: item.lokasi || "",
        status: item.status || "Aktif",
        harga: item.harga || "",
        tglBeli: item.tglBeli || ""
      });
    } else {
      setIsEditing(false);
      setEditIndex(null);
      setFormData({ nama: "", kategori: "Diagnostik", lokasi: "Ruang Poli Umum", status: "Aktif", harga: "", tglBeli: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setAlat) return alert("Fungsi setAlat tidak ditemukan di context.");

    if (isEditing && editIndex !== null) {
      // PROSES EDIT DATA
      const oldData = alat[editIndex];
      const dataBaru = [...alat];
      dataBaru[editIndex] = formData;
      setAlat(dataBaru);

      // Deteksi jika terjadi perubahan status (Misal: Aktif -> Rusak)
      if (oldData.status !== formData.status) {
        let notifType = "info";
        if (formData.status === "Rusak") notifType = "error";
        else if (formData.status === "Perlu Maintenance") notifType = "warning";
        else if (formData.status === "Aktif") notifType = "success";

        createNotification("Status Berubah", `${formData.nama} status berubah menjadi ${formData.status}`, notifType);
        createRiwayat("Perubahan Status", formData.nama, formData.kategori, `Status diubah menjadi ${formData.status}`);
      } else {
        createNotification("Data Alat Diperbarui", `Informasi ${formData.nama} berhasil diperbarui`, "info");
        createRiwayat("Pembaruan Data", formData.nama, formData.kategori, "Informasi detail alat diperbarui");
      }

    } else {
      // PROSES TAMBAH DATA BARU
      setAlat([...alat, formData]);
      
      // Trigger Notifikasi & Riwayat Alat Baru
      createNotification("Alat Baru Ditambahkan", `${formData.nama} telah ditambahkan ke inventaris`, "info");
      createRiwayat("Penambahan Alat", formData.nama, formData.kategori, "Alat baru ditambahkan ke inventaris");
    }
    
    handleCloseModal();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Alat Kesehatan</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola semua data alat kesehatan di sini</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold transition shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          Tambah Alat Baru
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 relative">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Cari alat kesehatan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px] cursor-pointer"
          >
            <option value="Semua">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Perlu Maintenance">Perlu Maintenance</option>
            <option value="Rusak">Rusak</option>
          </select>
          
          {/* Menu Filter Lainnya */}
          <div className="relative">
            <button 
              onClick={() => setShowExtraFilter(!showExtraFilter)}
              className={`border bg-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition cursor-pointer ${
                filterKategori !== "Semua" ? "border-blue-500 text-blue-600 bg-blue-50" : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Filter size={16} />
              Filter Kategori
            </button>

            {/* Dropdown Filter Kategori */}
            {showExtraFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10 p-2">
                <p className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">Pilih Kategori</p>
                <div className="space-y-1">
                  {["Semua", "Diagnostik", "Terapi", "Bedah", "Lainnya"].map((kat) => (
                    <button
                      key={kat}
                      onClick={() => {
                        setFilterKategori(kat);
                        setShowExtraFilter(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                        filterKategori === kat ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {kat === "Semua" ? "Tampilkan Semua" : kat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-slate-50/50 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 w-16">NO</th>
                <th className="text-left px-6 py-4">NAMA ALAT</th>
                <th className="text-left px-6 py-4">KATEGORI</th>
                <th className="text-left px-6 py-4">LOKASI</th>
                <th className="text-left px-6 py-4">STATUS</th>
                <th className="text-left px-6 py-4">HARGA</th>
                <th className="text-left px-6 py-4">TGL PEMBELIAN</th>
                <th className="text-left px-6 py-4">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAlat.length > 0 ? (
                filteredAlat.map((item: any, index: number) => {
                  const originalIndex = alat.findIndex((a: any) => a === item);
                  
                  return (
                    <tr key={originalIndex} className="hover:bg-slate-50/50 transition group">
                      <td className="px-6 py-4 text-slate-500 text-sm">{index + 1}</td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                            {getIcon(item.nama, item.kategori)}
                          </div>
                          <span className="text-slate-800 font-semibold text-sm">{item.nama}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.kategori}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.lokasi}</td>
                      
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1.5 rounded-md text-xs font-semibold ${
                          item.status === "Aktif" ? "bg-green-100 text-green-600" : 
                          item.status === "Perlu Maintenance" || item.status === "Maintenance" ? "bg-orange-100 text-orange-600" : 
                          "bg-red-100 text-red-600"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 text-slate-500 text-sm">{formatRupiah(item.harga)}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.tglBeli || "-"}</td>
                      
                      <td className="px-6 py-4 flex items-center gap-3">
                        <button className="text-slate-400 hover:text-slate-700 transition cursor-pointer" title="Lihat Detail">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => handleOpenModal(item, originalIndex)} className="text-blue-500 hover:text-blue-700 transition cursor-pointer" title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(originalIndex)} className="text-red-500 hover:text-red-700 transition cursor-pointer" title="Hapus">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-slate-400 text-sm">
                    Tidak ada data alat yang ditemukan.
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
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
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
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp)</label>
                    <input 
                      type="number" value={formData.harga}
                      onChange={(e) => setFormData({...formData, harga: e.target.value})}
                      placeholder="Contoh: 2500000"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Perlu Maintenance">Perlu Maintenance</option>
                      <option value="Rusak">Rusak</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tgl Pembelian</label>
                  <input 
                    type="date" value={formData.tglBeli}
                    onChange={(e) => setFormData({...formData, tglBeli: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={handleCloseModal} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer">
                  Batal
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition cursor-pointer">
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}