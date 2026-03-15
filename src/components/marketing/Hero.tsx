"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const stats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Tasks Completed", value: "2M+", icon: Zap },
  { label: "Rating", value: "4.9/5", icon: Star },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-60">
        <ThreeScene />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      <div className="absolute inset-0 bg-gradient-radial from-indigo-950/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-sm text-indigo-500 dark:text-indigo-300 mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>Now with AI-powered task suggestions</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Manage Projects</span>
          <br />
          <span className="gradient-text">Like Never Before</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10"
        >
          FlowBoard combines intelligent task management, real-time collaboration,
          and stunning visual workflows to help your team ship faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button asChild variant="gradient" size="xl" className="group animate-pulse-glow">
            <Link href="/auth/signup">
              Start for Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="#demo" className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="flex items-center gap-2 text-3xl font-bold gradient-text">
                <stat.icon className="w-6 h-6 text-indigo-400" />
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="glass gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 max-w-5xl mx-auto">
            <div className="bg-black/30 dark:bg-black/40 p-3 flex items-center gap-2 border-b border-black/10 dark:border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-xs text-muted-foreground">
                app.flowboard.io/dashboard
              </div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-indigo-100/80 to-purple-100/80 dark:from-indigo-950/50 dark:to-purple-950/50 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 p-8 w-full max-w-3xl">
                {["Todo", "In Progress", "Done"].map((col, i) => (
                  <div key={col} className="glass rounded-xl p-4">
                    <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                      {col}
                    </div>
                    {[1, 2, 3].slice(0, 3 - i).map((j) => (
                      <div
                        key={j}
                        className="glass rounded-lg p-3 mb-2 border-l-2"
                        style={{
                          borderLeftColor: ["#6366f1", "#8b5cf6", "#22c55e"][i],
                        }}
                      >
                        <div className="w-full h-2 bg-white/20 rounded mb-2" />
                        <div className="w-2/3 h-2 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
