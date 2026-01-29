import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export async function logout() {
  "use server";
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log("profile", profile);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Bienvenid@ {profile.full_name}</p>

      <form action={logout} className="mt-4">
        <button
          type="submit"
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 cursor-pointer"
        >
          Cerrar sesión
        </button>
      </form>
      <Link href={"/dashboard/create-habits"}>
        <button className="rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-800 cursor-pointer">
          Crear Hábitos
        </button>
      </Link>
    </div>
  );
}
