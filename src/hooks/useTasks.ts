"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Task, CreateTaskInput, UpdateTaskInput } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { DEMO_TASKS } from "@/lib/demo-data";

export function useTasks(projectId?: string) {
  return useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      const url = projectId ? `/api/tasks?projectId=${projectId}` : "/api/tasks";
      const { data } = await axios.get(url);
      if (data.length > 0) return data;
      // Show demo data filtered by project if needed
      return projectId
        ? DEMO_TASKS.filter((t) => t.projectId === projectId)
        : DEMO_TASKS;
    },
    staleTime: 30_000,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      const { data } = await axios.post("/api/tasks", input);
      return data as Task;
    },
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Task created", description: `"${newTask.title}" has been added.` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create task.", variant: "destructive" });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTaskInput }) => {
      const response = await axios.patch(`/api/tasks/${id}`, data);
      return response.data as Task;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update task.", variant: "destructive" });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/tasks/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Task deleted", description: "Task has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete task.", variant: "destructive" });
    },
  });
}
