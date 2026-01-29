"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coninciden");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }
    if (data.user && data.user.identities?.length === 0) {
      setError("Este correo ya está registrado. Intenta iniciar sesión.");
      return;
    }

    alert("Revisa tu correo para confirmar tu cuenta.");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EAEFEF]">
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black absolute left-4 top-4 "
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white  rounded-xl shadow-sm">
        <h1 className="text-2xl text-center p-8 font-semibold">
          Registrar cuenta
        </h1>
        <form onSubmit={handleRegister}>
          <label className="text-black text-sm font-semibold pb-4">Name:</label>
          <input
            type="text"
            name="Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ingresa tu nombre"
            className="border border-gray-400 text-gray-400 w-full mb-4 p-2 rounded"
            required
          />
          <label className="text-black text-sm font-semibold pb-4">
            Email:
          </label>
          <input
            type="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            className="border border-gray-400 text-gray-400 w-full mb-4 p-2 rounded"
            required
          />
          <div className="relative">
            <label className="text-black text-sm font-semibold pb-4">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="border border-gray-400 text-gray-400 w-full mb-4 p-2 rounded"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <label className="text-black text-sm font-semibold pb-4">
              Confirm password:
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              className="border border-gray-400 text-gray-400 w-full mb-4 p-2 rounded"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <Eye className="h-5 w-5" />
              ) : (
                <EyeOff className="h-5 w-5" />
              )}
            </button>
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
          <button
            className="bg-[#7F8CAA] hover:bg-[#333446] text-white w-full py-2 rounded font-semibold cursor-pointer"
            type="submit"
          >
            Crear cuenta
          </button>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </form>
      </div>
    </div>
  );
}
