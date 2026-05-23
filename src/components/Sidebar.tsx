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
    <div className="w-[260px] h-screen bg-blue-600 text-white flex flex-col justify-between border-r border-blue-500 shrink-0 relative z-20">

      {/* TOP */}
      <div className="overflow-y-auto overflow-x-hidden no-scrollbar">

        {/* LOGO */}
        <div className="px-6 py-8 border-b border-blue-500">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold shrink-0">
              O
            </div>

            <div>
              <h1 className="font-bold text-xl leading-5">
                SI ALKES
                <br />
                TRACKER
              </h1>

              <p className="text-[10px] text-blue-100 mt-1 leading-tight">
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

            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm
                  ${
                    isActive
                      ? "bg-blue-700 shadow-inner font-medium"
                      : "hover:bg-blue-500 text-blue-50"
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

      {/* USER & LOGOUT SECTION */}
      <div className="border-t border-blue-500 p-4 shrink-0 bg-blue-600">

        <div className="flex items-center justify-between cursor-pointer hover:bg-blue-700 p-2 -mx-2 rounded-xl transition-colors">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center font-bold shadow-sm shrink-0">
              A
            </div>

            <div>
              <h1 className="font-bold text-sm leading-tight">
                Admin
              </h1>

              <p className="text-[11px] text-blue-200 mt-0.5">
                Administrator
              </p>
            </div>

          </div>

          <ChevronDown size={18} className="text-blue-200" />

        </div>

        <button
          onClick={onLogout}
          className="mt-4 w-full bg-blue-800 hover:bg-red-500 hover:text-white transition-colors duration-300 p-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-sm"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </div>
  );
}