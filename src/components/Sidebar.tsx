import {
  LayoutDashboard,
  Wrench,
  PackageSearch,
  LogOut,
  History,
  FileBarChart,
  Bell,
  Users,
  Settings,
  ChevronDown,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Sidebar({
  onLogout,
}: any) {

  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={18} />,
    },
    {
      title: "Data Alat Kesehatan",
      path: "/data-alat",
      icon: <PackageSearch size={18} />,
    },
    {
      title: "Maintenance",
      path: "/maintenance",
      icon: <Wrench size={18} />,
    },
    {
      title: "Riwayat",
      path: "/riwayat",
      icon: <History size={18} />,
    },
    {
      title: "Laporan",
      path: "/laporan",
      icon: <FileBarChart size={18} />,
    },
    {
      title: "Notifikasi",
      path: "/notifikasi",
      icon: <Bell size={18} />,
    },
    {
      title: "Pengguna",
      path: "/pengguna",
      icon: <Users size={18} />,
    },
    {
      title: "Pengaturan",
      path: "/pengaturan",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="w-[260px] h-screen bg-blue-600 text-white fixed left-0 top-0 flex flex-col justify-between border-r border-blue-500">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="px-6 py-8 border-b border-blue-500">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
              O
            </div>

            <div>
              <h1 className="font-bold text-2xl leading-6">
                SI ALKES
                <br />
                TRACKER
              </h1>

              <p className="text-xs text-blue-100 mt-1">
                Sistem Informasi Alat
                <br />
                Kesehatan
              </p>
            </div>

          </div>

        </div>

        {/* MENU */}
        <div className="px-3 py-4 space-y-1">

          {menuItems.map((item, index) => {

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm
                  
                  ${
                    isActive
                      ? "bg-blue-700 shadow-md"
                      : "hover:bg-blue-500"
                  }
                `}
              >
                {item.icon}

                <span>
                  {item.title}
                </span>
              </Link>
            );
          })}

        </div>

      </div>

      {/* USER */}
      <div className="border-t border-blue-500 p-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-800 flex items-center justify-center font-semibold">
              A
            </div>

            <div>
              <h1 className="font-semibold text-sm">
                Admin
              </h1>

              <p className="text-xs text-blue-100">
                Administrator
              </p>
            </div>

          </div>

          <ChevronDown size={18} />

        </div>

        <button
          onClick={onLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 transition p-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}