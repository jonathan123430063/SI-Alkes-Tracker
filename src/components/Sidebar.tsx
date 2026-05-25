import React, { useState } from "react";
// IMPORT GAMBAR LOGO (Sudah disesuaikan dengan logo.jpeg)
import LogoHospital from "../assets/logo.jpeg"; 

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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ onLogout }: any) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { title: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { title: "Data Alat Kesehatan", path: "/data-alat", icon: <PackageSearch size={20} /> },
    { title: "Maintenance", path: "/maintenance", icon: <Wrench size={20} /> },
    { title: "Riwayat", path: "/riwayat", icon: <History size={20} /> },
    { title: "Laporan", path: "/laporan", icon: <FileBarChart size={20} /> },
    { title: "Notifikasi", path: "/notifikasi", icon: <Bell size={20} /> },
    { title: "Pengguna", path: "/pengguna", icon: <Users size={20} /> },
  ];

  return (
    <div 
      className={`${isOpen ? "w-[260px]" : "w-[88px]"} h-screen bg-blue-600 text-white flex flex-col justify-between border-r border-blue-500 shrink-0 relative z-20 transition-all duration-300 ease-in-out`}
    >
      {/* TOMBOL TOGGLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 bg-white text-blue-600 rounded-full p-1.5 shadow-md border border-slate-100 hover:bg-slate-50 transition-colors z-50 cursor-pointer"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* === BAGIAN ATAS (LOGO & MENU) === */}
      <div className="overflow-y-auto overflow-x-hidden no-scrollbar">

        {/* LOGO SECTION */}
        <div className={`px-6 py-8 border-b border-blue-500 flex ${isOpen ? "items-center" : "justify-center"} gap-3 transition-all duration-300`}>
          
          {/* TAG IMG MENGGUNAKAN LOGO.JPEG */}
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-inner overflow-hidden p-1">
            <img 
              src={LogoHospital} 
              alt="Logo RS" 
              className="w-full h-full object-contain" 
            />
          </div>

          {/* Teks Logo */}
          <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
            <h1 className="font-bold text-xl leading-5 whitespace-nowrap">
              SI ALKES
              <br />
              TRACKER
            </h1>
            <p className="text-[10px] text-blue-100 mt-1 leading-tight whitespace-nowrap">
              Sistem Informasi Alat
              <br />
              Kesehatan
            </p>
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
                title={!isOpen ? item.title : ""}
                className={`flex items-center ${isOpen ? "justify-start px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-200 text-sm group
                  ${isActive ? "bg-blue-700 shadow-inner font-medium" : "hover:bg-blue-500 text-blue-50"}
                `}
              >
                <div className="shrink-0">{item.icon}</div>
                <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? "w-auto opacity-100 ml-3" : "w-0 opacity-0 ml-0"}`}>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* === BAGIAN BAWAH (TOMBOL LOGOUT) === */}
      <div className="p-4 border-t border-blue-500">
        <button
          onClick={onLogout}
          title={!isOpen ? "Keluar" : ""}
          className={`w-full flex items-center ${isOpen ? "justify-start px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-200 text-sm group hover:bg-blue-700 text-blue-50 cursor-pointer`}
        >
          <div className="shrink-0">
            <LogOut size={20} className="text-blue-200 group-hover:text-red-300 transition-colors" />
          </div>
          <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? "w-auto opacity-100 ml-3 font-medium group-hover:text-red-100" : "w-0 opacity-0 ml-0"}`}>
            Keluar
          </span>
        </button>
      </div>

    </div>
  );
}