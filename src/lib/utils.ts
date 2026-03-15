import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "No date";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(d);
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "LOW":
      return "text-green-400 bg-green-400/10";
    case "MEDIUM":
      return "text-yellow-400 bg-yellow-400/10";
    case "HIGH":
      return "text-orange-400 bg-orange-400/10";
    case "URGENT":
      return "text-red-400 bg-red-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "TODO":
      return "text-slate-400 bg-slate-400/10";
    case "IN_PROGRESS":
      return "text-blue-400 bg-blue-400/10";
    case "DONE":
      return "text-green-400 bg-green-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "TODO":
      return "To Do";
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Done";
    default:
      return status;
  }
}

export function generateColor(): string {
  const colors = [
    "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
    "#f97316", "#eab308", "#22c55e", "#14b8a6",
    "#06b6d4", "#3b82f6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
