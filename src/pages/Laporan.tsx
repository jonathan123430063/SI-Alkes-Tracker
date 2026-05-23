import {
  FileText,
  TrendingUp,
  BarChart2,
  Download,
  Printer,
} from "lucide-react";

export default function Laporan() {
  const laporanTerbaru = [
    {
      nama: "Laporan Inventaris April 2024",
      tanggal: "01 Mei 2024",
      tipe: "Inventaris",
      format: "PDF",
    },
    {
      nama: "Laporan Maintenance Q1 2024",
      tanggal: "28 Apr 2024",
      tipe: "Maintenance",
      format: "Excel",
    },
    {
      nama: "Laporan Keuangan Maret 2024",
      tanggal: "25 Apr 2024",
      tipe: "Keuangan",
      format: "PDF",
    },
    {
      nama: "Laporan Status Alat April 2024",
      tanggal: "22 Apr 2024",
      tipe: "Status",
      format: "PDF",
    },
  ];

  // Penambahan spesifik warna icon sesuai desain Figma
  const cards = [
    {
      title: "Laporan Inventaris",
      desc: "Laporan lengkap semua alat kesehatan",
      icon: <FileText size={20} />,
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      title: "Laporan Maintenance",
      desc: "Riwayat dan jadwal maintenance",
      icon: <BarChart2 size={20} />,
      iconColor: "bg-green-100 text-green-600",
    },
    {
      title: "Laporan Keuangan",
      desc: "Analisis biaya dan investasi alat",
      icon: <TrendingUp size={20} />,
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      title: "Laporan Status Alat",
      desc: "Status kondisi semua alat",
      icon: <FileText size={20} />,
      iconColor: "bg-orange-100 text-orange-500",
    },
  ];

  // Fungsi handler aman untuk memastikan SEMUA tombol berjalan
  const handleGenerateClick = (judulLaporan: string) => {
    // Console log dan alert ini membuktikan bahwa setiap tombol memiliki aksi yang mandiri
    console.log(`Menjalankan proses generate untuk: ${judulLaporan}`);
    alert(`Tombol berfungsi! Siap men-generate data untuk: ${judulLaporan}`);

    // Nanti kamu bisa masukkan kembali logika jsPDF / xlsx di dalam blok ini
  };

  const handleActionClick = (actionName: string, namaLaporan: string) => {
    alert(`Aksi ${actionName} ditekan untuk: ${namaLaporan}`);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Laporan</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Generate dan kelola berbagai jenis laporan
        </p>
      </div>

      {/* CARD LAPORAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col"
          >
            {/* Warna Icon Dinamis Sesuai Figma */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.iconColor}`}>
              {card.icon}
            </div>

            <h2 className="font-bold text-slate-800 mb-1">{card.title}</h2>
            <p className="text-sm text-slate-500 mb-6 flex-grow">
              {card.desc}
            </p>

            {/* Tombol Gelap Sesuai Figma */}
            <button
              onClick={() => handleGenerateClick(card.title)}
              className="w-full bg-[#111827] hover:bg-slate-800 text-white py-2.5 rounded-lg text-sm font-medium transition"
            >
              Generate Laporan
            </button>
          </div>
        ))}
      </div>

      {/* TABEL */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Laporan Terbaru</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="text-left px-6 py-4">NAMA LAPORAN</th>
                <th className="text-left px-6 py-4">TANGGAL DIBUAT</th>
                <th className="text-left px-6 py-4">TIPE</th>
                <th className="text-left px-6 py-4">FORMAT</th>
                <th className="text-left px-6 py-4">AKSI</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {laporanTerbaru.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 text-slate-800 text-sm font-medium flex items-center gap-3">
                    {/* Tambahan Icon Dokumen di dalam tabel seperti Figma */}
                    <FileText size={18} className="text-slate-400" />
                    {item.nama}
                  </td>

                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {item.tanggal}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md text-xs font-medium">
                      {item.tipe}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {item.format}
                  </td>

                  <td className="px-6 py-4 flex gap-4">
                    {/* Icon Download (Biru) Sesuai Figma */}
                    <button
                      onClick={() => handleActionClick("Download", item.nama)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>

                    {/* Icon Print (Abu-abu gelap) Sesuai Figma */}
                    <button
                      onClick={() => handleActionClick("Print", item.nama)}
                      className="text-slate-600 hover:text-slate-800 transition"
                      title="Print"
                    >
                      <Printer size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}