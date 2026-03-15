"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/useStore";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

const colorOptions = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
  "#f97316", "#eab308", "#22c55e", "#14b8a6",
  "#06b6d4", "#3b82f6", "#a78bfa", "#f472b6",
];

export default function CreateProjectModal() {
  const {
    createProjectModalOpen,
    setCreateProjectModalOpen,
    editingProject,
    setEditingProject,
  } = useStore();

  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const [form, setForm] = useState({
    name: "",
    description: "",
    color: "#6366f1",
  });

  const isEditing = !!editingProject;
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (editingProject) {
      setForm({
        name: editingProject.name,
        description: editingProject.description ?? "",
        color: editingProject.color,
      });
    } else {
      setForm({ name: "", description: "", color: "#6366f1" });
    }
  }, [editingProject]);

  const handleClose = () => {
    setCreateProjectModalOpen(false);
    setEditingProject(null);
    setForm({ name: "", description: "", color: "#6366f1" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    if (isEditing && editingProject) {
      updateProject(
        { id: editingProject.id, data: form },
        { onSuccess: handleClose }
      );
    } else {
      createProject(form, { onSuccess: handleClose });
    }
  };

  return (
    <Dialog open={createProjectModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Project" : "Create New Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name *</Label>
            <Input
              id="project-name"
              placeholder="My awesome project"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <textarea
              id="project-description"
              placeholder="What is this project about?"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Project Color</Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm({ ...form, color })}
                  className="w-7 h-7 rounded-lg transition-transform hover:scale-110 relative"
                  style={{ backgroundColor: color }}
                >
                  {form.color === color && (
                    <motion.div
                      layoutId="selectedColor"
                      className="absolute inset-0 rounded-lg ring-2 ring-white ring-offset-2 ring-offset-background"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 glass rounded-xl border border-white/5">
            <div
              className="w-10 h-10 rounded-xl"
              style={{ backgroundColor: `${form.color}30` }}
            />
            <div>
              <div className="text-white text-sm font-medium">
                {form.name || "Project Name"}
              </div>
              <div className="text-muted-foreground text-xs">
                {form.description || "No description"}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditing ? "Update Project" : "Create Project"}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
