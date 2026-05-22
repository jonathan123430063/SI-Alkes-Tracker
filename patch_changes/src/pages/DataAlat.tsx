import { useState } from "react";
import { useAlat } from "../context/AlatContext";
export default function DataAlat() {

  const { alat, setAlat } = useAlat();

  const [search, setSearch] = useState("");

  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [status, setStatus] = useState("Aktif");

  // TAMBAH ALAT
  const tambahAlat = () => {

    if (
      nama === "" ||
      kategori === "" ||
      lokasi === ""
    ) {
      alert("Isi semua data!");
      return;
    }

    const alatBaru = {
      nama,
      kategori,
      lokasi,
      status,
    };

    setAlat([...alat, alatBaru]);

    setNama("");
    setKategori("");
    setLokasi("");
    setStatus("Aktif");
  };

  // HAPUS
  const hapusAlat = (index: number) => {
    const dataBaru = alat.filter((_: any, i: number) => i !== index);
    setAlat(dataBaru);
  };

  // UPDATE STATUS
  const updateStatus = (index: number, statusBaru: string) => {
    const dataBaru = [...alat];
    dataBaru[index].status = statusBaru;
    setAlat(dataBaru);
  };

  // SEARCH
  const filteredAlat = alat.filter((item: any) =>
    item.nama.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold">
            Data Alat
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola alat kesehatan rumah sakit
          </p>

        </div>

      </div>

      {/* FORM */}
      <div className="bg-white rounded-3xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Tambah Alat
        </h2>

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Nama alat"
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
            className="border p-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Kategori"
            value={kategori}
            onChange={(e) =>
              setKategori(e.target.value)
            }
            className="border p-4 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Lokasi"
            value={lokasi}
            onChange={(e) =>
              setLokasi(e.target.value)
            }
            className="border p-4 rounded-2xl"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-4 rounded-2xl"
          >

            <option>Aktif</option>
            <option>Maintenance</option>
            <option>Rusak</option>

          </select>

        </div>

        <button
          onClick={tambahAlat}
          className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-700"
        >

          + Tambah Alat

        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-3xl shadow p-6 mb-8">

        <input
          type="text"
          placeholder="Cari alat..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border border-gray-300 rounded-2xl p-4"
        />

      </div>

      {/* TABLE */}
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

              <th className="text-left p-5">
                Status
              </th>

              <th className="text-left p-5">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAlat.map((item: any, index: number) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-5 font-semibold">
                  {item.nama}
                </td>

                <td className="p-5">
                  {item.kategori}
                </td>

                <td className="p-5">
                  {item.lokasi}
                </td>

                <td className="p-5">

                  <select

  value={item.status}

  onChange={(e) =>
    updateStatus(
      index,
      e.target.value
    )
  }

  className={`

    px-4 py-2 rounded-full
    font-semibold outline-none

    ${
      item.status === "Aktif"
        ? "bg-green-100 text-green-600"

        : item.status === "Maintenance"
        ? "bg-yellow-100 text-yellow-600"

        : "bg-red-100 text-red-600"
    }

  `}
>

  <option value="Aktif">
    Aktif
  </option>

  <option value="Maintenance">
    Maintenance
  </option>

  <option value="Rusak">
    Rusak
  </option>

</select>

                </td>

                <td className="p-5">

                  <button
                    onClick={() =>
                      hapusAlat(index)
                    }
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200"
                  >

                    Hapus

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
