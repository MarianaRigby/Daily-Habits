// "use client";

// import { useState } from "react";
// import SideBar from "./components/SideBar";

// const [open, setOpen] = useState(false);

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {open && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           {/* fondo oscuro */}
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setOpen(false)}
//           />

//           {/* sidebar */}
//           <aside className="relative w-64 h-full bg-white">
//             <SideBar />
//           </aside>
//         </div>
//       )}

//       <aside className="hidden lg:block w-64 bg-white border-r">
//         <SideBar />
//       </aside>
//       <header className="lg:hidden p-4 bg-white border-b">
//         <button onClick={() => setOpen(true)} className="text-xl">
//           ☰
//         </button>
//       </header>
//       <main className="flex-1 p-8">{children}</main>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import SideBar from "./components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block w-64 bg-white border-r">
        <SideBar />
      </aside>

      {/* Sidebar mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="relative w-64 h-full bg-white">
            <SideBar />
          </aside>
        </div>
      )}

      {/* Contenido */}
      <div className="flex-1">
        <header className="lg:hidden p-4 bg-white border-b">
          <button onClick={() => setOpen(true)}>☰</button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
