"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function CreateHabitPage() {
  const supabase = createClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log({
        name,
        start_time: startTime,
        duration_minutes: Number(durationMinutes),
      });

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Usuario no autenticado");
        return;
      }
      const { error } = await supabase.from("habits").insert({
        user_id: user.id,
        name,
        start_time: startTime || null,
        duration_minutes: Number(durationMinutes),
      });

      if (error) {
        console.error("Error al guardar hábito:", error);
        return;
      }
      console.log("Hábito guardado correctamente");
      setName("");
      setStartTime("");
      setDurationMinutes("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black absolute left-4 top-4 "
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="text-center p-4 text-2xl font-semibold">Crear hábito</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-1">
          <div>
            <label className="text-md font-bold">Nombre del hábito: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ej.leer"
              className="border rounded-md  py-1 "
              required
            />
          </div>
          <div>
            <label className="text-md font-bold">Hora de inicio: </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded-md  py-1 "
            />
          </div>
          <div>
            <label className="text-md font-bold">Duración: </label>
            <input
              type="number"
              step={10}
              min={0}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              placeholder="30 min"
              className="border rounded-md  py-1 "
              required
            />
          </div>
        </div>
        <div className="flex justify-center gap-3 pt-4">
          <button
            type="submit"
            className="rounded-md bg-[#7F8CAA] px-4 py-2 text-white hover:bg-[#333446] cursor-pointer"
          >
            {" "}
            Guardar
          </button>
          <Link href={"/dashboard/habits"}>
            <button className="rounded-md bg-[#B8CFCE] px-4 py-2 text-white hover:bg-[#91C4C3] cursor-pointer">
              Hábitos
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
