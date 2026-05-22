import { useAlat } from "../context/AlatContext";

export default function Maintenance() {

  const { alat } = useAlat();

  const maintenanceData = alat.filter(
    (item: any) =>
      item.status === "Maintenance"
  );

  return (

    <div>

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Maintenance
          </h1>

          <p className="text-gray-500 mt-2">
            Alat yang perlu maintenance
          </p>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-5">
                Nama
              </th>

              <th className="text-left p-5">
                Kategori
              </th>

              <th className="text-left p-5">
                Lokasi
              </th>

            </tr>

          </thead>

          <tbody>

            {maintenanceData.map(
              (item: any, index: number) => (

                <tr
                  key={index}
                  className="border-t"
                >

                  <td className="p-5">
                    {item.nama}
                  </td>

                  <td className="p-5">
                    {item.kategori}
                  </td>

                  <td className="p-5">
                    {item.lokasi}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}