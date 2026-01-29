import SideBar from "./components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
