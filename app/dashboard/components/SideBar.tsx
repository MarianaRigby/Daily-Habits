import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function logout() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function Sidebar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  return (
    <aside className="w-64 bg-white  flex flex-col justify-between p-6">
      {/* Arriba */}
      <div>
        <h2 className="text-lg font-semibold">Bienvenid@</h2>
        <p className="text-sm text-gray-600 mt-1">{profile?.full_name}</p>

        <nav className="mt-8 flex flex-col gap-4">
          <Link
            href="/dashboard/create-habits"
            className="text-md font-bold text-[#7b95d1] hover:text-[#333446]"
          >
            Crear hábitos
          </Link>

          <Link
            href="/dashboard/habits"
            className="text-md font-bold text-[#7b95d1] hover:text-[#333446]"
          >
            Ver hábitos
          </Link>
          <Link
            href="/dashboard/today"
            className="text-md font-bold text-[#7b95d1] hover:text-[#333446]"
          >
            Hábitos diarios
          </Link>
        </nav>
      </div>

      {/* Abajo */}
      <form action={logout}>
        <button
          type="submit"
          className="w-full rounded-md px-4 py-2 text-white bg-[#A34343]  hover:bg-[#7a2828]"
        >
          Cerrar sesión
        </button>
      </form>
    </aside>
  );
}
