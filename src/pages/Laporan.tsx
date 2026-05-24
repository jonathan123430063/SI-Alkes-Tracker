import React, { useState, useEffect } from "react";
import { useAlat } from "../context/AlatContext";
import {
  FileText,
  TrendingUp,
  BarChart2,
  Download,
  Printer,
  X,
  FileCode,
  FileSpreadsheet
} from "lucide-react";

// Import Library Export yang sudah diperbaiki
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // <-- Perbaikan import di sini
import * as XLSX from "xlsx";

export default function Laporan() {
  const { alat = [] } = useAlat() || {};
  const [laporanTerbaru, setLaporanTerbaru] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("PDF");

  useEffect(() => {
    const savedLaporan = JSON.parse(localStorage.getItem("dataLaporan") || "[]");
    if (savedLaporan.length === 0) {
      const defaultLaporan = [
        { id: 1, nama: "Laporan Inventaris Awal", tanggal: "01 Mei 2024", tipe: "Inventaris", format: "PDF" },
      ];
      setLaporanTerbaru(defaultLaporan);
      localStorage.setItem("dataLaporan", JSON.stringify(defaultLaporan));
    } else {
      setLaporanTerbaru(savedLaporan);
    }
  }, []);

  const formatRupiah = (angka: any) => {
    if (!angka) return "Rp 0";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(angka));
  };

  const executeGenerate = (tipe: string, format: string, action = "download") => {
    let dataBaris: any[] = [];
    let kolomHead: string[] = [];
    let judul = "";

    // A. MENARIK DATA BERDASARKAN TIPE LAPORAN
    if (tipe === "Inventaris") {
      judul = "Laporan Inventaris Alat Kesehatan";
      kolomHead = ["No", "Nama Alat", "Kategori", "Lokasi", "Status", "Harga", "Tgl Pembelian"];
      dataBaris = alat.map((a: any, i: number) => [i + 1, a.nama, a.kategori, a.lokasi, a.status, formatRupiah(a.harga), a.tglBeli]);
    } 
    else if (tipe === "Maintenance") {
      judul = "Laporan Riwayat & Jadwal Maintenance";
      kolomHead = ["No", "Nama Alat", "Lokasi", "Jenis", "Teknisi", "Tanggal", "Status"];
      const jadwal = JSON.parse(localStorage.getItem("dataJadwal") || "[]");
      dataBaris = jadwal.map((j: any, i: number) => [i + 1, j.namaAlat, j.lokasi, j.jenis, j.teknisi, j.tanggal, j.status]);
    } 
    else if (tipe === "Keuangan") {
      judul = "Laporan Keuangan & Aset Alat Kesehatan";
      kolomHead = ["No", "Nama Alat", "Kategori", "Tgl Pembelian", "Harga Aset"];
      dataBaris = alat.map((a: any, i: number) => [i + 1, a.nama, a.kategori, a.tglBeli, formatRupiah(a.harga)]);
    } 
    else if (tipe === "Status") {
      judul = "Laporan Status Kondisi Alat";
      kolomHead = ["No", "Nama Alat", "Kategori", "Lokasi", "Status Saat Ini"];
      dataBaris = alat.map((a: any, i: number) => [i + 1, a.nama, a.kategori, a.lokasi, a.status]);
    }

    // B. PROSES PEMBUATAN FILE (PDF / EXCEL)
    if (format === "PDF") {
      try {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(judul, 14, 15);
        doc.setFontSize(10);
        doc.text(`Dicetak pada: ${new Date().toLocaleDateString("id-ID")}`, 14, 22);

        // Perbaikan cara pemanggilan autoTable
        autoTable(doc, {
          head: [kolomHead],
          body: dataBaris,
          startY: 28,
          theme: "grid",
          styles: { fontSize: 9 },
          headStyles: { fillColor: [37, 99, 235] } 
        });

        if (action === "print") {
          doc.autoPrint();
          window.open(doc.output("bloburl"), "_blank");
        } else {
          doc.save(`${judul}.pdf`);
        }
      } catch (error) {
        console.error("Gagal men-generate PDF:", error);
        alert("Terjadi kesalahan saat membuat PDF. Pastikan data tidak kosong.");
      }
    } 
    else if (format === "Excel") {
      try {
        const sheetData = [kolomHead, ...dataBaris];
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Laporan");
        XLSX.writeFile(workbook, `${judul}.xlsx`);
      } catch (error) {
        console.error("Gagal men-generate Excel:", error);
      }
    }

    // C. SIMPAN RIWAYAT LAPORAN KE TABEL BAWAH
    if (action === "download" && isModalOpen) {
      const bulanThn = new Date().toLocaleDateString("id-ID", { month: "short", year: "numeric" });
      const tglBuat = new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
      
      const newLaporan = {
        id: Date.now(),
        nama: `${judul} ${bulanThn}`,
        tanggal: tglBuat,
        tipe: tipe,
        format: format,
      };

      const updatedLaporan = [newLaporan, ...laporanTerbaru];
      setLaporanTerbaru(updatedLaporan);
      localStorage.setItem("dataLaporan", JSON.stringify(updatedLaporan));
      
      setIsModalOpen(false);
    }
  };

  const openGenerateModal = (tipeLaporan: string) => {
    setSelectedType(tipeLaporan);
    setSelectedFormat("PDF");
    setIsModalOpen(true);
  };

  const cards = [
    { title: "Inventaris", label: "Laporan Inventaris", desc: "Laporan lengkap semua alat kesehatan", icon: <FileText size={20} />, iconColor: "bg-blue-100 text-blue-600" },
    { title: "Maintenance", label: "Laporan Maintenance", desc: "Riwayat dan jadwal maintenance", icon: <BarChart2 size={20} />, iconColor: "bg-green-100 text-green-600" },
    { title: "Keuangan", label: "Laporan Keuangan", desc: "Analisis biaya dan investasi alat", icon: <TrendingUp size={20} />, iconColor: "bg-purple-100 text-purple-600" },
    { title: "Status", label: "Laporan Status Alat", desc: "Status kondisi semua alat", icon: <FileText size={20} />, iconColor: "bg-orange-100 text-orange-500" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Laporan</h1>
        <p className="text-slate-500 mt-1 text-sm">Generate dan kelola berbagai jenis laporan yang terintegrasi otomatis dengan data sistem.</p>
      </div>

      {/* CARD LAPORAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.iconColor}`}>
              {card.icon}
            </div>
            <h2 className="font-bold text-slate-800 mb-1">{card.label}</h2>
            <p className="text-sm text-slate-500 mb-6 flex-grow">{card.desc}</p>
            <button
              onClick={() => openGenerateModal(card.title)}
              className="w-full bg-[#111827] hover:bg-slate-800 text-white py-2.5 rounded-lg text-sm font-medium transition cursor-pointer"
            >
              Generate Laporan
            </button>
          </div>
        ))}
      </div>

      {/* TABEL LAPORAN TERBARU */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">Laporan Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="text-left px-6 py-4">NAMA LAPORAN</th>
                <th className="text-left px-6 py-4">TANGGAL DIBUAT</th>
                <th className="text-left px-6 py-4">TIPE</th>
                <th className="text-left px-6 py-4">FORMAT</th>
                <th className="text-left px-6 py-4">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {laporanTerbaru.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-800 text-sm font-medium flex items-center gap-3">
                    <FileText size={18} className="text-slate-400" />
                    {item.nama}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{item.tanggal}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md text-xs font-medium">
                      {item.tipe}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm font-semibold">
                    <span className={item.format === "PDF" ? "text-red-500" : "text-green-600"}>{item.format}</span>
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => executeGenerate(item.tipe, item.format, "download")}
                      className="text-blue-500 hover:text-blue-700 transition cursor-pointer" title="Download Ulang"
                    >
                      <Download size={18} />
                    </button>
                    {item.format === "PDF" && (
                      <button
                        onClick={() => executeGenerate(item.tipe, item.format, "print")}
                        className="text-slate-600 hover:text-slate-800 transition cursor-pointer" title="Cetak Langsung"
                      >
                        <Printer size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PILIH FORMAT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Pengaturan Generate</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Anda akan meng-generate <b>Laporan {selectedType}</b> berdasarkan data terkini. Silakan pilih format output:
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedFormat("PDF")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition cursor-pointer ${
                    selectedFormat === "PDF" ? "border-red-500 bg-red-50 text-red-600" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <FileCode size={32} className="mb-2" />
                  <span className="font-bold">PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat("Excel")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition cursor-pointer ${
                    selectedFormat === "Excel" ? "border-green-500 bg-green-50 text-green-600" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <FileSpreadsheet size={32} className="mb-2" />
                  <span className="font-bold">Excel</span>
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-medium transition cursor-pointer">
                  Batal
                </button>
                <button 
                  onClick={() => executeGenerate(selectedType, selectedFormat, "download")} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download size={16} /> Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}