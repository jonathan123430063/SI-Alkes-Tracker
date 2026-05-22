import {
  Search,
} from "lucide-react";

import { useState } from "react";

export default function Riwayat() {

  const [search, setSearch] =
    useState("");

  const data = [

    {
      alat: "Ventilator ICU",
      aktivitas: "Maintenance Berkala",
      teknisi: "Andi",
      tanggal: "20 Mei 2026",
      status: "Selesai",
    },

    {
      alat: "Infusion Pump",
      aktivitas: "Perbaikan Sensor",
      teknisi: "Budi",
      tanggal: "18 Mei 2026",
      status: "Proses",
    },

    {
      alat: "ECG Monitor",
      aktivitas: "Penggantian Kabel",
      teknisi: "Dewi",
      tanggal: "15 Mei 2026",
      status: "Pending",
    },

  ];

  const filtered = data.filter((item) =>
    item.alat
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div>

      {/* TITLE */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-slate-800">

          Riwayat

        </h1>

        <p className="text-slate-500 mt-2">

          Riwayat maintenance alat kesehatan

        </p>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-6 rounded-3xl shadow-xl mb-8">

        <div className="border rounded-2xl flex items-center gap-4 px-4 py-4">

          <Search className="text-slate-400" />

          <input
            type="text"
            placeholder="Cari riwayat..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full outline-none"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-5">
                Nama Alat
              </th>

              <th className="text-left p-5">
                Aktivitas
              </th>

              <th className="text-left p-5">
                Teknisi
              </th>

              <th className="text-left p-5">
                Tanggal
              </th>

              <th className="text-left p-5">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item, index) => (

              <tr
                key={index}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-5 font-semibold">
                  {item.alat}
                </td>

                <td className="p-5">
                  {item.aktivitas}
                </td>

                <td className="p-5">
                  {item.teknisi}
                </td>

                <td className="p-5">
                  {item.tanggal}
                </td>

                <td className="p-5">

                  <div
                    className={`

                      px-4 py-2 rounded-full
                      w-fit font-semibold

                      ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Proses"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }

                    `}
                  >

                    {item.status}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
