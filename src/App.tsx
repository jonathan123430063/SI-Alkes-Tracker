import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import DataAlat from "./pages/DataAlat";
import Maintenance from "./pages/Maintenance";
import Laporan from "./pages/Laporan.tsx";
import Tracking from "./pages/Tracking";
import Riwayat from "./pages/Riwayat";
import Login from "./pages/Login";
import Notifikasi from "./pages/Notifikasi";

export default function App() {

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("login") === "true"
  );

  // LOGIN
  if (!isLogin) {

    return (

      <Login
        onLogin={() =>
          setIsLogin(true)
        }
      />

    );
  }

  return (

    <BrowserRouter>

      <div className="flex bg-[#F1F5F9] min-h-screen">

        {/* SIDEBAR */}
        <Sidebar
          onLogout={() => {

            localStorage.removeItem(
              "login"
            );

            setIsLogin(false);

          }}
        />

        {/* CONTENT */}
        <div className="ml-[300px] w-full p-10">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/data-alat"
              element={<DataAlat />}
            />

            <Route
              path="/maintenance"
              element={<Maintenance />}
            />

            <Route
              path="/laporan"
              element={<Laporan />}
            />

            <Route
              path="/riwayat"
              element={<Riwayat />}
            />

            <Route
              path="/notifikasi"
              element={<Notifikasi />}
            />

            <Route
              path="/tracking"
              element={<Tracking />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}