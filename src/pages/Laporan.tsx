import {
  FileText,
  TrendingUp,
  ClipboardList,
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

  const cards = [
    {
      title: "Laporan Inventaris",
      desc: "Laporan lengkap semua alat kesehatan",
      icon: <FileText size={20} />,
    },
    {
      title: "Laporan Maintenance",
      desc: "Riwayat dan jadwal maintenance",
      icon: <ClipboardList size={20} />,
    },
    {
      title: "Laporan Keuangan",
      desc: "Analisis biaya dan investasi alat",
      icon: <TrendingUp size={20} />,
    },
    {
      title: "Laporan Status Alat",
      desc: "Status kondisi semua alat",
      icon: <FileText size={20} />,
    },
  ];

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Laporan
        </h1>

        <p className="text-slate-500 mt-1">
          Generate dan kelola berbagai jenis laporan
        </p>
      </div>

      {/* CARD LAPORAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              {card.icon}
            </div>

            <h2 className="font-semibold text-slate-800">
              {card.title}
            </h2>

            <p className="text-sm text-slate-500 mt-1 mb-5">
              {card.desc}
            </p>

            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-lg font-medium transition">
              Generate Laporan
            </button>
          </div>
        ))}
      </div>

      {/* TABEL */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-slate-800">
            Laporan Terbaru
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-sm">
              <tr>
                <th className="text-left px-6 py-4">
                  NAMA LAPORAN
                </th>

                <th className="text-left px-6 py-4">
                  TANGGAL DIBUAT
                </th>

                <th className="text-left px-6 py-4">
                  TIPE
                </th>

                <th className="text-left px-6 py-4">
                  FORMAT
                </th>

                <th className="text-left px-6 py-4">
                  AKSI
                </th>
              </tr>
            </thead>

            <tbody>
              {laporanTerbaru.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 text-slate-700">
                    {item.nama}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {item.tanggal}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm">
                      {item.tipe}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {item.format}
                  </td>

                  <td className="px-6 py-4 flex gap-4 text-slate-500">
                    <button>
                      <Download size={18} />
                    </button>

                    <button>
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