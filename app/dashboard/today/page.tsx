"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TodayPage() {
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedHabits, setCompletedHabits] = useState<Set<string>>(
    new Set()
  );

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      console.log("userData", userData);
      if (userError || !userData.user) {
        console.error("No hay usuario logueado");
        return;
      }
      const userId = userData.user.id;
      setUserId(userId);

      const { data: habitsData, error: habitsError } = await supabase
        .from("habits")
        .select("*")
        .order("created_at", { ascending: true });

      if (habitsError) {
        console.error(habitsError);
        return;
      }
      setHabits(habitsData ?? []);

      const { data: logsData, error: logsError } = await supabase
        .from("habit_logs")
        .select("habit_id")
        .eq("date", today);

      if (logsError) {
        console.error("Error logs:", logsError);
        return;
      }
      const completed = new Set((logsData ?? []).map((log) => log.habit_id)); //['id1','id2']

      setCompletedHabits(completed);
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleHabit = async (habitId: string) => {
    const isCompleted = completedHabits.has(habitId);

    if (isCompleted) {
      const { error } = await supabase
        .from("habit_logs")
        .delete()
        .eq("habit_id", habitId)
        .eq("date", today);

      if (!error) {
        const updated = new Set(completedHabits);
        updated.delete(habitId);
        setCompletedHabits(updated);
      }
    } else {
      const { error } = await supabase.from("habit_logs").insert({
        habit_id: habitId,
        user_id: userId,
        date: today,
      });

      if (!error) {
        setCompletedHabits(new Set([...completedHabits, habitId]));
      }
    }
  };
  if (loading) {
    return <p>Cargando hábitos...</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-center font-semibold text-3xl text-[#333446]">
        Daily Habits
      </h1>
      {habits.length === 0 && <p>No tienes hábitos aún</p>}
      {habits.map((habit) => (
        <div
          className="flex  gap-3 items-center rounded-3xl p-4 bg-[#f7fefe]"
          key={habit.id}
        >
          <input
            type="checkbox"
            checked={completedHabits.has(habit.id)}
            onChange={() => toggleHabit(habit.id)}
            className="rounded h-4 w-4 accent-[#7F8CAA] cursor-pointer transition border 
    duration-200
    hover:scale-110"
          />
          <div>
            <p className="font-bold text-md text-[#333446]">{habit.name}</p>

            {(habit.start_time || habit.duration) && (
              <p className="font-light text-sm text-gray-500">
                {habit.start_time}{" "}
                {habit.duration_minutes && `· ${habit.duration_minutes} min`}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
