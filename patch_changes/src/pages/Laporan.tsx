export default function Laporan() {

  const laporan = [

  // LAPORAN INVENTARIS
  {
    nama: "Laporan Inventaris ICU",
    tanggal: "01 Mei 2026",
    tipe: "Inventaris",
    format: "Excel",
  },

  {
    nama: "Laporan Inventaris Radiologi",
    tanggal: "03 Mei 2026",
    tipe: "Inventaris",
    format: "PDF",
  },

  // LAPORAN MAINTENANCE
  {
    nama: "Laporan Maintenance Ventilator",
    tanggal: "05 Mei 2026",
    tipe: "Maintenance",
    format: "Excel",
  },

  {
    nama: "Laporan Maintenance ECG",
    tanggal: "08 Mei 2026",
    tipe: "Maintenance",
    format: "PDF",
  },

  // LAPORAN KEUANGAN
  {
    nama: "Laporan Keuangan Alat ICU",
    tanggal: "10 Mei 2026",
    tipe: "Keuangan",
    format: "Excel",
  },

  {
    nama: "Laporan Biaya Maintenance",
    tanggal: "12 Mei 2026",
    tipe: "Keuangan",
    format: "PDF",
  },

  // LAPORAN STATUS ALAT
  {
    nama: "Laporan Status Alat Aktif",
    tanggal: "15 Mei 2026",
    tipe: "Status Alat",
    format: "Excel",
  },

  {
    nama: "Laporan Status Alat Rusak",
    tanggal: "18 Mei 2026",
    tipe: "Status Alat",
    format: "PDF",
  },

];

  return (

    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Laporan
        </h1>

        <p className="text-gray-500 mt-2">
          Monitoring laporan alat kesehatan rumah sakit
        </p>

      </div>

      {/* GRID LAPORAN */}
      <div className="grid grid-cols-2 gap-8">

        {/* INVENTARIS */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Laporan Inventaris
          </h2>

          <div className="space-y-4">

            <p>Total alat: 125 Unit</p>
            <p>Aktif: 98 Unit</p>
            <p>Maintenance: 18 Unit</p>
            <p>Rusak: 9 Unit</p>

          </div>

        </div>

        {/* MAINTENANCE */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Laporan Maintenance
          </h2>

          <div className="space-y-4">

            <p>Maintenance selesai: 13 Alat</p>
            <p>Maintenance proses: 5 Alat</p>
            <p>Jadwal berikutnya: 25 Mei 2026</p>

          </div>

        </div>

        {/* KEUANGAN */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Laporan Keuangan
          </h2>

          <div className="space-y-4">

            <p>Pengadaan alat: Rp 250.000.000</p>
            <p>Maintenance: Rp 35.000.000</p>
            <p>Sparepart: Rp 12.500.000</p>
            <p>Total: Rp 305.500.000</p>

          </div>

        </div>

        {/* STATUS */}
        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Laporan Status Alat
          </h2>

          <div className="space-y-4">

            <p>Aktif: 78%</p>
            <p>Maintenance: 14%</p>
            <p>Rusak: 8%</p>

          </div>

        </div>

      </div>

      {/* LAPORAN TERBARU */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

        <h2 className="text-3xl font-bold mb-8">
          Laporan Terbaru
        </h2>

        <div className="space-y-5">

          {laporanTerbaru.map((item, index) => (

            <div
              key={index}
              className="flex justify-between border-b pb-4"
            >

              <h1 className="font-semibold">
                {item.aktivitas}
              </h1>

              <p className="text-gray-500">
                {item.tanggal}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
