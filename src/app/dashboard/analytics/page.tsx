"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import TopNav from "@/components/dashboard/TopNav";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useStore } from "@/store/useStore";

const COLORS = {
  TODO: "#94a3b8",
  IN_PROGRESS: "#6366f1",
  DONE: "#22c55e",
  LOW: "#22c55e",
  MEDIUM: "#eab308",
  HIGH: "#f97316",
  URGENT: "#f43f5e",
};

export default function AnalyticsPage() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { sidebarCollapsed } = useStore();

  const isLoading = projectsLoading || tasksLoading;

  // Task status distribution
  const statusData = [
    { name: "To Do", value: tasks?.filter((t) => t.status === "TODO").length ?? 0, color: COLORS.TODO },
    { name: "In Progress", value: tasks?.filter((t) => t.status === "IN_PROGRESS").length ?? 0, color: COLORS.IN_PROGRESS },
    { name: "Done", value: tasks?.filter((t) => t.status === "DONE").length ?? 0, color: COLORS.DONE },
  ];

  // Priority distribution
  const priorityData = [
    { name: "Low", value: tasks?.filter((t) => t.priority === "LOW").length ?? 0, color: COLORS.LOW },
    { name: "Medium", value: tasks?.filter((t) => t.priority === "MEDIUM").length ?? 0, color: COLORS.MEDIUM },
    { name: "High", value: tasks?.filter((t) => t.priority === "HIGH").length ?? 0, color: COLORS.HIGH },
    { name: "Urgent", value: tasks?.filter((t) => t.priority === "URGENT").length ?? 0, color: COLORS.URGENT },
  ];

  // Tasks per project
  const projectTaskData = projects?.map((p) => ({
    name: p.name.length > 12 ? p.name.slice(0, 12) + "..." : p.name,
    total: p._count?.tasks ?? 0,
    completed: p.tasks?.filter((t) => t.status === "DONE").length ?? 0,
  })) ?? [];

  // Activity over last 7 days (mock data based on tasks)
  const activityData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayTasks = tasks?.filter((t) => {
      const taskDate = new Date(t.createdAt);
      return taskDate.toDateString() === date.toDateString();
    }).length ?? 0;
    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      tasks: dayTasks,
    };
  });

  const completionRate =
    tasks && tasks.length > 0
      ? Math.round((tasks.filter((t) => t.status === "DONE").length / tasks.length) * 100)
      : 0;

  const stats = [
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "#6366f1",
    },
    {
      label: "Tasks Done",
      value: tasks?.filter((t) => t.status === "DONE").length ?? 0,
      icon: CheckCircle2,
      color: "#22c55e",
    },
    {
      label: "In Progress",
      value: tasks?.filter((t) => t.status === "IN_PROGRESS").length ?? 0,
      icon: Clock,
      color: "#6366f1",
    },
    {
      label: "High Priority",
      value: tasks?.filter((t) => t.priority === "HIGH" || t.priority === "URGENT").length ?? 0,
      icon: AlertCircle,
      color: "#f43f5e",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 border border-white/10 text-sm">
          <p className="text-white font-medium mb-1">{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ color: p.color || p.fill }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="transition-all duration-300"
      style={{ paddingLeft: sidebarCollapsed ? "84px" : "256px" }}
    >
      <TopNav title="Analytics" description="Track your team's performance" />

      <div className="pt-16 p-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {isLoading ? <Skeleton className="h-8 w-16" /> : stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5"
          >
            <h3 className="text-white font-semibold mb-6">
              Task Activity (Last 7 Days)
            </h3>
            {isLoading ? (
              <Skeleton className="h-48" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="tasks"
                    stroke="#6366f1"
                    fill="url(#colorTasks)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-white/5"
          >
            <h3 className="text-white font-semibold mb-6">Task Status</h3>
            {isLoading ? (
              <Skeleton className="h-48" />
            ) : (
              <div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {statusData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                        <span className="text-muted-foreground">{d.name}</span>
                      </div>
                      <span className="text-white font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Projects Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5"
          >
            <h3 className="text-white font-semibold mb-6">Tasks per Project</h3>
            {isLoading ? (
              <Skeleton className="h-48" />
            ) : projectTaskData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
                No project data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={projectTaskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="total" name="Total" fill="#6366f1" radius={4} />
                  <Bar dataKey="completed" name="Completed" fill="#22c55e" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Priority Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 border border-white/5"
          >
            <h3 className="text-white font-semibold mb-6">Priority Breakdown</h3>
            {isLoading ? (
              <Skeleton className="h-48" />
            ) : (
              <div className="space-y-4">
                {priorityData.map((d) => {
                  const total = tasks?.length ?? 1;
                  const percentage = total > 0 ? (d.value / total) * 100 : 0;
                  return (
                    <div key={d.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{d.name}</span>
                        <span className="text-white font-medium">{d.value}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: d.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
