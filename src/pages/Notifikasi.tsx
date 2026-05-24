import React, { useState, useEffect } from "react";
import {
  Bell,
  Check,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function Notifikasi() {
  const [notifications, setNotifications] = useState<any[]>([]);

  // 1. AMBIL DATA NOTIFIKASI DARI LOCALSTORAGE
  useEffect(() => {
    const savedNotifs = JSON.parse(localStorage.getItem('dataNotifikasi') || '[]');
    setNotifications(savedNotifs);
  }, []);

  // Simpan perubahan ke localStorage setiap kali state berubah
  const saveToStorage = (updatedNotifs: any[]) => {
    setNotifications(updatedNotifs);
    localStorage.setItem('dataNotifikasi', JSON.stringify(updatedNotifs));
  };

  // 2. STATISTIK NOTIFIKASI
  const totalNotif = notifications.length;
  const unreadNotif = notifications.filter((n) => !n.isRead).length;
  const readNotif = notifications.filter((n) => n.isRead).length;

  // 3. FUNGSI WAKTU (Mengubah timestamp menjadi "2 jam yang lalu", dll)
  const timeAgo = (dateString: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun yang lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan yang lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari yang lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam yang lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit yang lalu";
    return "Baru saja";
  };

  // 4. FUNGSI HANDLER AKSI NOTIFIKASI
  const markAsRead = (id: number) => {
    const updated = notifications.map((n) => n.id === id ? { ...n, isRead: true } : n);
    saveToStorage(updated);
  };

  const deleteNotif = (id: number) => {
    const updated = notifications.filter((n) => n.id !== id);
    saveToStorage(updated);
  };

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    saveToStorage(updated);
  };

  const deleteAll = () => {
    if (window.confirm("Yakin ingin menghapus semua notifikasi?")) {
      saveToStorage([]);
    }
  };

  // 5. HELPER GAYA VISUAL BERDASARKAN TIPE
  const getStyle = (tipe: string, isRead: boolean) => {
    const styles: any = {
      warning: { border: "border-orange-400", bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-500", icon: <AlertTriangle size={20} /> },
      info: { border: "border-blue-500", bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-500", icon: <Info size={20} /> },
      success: { border: "border-green-500", bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-500", icon: <CheckCircle size={20} /> },
      error: { border: "border-red-500", bg: "bg-red-50", iconBg: "bg-red-100", iconColor: "text-red-500", icon: <XCircle size={20} /> },
    };
    
    const selected = styles[tipe] || styles.info;
    return {
      border: selected.border,
      bg: isRead ? "bg-white" : selected.bg, // Jika sudah dibaca, background jadi putih
      iconBg: selected.iconBg,
      iconColor: selected.iconColor,
      icon: selected.icon
    };
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifikasi</h1>
          <p className="text-slate-500 mt-1 text-sm">Semua notifikasi dan pemberitahuan sistem</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={markAllRead} disabled={unreadNotif === 0}
            className="flex-1 md:flex-none border border-slate-300 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 cursor-pointer"
          >
            <Check size={16} /> Tandai Semua Dibaca
          </button>
          <button 
            onClick={deleteAll} disabled={totalNotif === 0}
            className="flex-1 md:flex-none border border-red-200 text-red-500 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-red-50 transition disabled:opacity-50 cursor-pointer"
          >
            <Trash2 size={16} /> Hapus Semua
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Bell className="text-blue-500" size={22} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Notifikasi</p>
            <h1 className="text-2xl font-bold text-slate-800 mt-1">{totalNotif}</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
            <Bell className="text-orange-500" size={22} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Belum Dibaca</p>
            <h1 className="text-2xl font-bold text-slate-800 mt-1">{unreadNotif}</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <Check className="text-green-500" size={22} />
          </div>
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Sudah Dibaca</p>
            <h1 className="text-2xl font-bold text-slate-800 mt-1">{readNotif}</h1>
          </div>
        </div>
      </div>

      {/* LIST NOTIFIKASI */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        {notifications.length > 0 ? (
          notifications.map((item) => {
            const style = getStyle(item.tipe, item.isRead);
            return (
              <div
                key={item.id}
                className={`border-l-4 ${style.border} ${style.bg} p-6 flex justify-between items-start border-b border-slate-100 hover:brightness-95 transition`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full ${style.iconBg} ${style.iconColor} flex items-center justify-center shrink-0`}>
                    {style.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className={`font-bold text-sm ${item.isRead ? "text-slate-700" : "text-slate-900"}`}>
                        {item.title}
                      </h2>
                      {!item.isRead && <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" />}
                    </div>
                    <p className={`mt-1 text-sm ${item.isRead ? "text-slate-500" : "text-slate-600"}`}>
                      {item.description}
                    </p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                      {timeAgo(item.waktu)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-slate-400 shrink-0">
                  {!item.isRead && (
                    <button onClick={() => markAsRead(item.id)} className="hover:text-blue-500 transition cursor-pointer" title="Tandai Dibaca">
                      <Check size={18} />
                    </button>
                  )}
                  <button onClick={() => deleteNotif(item.id)} className="hover:text-red-500 transition cursor-pointer" title="Hapus Notifikasi">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-10 text-center text-slate-400 text-sm">
            Hore! Tidak ada notifikasi baru untuk saat ini.
          </div>
        )}
      </div>

    </div>
  );
}