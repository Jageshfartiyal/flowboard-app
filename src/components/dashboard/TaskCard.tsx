"use client";

import { motion } from "framer-motion";
import { MoreHorizontal, Trash2, Edit, Calendar, Flag } from "lucide-react";
import { Task } from "@/types";
import { formatDate, getPriorityColor, getStatusColor, getStatusLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "@/hooks/useTasks";
import { useStore } from "@/store/useStore";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export default function TaskCard({ task, isDragging }: TaskCardProps) {
  const { mutate: deleteTask } = useDeleteTask();
  const { setEditingTask, setCreateTaskModalOpen } = useStore();

  const handleEdit = () => {
    setEditingTask(task);
    setCreateTaskModalOpen(true);
  };

  const handleDelete = () => {
    if (confirm(`Delete task "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "DONE";

  return (
    <motion.div
      layout
      className={`group glass rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-200 ${
        isDragging ? "shadow-2xl shadow-indigo-500/20 scale-105 border-indigo-500/30" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className="text-white font-medium text-sm leading-snug line-clamp-2 flex-1">
          {task.title}
        </h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-all shrink-0">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-400 focus:text-red-400"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Project Tag */}
      {task.project && (
        <div className="mb-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: `${task.project.color}20`,
              color: task.project.color,
            }}
          >
            {task.project.name}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            className={`text-xs ${getPriorityColor(task.priority)}`}
            variant="outline"
          >
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
          </Badge>
        </div>

        {task.dueDate && (
          <div
            className={`flex items-center gap-1 text-xs ${
              isOverdue ? "text-red-400" : "text-muted-foreground"
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
