"use client";

import { motion } from "framer-motion";
import {
  Kanban,
  BarChart3,
  Users,
  Zap,
  Shield,
  Clock,
  Bell,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: Kanban,
    title: "Visual Kanban Boards",
    description:
      "Drag and drop tasks across customizable columns. Visualize your workflow and identify bottlenecks instantly.",
    color: "#6366f1",
    gradient: "from-indigo-500/20 to-indigo-600/5",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track team velocity, completion rates, and project health with beautiful real-time dashboards.",
    color: "#8b5cf6",
    gradient: "from-purple-500/20 to-purple-600/5",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite team members, assign tasks, and collaborate in real-time with comments and activity feeds.",
    color: "#ec4899",
    gradient: "from-pink-500/20 to-pink-600/5",
  },
  {
    icon: Zap,
    title: "AI-Powered Automation",
    description:
      "Automate repetitive tasks, get smart suggestions, and let AI help you prioritize what matters most.",
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-600/5",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption, SSO support, and granular permission controls.",
    color: "#10b981",
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Built-in time tracking with detailed reports. Know exactly where your team spends their time.",
    color: "#06b6d4",
    gradient: "from-cyan-500/20 to-cyan-600/5",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Stay in the loop with intelligent notifications. Get alerted on what matters, when it matters.",
    color: "#f43f5e",
    gradient: "from-rose-500/20 to-rose-600/5",
  },
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description:
      "Connect your repositories, link PRs to tasks, and automatically update task status from commits.",
    color: "#a78bfa",
    gradient: "from-violet-500/20 to-violet-600/5",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-950/10 to-background" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-6">
            <Zap className="w-4 h-4" />
            <span>Packed with powerful features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need to
            <br />
            <span className="gradient-text">ship faster</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From solo developers to enterprise teams, FlowBoard scales with you.
            All the tools you need, none of the complexity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative glass rounded-2xl p-6 border border-white/5 bg-gradient-to-br ${feature.gradient} hover:border-white/10 transition-all duration-300 group cursor-default`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon
                  className="w-6 h-6"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
