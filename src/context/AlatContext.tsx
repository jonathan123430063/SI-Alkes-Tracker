import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AlatContext = createContext<any>(null);

export function AlatProvider({
  children,
}: any) {

  // DATA AWAL
  const defaultData = [

    {
      nama: "Ventilator",
      kategori: "ICU",
      lokasi: "Ruang ICU",
      status: "Aktif",
    },

    {
      nama: "Infusion Pump",
      kategori: "Rawat Inap",
      lokasi: "Ruang 203",
      status: "Maintenance",
    },

    {
      nama: "ECG 3 Channel",
      kategori: "Monitoring",
      lokasi: "Poli Umum",
      status: "Rusak",
    },

  ];

  // AMBIL DATA DARI LOCAL STORAGE
  const [alat, setAlat] = useState(() => {

    const savedData = localStorage.getItem(
      "dataAlat"
    );

    return savedData
      ? JSON.parse(savedData)
      : defaultData;
  });

  // SIMPAN KE LOCAL STORAGE
  useEffect(() => {

    localStorage.setItem(
      "dataAlat",
      JSON.stringify(alat)
    );

  }, [alat]);

  return (

    <AlatContext.Provider
      value={{
        alat,
        setAlat,
      }}
    >

      {children}

    </AlatContext.Provider>
  );
}

export function useAlat() {
  return useContext(AlatContext);
}