import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

import { useAlat } from "../context/AlatContext";

export default function Dashboard() {

  const { alat } = useAlat();

  const total = alat.length;

  const aktif = alat.filter(
    (a: any) => a.status === "Aktif"
  ).length;

  const maintenance = alat.filter(
    (a: any) => a.status === "Maintenance"
  ).length;

  const rusak = alat.filter(
    (a: any) => a.status === "Rusak"
  ).length;

  const data = [
    {
      name: "Aktif",
      value: aktif,
      color: "#10b981",
    },

    {
      name: "Maintenance",
      value: maintenance,
      color: "#f59e0b",
    },

    {
      name: "Rusak",
      value: rusak,
      color: "#ef4444",
    },
  ];

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Monitoring alat kesehatan
          </p>

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-8 shadow">

          <p className="text-gray-500">
            TOTAL ALAT
          </p>

          <h1 className="text-6xl font-bold mt-4">
            {total}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow">

          <p className="text-gray-500">
            AKTIF
          </p>

          <h1 className="text-6xl font-bold mt-4 text-green-500">
            {aktif}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow">

          <p className="text-gray-500">
            MAINTENANCE
          </p>

          <h1 className="text-6xl font-bold mt-4 text-yellow-500">
            {maintenance}
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow">

          <p className="text-gray-500">
            RUSAK
          </p>

          <h1 className="text-6xl font-bold mt-4 text-red-500">
            {rusak}
          </h1>

        </div>

      </div>

      {/* CHART */}
      <div className="bg-white rounded-3xl shadow p-8 mt-10">

        <h2 className="text-3xl font-bold mb-10">
          Grafik Status Alat
        </h2>

        <div className="h-96">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={data}
                innerRadius={90}
                outerRadius={140}
                dataKey="value"
              >

                {data.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={entry.color}
                  />

                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}