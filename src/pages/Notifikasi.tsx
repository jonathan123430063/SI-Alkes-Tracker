import {
  Bell,
  Check,
  Trash2,
  AlertTriangle,
} from "lucide-react";

export default function Notifikasi() {
  const notifications = [
    {
      title: "Maintenance Segera",
      description:
        "ECG 3 Channel perlu maintenance dalam 3 hari",
      time: "2 jam yang lalu",
      color: "border-orange-400",
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      unread: true,
    },
    {
      title: "Alat Baru Ditambahkan",
      description:
        "Pulse Oximeter telah ditambahkan ke inventaris",
      time: "1 hari yang lalu",
      color: "border-blue-500",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      unread: true,
    },
    {
      title: "Maintenance Selesai",
      description:
        "Tensimeter Digital telah selesai di-maintenance",
      time: "2 hari yang lalu",
      color: "border-green-500",
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Status Berubah",
      description:
        "Suction Pump status berubah menjadi Rusak",
      time: "3 hari yang lalu",
      color: "border-red-500",
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      title: "Maintenance Terjadwal",
      description:
        "Ventilator dijadwalkan maintenance pada 18 Mei 2024",
      time: "4 hari yang lalu",
      color: "border-blue-500",
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Notifikasi
          </h1>

          <p className="text-slate-500 mt-1">
            Semua notifikasi dan pemberitahuan sistem
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border border-slate-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-100 transition">
            <Check size={18} />
            Tandai Semua Dibaca
          </button>

          <button className="border border-red-300 text-red-500 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-red-50 transition">
            <Trash2 size={18} />
            Hapus Semua
          </button>

        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
            <Bell className="text-blue-500" />
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Total Notifikasi
            </p>

            <h1 className="text-3xl font-bold">
              5
            </h1>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
            <Bell className="text-orange-500" />
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Belum Dibaca
            </p>

            <h1 className="text-3xl font-bold">
              2
            </h1>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
            <Check className="text-green-500" />
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Sudah Dibaca
            </p>

            <h1 className="text-3xl font-bold">
              3
            </h1>
          </div>

        </div>

      </div>

      {/* LIST NOTIFIKASI */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

        {notifications.map((item, index) => (
          <div
            key={index}
            className={`border-l-4 ${item.color} ${item.bg}
            p-6 flex justify-between items-start border-b hover:brightness-95 transition`}
          >

            <div className="flex gap-4">

              <div
                className={`w-12 h-12 rounded-full ${item.iconBg}
                flex items-center justify-center`}
              >
                <AlertTriangle
                  className={item.iconColor}
                  size={20}
                />
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="font-bold text-lg text-slate-800">
                    {item.title}
                  </h2>

                  {item.unread && (
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  )}

                </div>

                <p className="text-slate-600 mt-1">
                  {item.description}
                </p>

                <p className="text-sm text-slate-400 mt-3">
                  {item.time}
                </p>

              </div>

            </div>

            <div className="flex gap-4 text-slate-500">

              {item.unread && (
                <button className="hover:text-blue-500 transition">
                  <Check size={18} />
                </button>
              )}

              <button className="hover:text-red-500 transition">
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}