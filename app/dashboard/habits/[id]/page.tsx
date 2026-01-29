"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HabitDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [habit, setHabit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabit = async () => {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        router.push("/habits");
        return;
      }

      setHabit(data);
      setLoading(false);
    };

    fetchHabit();
  }, [id]);

  if (loading) {
    return <p>Cargando hábito...</p>;
  }

  if (!habit) {
    return <p>No se encontró el hábito</p>;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => router.push("/dashboard/habits")}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black absolute left-4 top-4 "
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div className="mx-auto max-w-xl space-y-6">
        <div className="rounded-lg border border-[#B8CFCE] p-6">
          <h1 className="text-2xl font-semibold">{habit.name}</h1>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Hora de inicio:</span>{" "}
              {habit.start_time}
            </p>
            <p>
              <span className="font-medium">Duración:</span>{" "}
              {habit.duration_minutes} minutos
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/dashboard/habits/${habit.id}/edit-habits`}
            className="rounded-md bg-[#7F8CAA] hover:bg-[#333446] px-4 py-2 text-sm text-white"
          >
            Editar
          </Link>

          <button
            onClick={async () => {
              const ok = confirm("¿Seguro que quieres eliminar este hábito?");
              if (!ok) return;

              await supabase.from("habits").delete().eq("id", habit.id);

              router.push("/dashboard/habits");
              router.refresh();
            }}
            className="rounded-md bg-[#A34343]  hover:bg-[#7a2828] px-4 py-2 text-sm text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
