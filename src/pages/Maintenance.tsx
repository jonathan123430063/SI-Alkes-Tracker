import React, { useState, useEffect } from "react";
import { useAlat } from "../context/AlatContext";
import { 
  Plus, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Activity, 
  Monitor, 
  Syringe, 
  Layers, 
  Stethoscope, 
  FileText,
  X,
  Check
} from "lucide-react";

export default function Maintenance() {
  const { alat = [], setAlat } = useAlat() || {};

  const [jadwal, setJadwal] = useState<any[]>([]);

  // 1. AMBIL DATA DARI LOCAL STORAGE SAAT HALAMAN DIBUKA
  useEffect(() => {
    const savedJadwal = JSON.parse(localStorage.getItem('dataJadwal') || '[]');
    setJadwal(savedJadwal);
  }, []);

  const akanDatang = jadwal.filter((j) => j.status !== "Selesai");
  const selesai = jadwal.filter((j) => j.status === "Selesai");

  const countSegera = jadwal.filter((j) => j.status === "Segera").length;
  const countTerjadwal = jadwal.filter((j) => j.status === "Terjadwal").length;
  const countSelesai = selesai.length;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaAlat: "",
    kategori: "",
    lokasi: "",
    tanggal: "",
    jenis: "Maintenance Rutin",
    teknisi: "",
    status: "Terjadwal"
  });

  const getIcon = (nama: string, kategori: string) => {
    const n = (nama || "").toLowerCase();
    if (n.includes("ecg") || n.includes("tensimeter")) return <Activity size={18} className="text-blue-500" />;
    if (n.includes("ventilator") || n.includes("monitor")) return <Monitor size={18} className="text-indigo-500" />;
    if (n.includes("suction") || n.includes("syringe") || n.includes("nebulizer")) return <Syringe size={18} className="text-cyan-500" />;
    if (n.includes("stetoskop")) return <Stethoscope size={18} className="text-slate-500" />;
    if (kategori === "Terapi") return <Layers size={18} className="text-purple-500" />;
    return <FileText size={18} className="text-blue-400" />;
  };

  const handleAlatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedNama = e.target.value;
    const selectedAlat = alat.find((a: any) => a.nama === selectedNama);
    
    setFormData({
      ...formData,
      namaAlat: selectedNama,
      lokasi: selectedAlat ? selectedAlat.lokasi : "",
      kategori: selectedAlat ? selectedAlat.kategori : ""
    });
  };

  const handleSelesaikan = (id: number, namaAlatTarget: string) => {
    if (window.confirm("Tandai maintenance ini sebagai Selesai?")) {
      const currentJadwal = jadwal.find(j => j.id === id);
      
      // 2. UPDATE STATUS LOKAL & SIMPAN KE LOCAL STORAGE
      const updatedJadwal = jadwal.map((j) => j.id === id ? { ...j, status: "Selesai", tanggalSelesai: new Date().toLocaleDateString('id-ID') } : j);
      setJadwal(updatedJadwal);
      localStorage.setItem('dataJadwal', JSON.stringify(updatedJadwal));
      
      // 3. SINKRONISASI CONTEXT ALAT: Alat kembali Aktif
      if (setAlat && alat.length > 0) {
        setAlat(alat.map((a: any) => 
          a.nama === namaAlatTarget ? { ...a, status: "Aktif" } : a
        ));
      }

      // 4. KIRIM KE RIWAYAT VIA LOCALSTORAGE
      const newRiwayat = {
        id: Date.now(),
        tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        aktivitas: "Maintenance Selesai",
        namaAlat: namaAlatTarget,
        kategori: currentJadwal ? currentJadwal.kategori : "Diagnostik",
        pengguna: "Admin",
        deskripsi: currentJadwal ? `Penyelesaian ${currentJadwal.jenis} oleh ${currentJadwal.teknisi}` : "Maintenance selesai"
      };

      const savedRiwayat = JSON.parse(localStorage.getItem('dataRiwayat') || '[]');
      localStorage.setItem('dataRiwayat', JSON.stringify([newRiwayat, ...savedRiwayat]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: jadwal.length > 0 ? Math.max(...jadwal.map(j => j.id)) + 1 : 1,
      ...formData
    };
    
    // 5. TAMBAH JADWAL BARU LOKAL & SIMPAN KE LOCAL STORAGE
    const updatedJadwal = [newItem, ...jadwal];
    setJadwal(updatedJadwal);
    localStorage.setItem('dataJadwal', JSON.stringify(updatedJadwal));

    if (setAlat && alat.length > 0) {
      setAlat(alat.map((a: any) => {
        if (a.nama === formData.namaAlat) {
          if (formData.status === "Segera") return { ...a, status: "Perlu Maintenance" };
          if (formData.status === "Terjadwal") return { ...a, status: "Maintenance" };
        }
        return a;
      }));
    }

    setIsModalOpen(false);
    setFormData({ namaAlat: "", kategori: "", lokasi: "", tanggal: "", jenis: "Maintenance Rutin", teknisi: "", status: "Terjadwal" });
  };

  return (
      <div className="p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Jadwal Maintenance</h1>
          <p className="text-slate-500 mt-1">Kelola jadwal perawatan dan maintenance alat kesehatan</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold transition shadow-sm cursor-pointer"
        >
          <Plus size={18} />
          Tambah Jadwal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <AlertCircle size={22} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Perlu Segera</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{countSegera}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Terjadwal</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{countTerjadwal}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Selesai Bulan Ini</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{countSelesai}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Maintenance yang Akan Datang</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-4 w-16">NO</th>
                  <th className="text-left px-6 py-4">NAMA ALAT</th>
                  <th className="text-left px-6 py-4">LOKASI</th>
                  <th className="text-left px-6 py-4">TANGGAL</th>
                  <th className="text-left px-6 py-4">JENIS MAINTENANCE</th>
                  <th className="text-left px-6 py-4">TEKNISI</th>
                  <th className="text-left px-6 py-4">STATUS</th>
                  <th className="text-center px-6 py-4 w-24">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {akanDatang.length > 0 ? (
                  akanDatang.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-slate-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                            {getIcon(item.namaAlat, item.kategori)}
                          </div>
                          <span className="text-slate-800 font-semibold text-sm">{item.namaAlat}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.lokasi}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400" />
                          {item.tanggal}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.jenis}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.teknisi}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1.5 rounded-md text-xs font-semibold ${
                          item.status === "Segera" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleSelesaikan(item.id, item.namaAlat)}
                          className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-md transition cursor-pointer" 
                          title="Tandai Selesai"
                        >
                          <Check size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                      Belum ada jadwal maintenance yang akan datang.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Maintenance Selesai</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-4 w-16">NO</th>
                  <th className="text-left px-6 py-4">NAMA ALAT</th>
                  <th className="text-left px-6 py-4">LOKASI</th>
                  <th className="text-left px-6 py-4">TANGGAL SELESAI</th>
                  <th className="text-left px-6 py-4">JENIS MAINTENANCE</th>
                  <th className="text-left px-6 py-4">TEKNISI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selesai.length > 0 ? (
                  selesai.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 text-slate-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                            {getIcon(item.namaAlat, item.kategori)}
                          </div>
                          <span className="text-slate-800 font-semibold text-sm">{item.namaAlat}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.lokasi}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.tanggalSelesai || item.tanggal}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.jenis}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{item.teknisi}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                      Belum ada riwayat maintenance yang selesai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Tambah Jadwal Maintenance</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Alat</label>
                  <select 
                    required value={formData.namaAlat} onChange={handleAlatChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>-- Pilih Alat --</option>
                    {alat.map((a: any, idx: number) => (
                      <option key={idx} value={a.nama}>{a.nama}</option>
                    ))}
                    {alat.length === 0 && <option value="" disabled>Data alat kosong, silakan tambah di Data Alat</option>}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi (Auto)</label>
                  <input 
                    type="text" required value={formData.lokasi} readOnly
                    className="w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-sm text-slate-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Maintenance</label>
                    <select 
                      value={formData.jenis} onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Maintenance Rutin">Maintenance Rutin</option>
                      <option value="Kalibrasi">Kalibrasi</option>
                      <option value="Pemeriksaan">Pemeriksaan</option>
                      <option value="Perbaikan">Perbaikan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Prioritas</label>
                    <select 
                      value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Terjadwal">Terjadwal</option>
                      <option value="Segera">Segera</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                    <input 
                      type="date" required value={formData.tanggal}
                      onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nama Teknisi</label>
                    <input 
                      type="text" required value={formData.teknisi}
                      onChange={(e) => setFormData({...formData, teknisi: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-medium transition cursor-pointer">Batal</button>
                <button type="submit" disabled={alat.length === 0} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2.5 rounded-lg font-medium transition cursor-pointer">Simpan Jadwal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}