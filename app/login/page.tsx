"use client";
import { createClient } from "@/utils/supabase/client";
import { traducirError } from "@/utils/traducirErrores";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function login() {
    const data = {
      email,
      password,
    };

    const { error } = await supabase.auth.signInWithPassword(data);
    console.log(error);

    if (error) {
      alert(traducirError(error.message));
    }

    router.push("/dashboard");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EAEFEF]">
      <div className="w-full max-w-md space-y-8 p-8  bg-white rounded-xl shadow-sm">
        <div>
          <h2 className="text-center text-3xl font-bold">Iniciar sesión</h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="tu@email.com"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="tu contraseña"
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
          </div>

          <div className="flex gap-4">
            <button
              onClick={login}
              className="flex-1 rounded-md bg-[#7F8CAA] px-4 py-2 text-white hover:bg-[#333446]"
            >
              Iniciar sesión
            </button>
          </div>
          <div className="flex  justify-center items-center">
            <p className="pr-2 text-gray-400 text-sm font-light pt-2">
              ¿No tienes cuenta?
            </p>
            <Link href="/register">
              <p className="text-black font-bold text-sm  underline  pt-2">
                Registrar cuenta
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
