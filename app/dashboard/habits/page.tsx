"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Habit = {
  id: string;
  name: string;
  start_time: string | null;
  duration_minutes: number;
};

export default function HabitsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("habits")
        .select("id, name, start_time, duration_minutes")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setHabits(data);
      }
      setLoading(false);
    };

    fetchHabits();
  }, [supabase]);

  if (loading) {
    return <p className="">Cargando hábitos...</p>;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => router.push("/dashboard/create-habits")}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black absolute left-4 top-4 "
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="text-center text-2xl font-semibold pb-4 text-[#333446]">
        Mis hábitos
      </h1>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-[#B8CFCE] rounded-2xl">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="bg-neutral-secondary-soft border-b border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Hábito
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Hora de inicio
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Duración
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {habits.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No tienes hábitos registrados
                </td>
              </tr>
            ) : (
              habits.map((habit) => (
                <tr
                  key={habit.id}
                  className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-t border-[#B8CFCE]"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {habit.name}
                  </th>
                  <td className="px-6 py-4">
                    {habit.start_time
                      ? ` ${habit.start_time}`
                      : "Sin hora definida"}
                  </td>
                  <td className="px-6 py-4">{habit.duration_minutes} min</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/habits/${habit.id}`}
                      className="text-sm font-bold text-[#333446] hover:underline"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
