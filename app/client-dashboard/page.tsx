"use client";
import { Profile } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const supabase = createClient();

  console.log("supabase", supabase);

  const [profile, setProfile] = useState<null | Profile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);

      if (!user) {
        redirect("/login");
      }

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    if (supabase) {
      getProfileSession();
    }
  }, [supabase]);

  console.log("profile", profile);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-4">Cargando...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-4 text-red-400">
          Error al obtener los datos de sesión
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Bienvenido {profile.full_name}</p>

      <form className="mt-4">
        <button
          type="submit"
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
