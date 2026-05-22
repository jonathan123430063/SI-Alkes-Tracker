import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

const icon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
});

export default function Tracking() {

  const alat = [

    {
      nama: "Ventilator ICU",
      lokasi: "Gedung A",
      posisi: [-5.397140, 105.266792],
    },

    {
      nama: "Infusion Pump",
      lokasi: "Rawat Inap",
      posisi: [-5.398000, 105.267300],
    },

    {
      nama: "ECG 3 Channel",
      lokasi: "Poli Umum",
      posisi: [-5.396700, 105.266100],
    },

  ];

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-5xl font-bold">
            Tracking Alat
          </h1>

          <p className="text-gray-500 mt-2">
            Monitoring lokasi alat kesehatan
          </p>

        </div>

      </div>

      {/* MAP */}
      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="h-[700px] w-full">

          <MapContainer
            center={[-5.397140, 105.266792]}
            zoom={17}
            className="h-full w-full"
          >

            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {alat.map((item, index) => (

              <Marker
                key={index}
                position={item.posisi as any}
                icon={icon}
              >

                <Popup>

                  <div>

                    <h1 className="font-bold text-lg">
                      {item.nama}
                    </h1>

                    <p>
                      {item.lokasi}
                    </p>

                  </div>

                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </div>

      </div>

    </div>
  );
}