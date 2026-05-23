import React, { useState } from "react";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Edit2,
  Trash2,
  X,
} from "lucide-react";

export default function Pengguna() {
  // 1. STATE UNTUK DATA PENGGUNA
  const [users, setUsers] = useState([
    { id: 1, name: "Admin", email: "admin@sialkestracker.com", role: "Administrator", status: "Aktif", lastLogin: "06 Mei 2024, 14:30" },
    { id: 2, name: "Ahmad Fauzi", email: "ahmad.fauzi@example.com", role: "Teknisi", status: "Aktif", lastLogin: "06 Mei 2024, 10:15" },
    { id: 3, name: "Budi Santoso", email: "budi.santoso@example.com", role: "Teknisi", status: "Aktif", lastLogin: "05 Mei 2024, 16:20" },
    { id: 4, name: "Siti Nurhaliza", email: "siti.nurhaliza@example.com", role: "Teknisi", status: "Aktif", lastLogin: "05 Mei 2024, 09:45" },
    { id: 5, name: "Eko Prasetyo", email: "eko.prasetyo@example.com", role: "Staff", status: "Aktif", lastLogin: "04 Mei 2024, 13:10" },
    { id: 6, name: "Dewi Sartika", email: "dewi.sartika@example.com", role: "Staff", status: "Non-Aktif", lastLogin: "28 Apr 2024, 11:30" },
  ]);

  // 2. STATE UNTUK MODAL FORM (TAMBAH/EDIT)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // State untuk isian form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Teknisi",
    status: "Aktif",
  });

  // 3. FUNGSI HITUNG STATISTIK (Dinamis berdasarkan state users)
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Aktif").length;
  const adminUsers = users.filter((u) => u.role === "Administrator").length;

  // 4. FUNGSI HANDLER TOMBOL
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      // Mode Edit
      setIsEditing(true);
      setEditId(user.id);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      // Mode Tambah Baru
      setIsEditing(false);
      setEditId(null);
      setFormData({ name: "", email: "", role: "Teknisi", status: "Aktif" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update data yang ada
      setUsers(users.map((user) => 
        user.id === editId 
          ? { ...user, ...formData } 
          : user
      ));
    } else {
      // Tambah data baru
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1, // Auto increment ID sederhana
        ...formData,
        lastLogin: "Belum pernah login", // Default untuk user baru
      };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  // Helper untuk mendapatkan inisial nama
  const getInitials = (name) => name.charAt(0).toUpperCase();

  // Helper untuk warna badge Role
  const getRoleBadge = (role) => {
    switch (role) {
      case "Administrator": return "bg-purple-100 text-purple-700";
      case "Teknisi": return "bg-blue-100 text-blue-700";
      default: return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER & TOMBOL TAMBAH */}
      <div className="flex justify-between items-center bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Pengguna</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola pengguna dan hak akses sistem</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          <UserPlus size={18} />
          Tambah Pengguna
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Pengguna</p>
            <p className="text-2xl font-bold text-slate-800">{totalUsers}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Pengguna Aktif</p>
            <p className="text-2xl font-bold text-slate-800">{activeUsers}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4 border border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <ShieldAlert size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Administrator</p>
            <p className="text-2xl font-bold text-slate-800">{adminUsers}</p>
          </div>
        </div>
      </div>

      {/* TABEL PENGGUNA */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="text-left px-6 py-4 tracking-wider">NO</th>
                <th className="text-left px-6 py-4 tracking-wider">NAMA</th>
                <th className="text-left px-6 py-4 tracking-wider">EMAIL</th>
                <th className="text-left px-6 py-4 tracking-wider">ROLE</th>
                <th className="text-left px-6 py-4 tracking-wider">STATUS</th>
                <th className="text-left px-6 py-4 tracking-wider">LOGIN TERAKHIR</th>
                <th className="text-left px-6 py-4 tracking-wider">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-500 text-sm">{index + 1}</td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        {getInitials(user.name)}
                      </div>
                      <span className="font-medium text-slate-800 text-sm">{user.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-sm">{user.email}</td>
                  
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-medium ${user.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-500 text-sm">{user.lastLogin}</td>
                  
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => handleOpenModal(user)} className="text-blue-500 hover:text-blue-700 transition" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 transition" title="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM TAMBAH/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-slate-800">
                {isEditing ? "Edit Pengguna" : "Tambah Pengguna Baru"}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan email..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Teknisi">Teknisi</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-medium transition"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}