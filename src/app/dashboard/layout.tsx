import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/dashboard/Sidebar"), { ssr: false });
const CreateProjectModal = dynamic(() => import("@/components/dashboard/CreateProjectModal"), { ssr: false });
const CreateTaskModal = dynamic(() => import("@/components/dashboard/CreateTaskModal"), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="min-h-screen transition-all duration-200">
        {children}
      </main>
      <CreateProjectModal />
      <CreateTaskModal />
    </div>
  );
}
