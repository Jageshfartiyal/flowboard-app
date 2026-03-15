"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoreHorizontal, Trash2, Edit, FolderOpen } from "lucide-react";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteProject } from "@/hooks/useProjects";
import { useStore } from "@/store/useStore";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { mutate: deleteProject } = useDeleteProject();
  const { setEditingProject, setCreateProjectModalOpen } = useStore();

  const completedTasks =
    project.tasks?.filter((t) => t.status === "DONE").length ?? 0;
  const totalTasks = project._count?.tasks ?? 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setEditingProject(project);
    setCreateProjectModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(`Delete "${project.name}" and all its tasks?`)) {
      deleteProject(project.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link href={`/dashboard/projects?id=${project.id}`}>
        <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${project.color}20` }}
              >
                <FolderOpen className="w-5 h-5" style={{ color: project.color }} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm line-clamp-1">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-xs">
                  {formatDate(project.createdAt)}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/10 transition-all"
                >
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-400 focus:text-red-400"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-white font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, ${project.color}aa)`,
                }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
              </Badge>
              {completedTasks > 0 && (
                <Badge variant="success" className="text-xs">
                  {completedTasks} done
                </Badge>
              )}
            </div>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: project.color }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
