"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, TaskStatus } from "@/types";
import TaskCard from "./TaskCard";
import { useUpdateTask } from "@/hooks/useTasks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  bgColor: string;
}

const columns: Column[] = [
  {
    id: "TODO",
    title: "To Do",
    color: "#94a3b8",
    bgColor: "rgba(148,163,184,0.1)",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
    color: "#6366f1",
    bgColor: "rgba(99,102,241,0.1)",
  },
  {
    id: "DONE",
    title: "Done",
    color: "#22c55e",
    bgColor: "rgba(34,197,94,0.1)",
  },
];

interface SortableTaskCardProps {
  task: Task;
}

function SortableTaskCard({ task }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
}

interface KanbanBoardProps {
  tasks: Task[];
}

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { mutate: updateTask } = useUpdateTask();
  const { setCreateTaskModalOpen, setEditingTask } = useStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const getTasksByColumn = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = tasks.find((t) => t.id === event.active.id);
      setActiveTask(task ?? null);
    },
    [tasks]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveTask(null);

      if (!over) return;

      const activeTask = tasks.find((t) => t.id === active.id);
      if (!activeTask) return;

      // Check if dropped on a column
      const column = columns.find((c) => c.id === over.id);
      if (column && activeTask.status !== column.id) {
        updateTask({
          id: activeTask.id,
          data: { status: column.id },
        });
        return;
      }

      // Check if dropped on another task
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask && activeTask.status !== overTask.status) {
        updateTask({
          id: activeTask.id,
          data: { status: overTask.status },
        });
      }
    },
    [tasks, updateTask]
  );

  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setCreateTaskModalOpen(true);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column, columnIndex) => {
          const columnTasks = getTasksByColumn(column.id);

          return (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: columnIndex * 0.1 }}
              className="flex-shrink-0 w-80"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                  <h3 className="text-white font-semibold text-sm">
                    {column.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: column.bgColor,
                      color: column.color,
                    }}
                  >
                    {columnTasks.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 hover:bg-white/10"
                  onClick={() => handleAddTask(column.id)}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Droppable Column */}
              <SortableContext
                items={columnTasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  id={column.id}
                  className="min-h-[200px] space-y-3 rounded-2xl p-3 border border-dashed border-white/10 transition-colors"
                  style={{ backgroundColor: column.bgColor }}
                >
                  {columnTasks.length === 0 ? (
                    <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                      No tasks
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <SortableTaskCard key={task.id} task={task} />
                    ))
                  )}
                </div>
              </SortableContext>
            </motion.div>
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rotate-2">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
