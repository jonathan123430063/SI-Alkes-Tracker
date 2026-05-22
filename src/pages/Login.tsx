import { useState } from "react";

export default function Login({
  onLogin,
}: any) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = () => {

    if (
      username === "admin" &&
      password === "123"
    ) {

      localStorage.setItem(
        "login",
        "true"
      );

      onLogin();

    } else {

      alert(
        "Username atau password salah!"
      );

    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[450px]">

        <h1 className="text-4xl font-bold text-center mb-2">

          SI-ALKES

        </h1>

        <p className="text-center text-gray-500 mb-10">

          Sistem Informasi Alat Kesehatan

        </p>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full border p-4 rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-4 rounded-2xl"
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700"
          >

            Login

          </button>

        </div>

        <div className="mt-8 text-center text-gray-500">

          admin / 123

        </div>

      </div>

    </div>
  );
}