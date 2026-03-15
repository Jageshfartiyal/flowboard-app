"use client";

import { motion } from "framer-motion";
import { Plus, FolderOpen, Search } from "lucide-react";
import TopNav from "@/components/dashboard/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/hooks/useProjects";
import { useStore } from "@/store/useStore";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { useState } from "react";
import { useStore as useSidebarStore } from "@/store/useStore";

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const { setCreateProjectModalOpen } = useStore();
  const { sidebarCollapsed } = useSidebarStore();
  const [search, setSearch] = useState("");

  const filteredProjects = projects?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div
      className="transition-all duration-300"
      style={{ paddingLeft: sidebarCollapsed ? "84px" : "256px" }}
    >
      <TopNav title="Projects" description="Manage all your projects" />

      <div className="pt-16 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white/5 border-white/10"
            />
          </div>
          <Button
            variant="gradient"
            onClick={() => setCreateProjectModalOpen(true)}
            className="gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Stats bar */}
        {!isLoading && projects && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6 text-sm text-muted-foreground"
          >
            <span>{projects.length} total projects</span>
            <span>•</span>
            <span>
              {projects.reduce((sum, p) => sum + (p._count?.tasks ?? 0), 0)}{" "}
              total tasks
            </span>
          </motion.div>
        )}

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-6">
              <FolderOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {search ? "No projects found" : "No projects yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {search
                ? "Try a different search term"
                : "Create your first project to get started"}
            </p>
            {!search && (
              <Button
                variant="gradient"
                onClick={() => setCreateProjectModalOpen(true)}
              >
                Create Your First Project
              </Button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
