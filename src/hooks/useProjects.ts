"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project, CreateProjectInput, UpdateProjectInput } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { DEMO_PROJECTS } from "@/lib/demo-data";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axios.get("/api/projects");
      // Show demo data when there are no real projects yet
      return data.length > 0 ? data : DEMO_PROJECTS;
    },
    staleTime: 30_000,
  });
}

export function useProject(id: string) {
  return useQuery<Project>({
    queryKey: ["projects", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/projects/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 30_000,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      const { data } = await axios.post("/api/projects", input);
      return data as Project;
    },
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Project created", description: `"${newProject.name}" has been created.`, variant: "success" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create project.", variant: "destructive" });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProjectInput }) => {
      const response = await axios.patch(`/api/projects/${id}`, data);
      return response.data as Project;
    },
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", updatedProject.id] });
      toast({ title: "Project updated", description: "Changes saved successfully.", variant: "success" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update project.", variant: "destructive" });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/projects/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({ title: "Project deleted", description: "Project and its tasks have been deleted.", variant: "success" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
    },
  });
}
