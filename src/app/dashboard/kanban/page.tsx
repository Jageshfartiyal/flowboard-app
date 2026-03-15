"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter } from "lucide-react";
import TopNav from "@/components/dashboard/TopNav";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import { useStore } from "@/store/useStore";
import dynamic from "next/dynamic";
const KanbanBoard = dynamic(() => import("@/components/dashboard/KanbanBoard"), { ssr: false });
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function KanbanPage() {
  const { data: projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const { data: tasks, isLoading } = useTasks(
    selectedProject !== "all" ? selectedProject : undefined
  );
  const { setCreateTaskModalOpen, setEditingTask, sidebarCollapsed } = useStore();

  const handleNewTask = () => {
    setEditingTask(null);
    setCreateTaskModalOpen(true);
  };

  return (
    <div
      className="transition-all duration-300"
      style={{ paddingLeft: sidebarCollapsed ? "84px" : "256px" }}
    >
      <TopNav title="Kanban Board" description="Drag and drop tasks between columns" />

      <div className="pt-16 p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-48 bg-white/5 border-white/10">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects?.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="gradient"
            onClick={handleNewTask}
            className="gap-2"
            disabled={!projects?.length}
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {/* Task stats */}
        {tasks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-6 mb-6 text-sm"
          >
            {[
              { label: "To Do", count: tasks.filter((t) => t.status === "TODO").length, color: "#94a3b8" },
              { label: "In Progress", count: tasks.filter((t) => t.status === "IN_PROGRESS").length, color: "#6366f1" },
              { label: "Done", count: tasks.filter((t) => t.status === "DONE").length, color: "#22c55e" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                <span className="text-muted-foreground">{stat.label}:</span>
                <span className="text-white font-medium">{stat.count}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Board */}
        {isLoading ? (
          <div className="flex gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <Skeleton className="h-8 w-32 mb-4 rounded-xl" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-28 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <KanbanBoard tasks={tasks ?? []} />
        )}

        {/* Empty state */}
        {!isLoading && (!tasks || tasks.length === 0) && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              No tasks yet. Create your first task!
            </p>
            <Button
              variant="gradient"
              onClick={handleNewTask}
              disabled={!projects?.length}
            >
              {projects?.length ? "Create Task" : "Create a project first"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
