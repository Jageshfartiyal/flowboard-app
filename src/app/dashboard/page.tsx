"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import TopNav from "@/components/dashboard/TopNav";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useStore } from "@/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/dashboard/ProjectCard";
import TaskCard from "@/components/dashboard/TaskCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useStore as useSidebarStore } from "@/store/useStore";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { setCreateProjectModalOpen, setCreateTaskModalOpen } = useStore();
  const { sidebarCollapsed } = useSidebarStore();

  const completedTasks = tasks?.filter((t) => t.status === "DONE").length ?? 0;
  const inProgressTasks =
    tasks?.filter((t) => t.status === "IN_PROGRESS").length ?? 0;
  const todoTasks = tasks?.filter((t) => t.status === "TODO").length ?? 0;
  const overdueTasks =
    tasks?.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "DONE"
    ).length ?? 0;

  const recentTasks = tasks?.slice(0, 5) ?? [];
  const recentProjects = projects?.slice(0, 4) ?? [];

  const stats = [
    {
      label: "Total Projects",
      value: projects?.length ?? 0,
      icon: FolderOpen,
      color: "#6366f1",
      bgColor: "rgba(99,102,241,0.1)",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "#22c55e",
      bgColor: "rgba(34,197,94,0.1)",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "#6366f1",
      bgColor: "rgba(99,102,241,0.1)",
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color: "#f43f5e",
      bgColor: "rgba(244,63,94,0.1)",
    },
  ];

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div
      className="transition-all duration-300"
      style={{ paddingLeft: sidebarCollapsed ? "84px" : "256px" }}
    >
      <TopNav
        title="Overview"
        description={`Welcome back, ${firstName}!`}
      />

      <div className="pt-16 p-6">
        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {projectsLoading || tasksLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link href="/dashboard/projects" className="gap-1">
                    View All
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => setCreateProjectModalOpen(true)}
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  New
                </Button>
              </div>
            </div>

            {projectsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-2xl" />
                ))}
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="glass rounded-2xl p-12 border border-white/5 text-center border-dashed">
                <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No projects yet</p>
                <Button
                  variant="gradient"
                  onClick={() => setCreateProjectModalOpen(true)}
                >
                  Create your first project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>
              <Button
                variant="gradient"
                size="sm"
                onClick={() => setCreateTaskModalOpen(true)}
                className="gap-1"
                disabled={!projects?.length}
              >
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>

            {tasksLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
              </div>
            ) : recentTasks.length === 0 ? (
              <div className="glass rounded-2xl p-8 border border-white/5 text-center border-dashed">
                <CheckCircle2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No tasks yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
