import {
  LayoutDashboard,
  Wrench,
  MapPinned,
  PackageSearch,
  LogOut,
  History,
  
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Sidebar({
  onLogout,
}: any) {

  const location = useLocation();

  const menuClass = (path: string) => {

    return `

      flex items-center gap-4
      p-4 rounded-2xl transition-all duration-300

      ${
        location.pathname === path
          ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg"
          : "hover:bg-slate-800"
      }

    `;
  };

  return (

    <div className="w-[300px] h-screen bg-[#0F172A] text-white fixed left-0 top-0 flex flex-col justify-between p-6">

      <div>

        {/* LOGO */}
        <div className="mb-14">

          <h1 className="text-4xl font-bold">
            SI-ALKES
          </h1>

          <p className="text-gray-400 mt-2">
            Tracker System
          </p>

        </div>

        {/* MENU */}
        <div className="space-y-4">

          <Link
            to="/"
            className={menuClass("/")}
          >

            <LayoutDashboard />

            Dashboard

          </Link>

          <Link
            to="/data-alat"
            className={menuClass("/data-alat")}
          >

            <PackageSearch />

            Data Alat

          </Link>

          <Link
            to="/maintenance"
            className={menuClass("/maintenance")}
          >

            <Wrench />

            Maintenance

          </Link>

          <Link
            to="/riwayat"
            className={menuClass("/riwayat")}
          >

            <History />

            Riwayat

          </Link>

          <Link
           to="/laporan"
            className="flex items-center gap-4 hover:bg-slate-800 p-4 rounded-2xl transition"
            >
                Laporan
                </Link>

          <Link
            to="/tracking"
            className={menuClass("/tracking")}
          >

            <MapPinned />

            Tracking

          </Link>

        </div>

      </div>

      {/* USER */}
      <div>

        <div className="bg-slate-800 rounded-2xl p-5 mb-5">

          <h1 className="font-bold text-lg">
            Administrator
          </h1>

          <p className="text-gray-400 text-sm">
            admin@si-alkes.com
          </p>

        </div>

        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 p-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300"
        >

          <LogOut />

          Logout

        </button>

      </div>

    </div>
  );
}
