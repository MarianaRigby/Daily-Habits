"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft } from "lucide-react";

export default function EditHabitPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabit = async () => {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        router.push("/dashboard/habits");
        return;
      }

      setName(data.name);
      setStartTime(data.start_time ?? "");
      setDuration(data.duration_minutes ?? "");
      setLoading(false);
    };

    if (id) fetchHabit();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("habits")
      .update({
        name,
        start_time: startTime || null,
        duration_minutes: duration || null,
      })
      .eq("id", id);

    if (!error) {
      router.push(`/dashboard/habits/${id}`);
      router.refresh();
    }
  };

  if (loading) return <p>Cargando hábito...</p>;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => router.push(`/dashboard/habits/${id}`)}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black absolute left-4 top-4 "
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div className="mx-auto max-w-md border border-[#B8CFCE] p-4 rounded-md">
        <h1 className="mb-4 text-xl font-semibold text-[#333446] text-center">
          Editar hábito
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Hora de inicio:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Duración: (min)</label>
            <input
              type="number"
              step={10}
              min={0}
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="submit"
              className="rounded-md bg-[#7F8CAA] px-4 py-2 text-white hover:bg-[#333446] cursor-pointer"
            >
              Guardar cambios
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md  px-4 py-2 bg-[#A34343]  hover:bg-[#7a2828] text-white"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
