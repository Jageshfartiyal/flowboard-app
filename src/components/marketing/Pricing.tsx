"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: 0,
    period: "forever",
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 3 projects",
      "10 tasks per project",
      "Basic Kanban board",
      "1 team member",
      "7-day activity history",
      "Email support",
    ],
    cta: "Get Started Free",
    href: "/auth/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 12,
    period: "per month",
    description: "For growing teams and serious projects",
    features: [
      "Unlimited projects",
      "Unlimited tasks",
      "Advanced Kanban & List views",
      "Up to 10 team members",
      "Advanced analytics",
      "GitHub integration",
      "Time tracking",
      "Priority support",
      "90-day activity history",
      "Custom fields",
    ],
    cta: "Start Pro Trial",
    href: "/auth/signup?plan=pro",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: 49,
    period: "per month",
    description: "For large teams with advanced needs",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO & SAML",
      "Advanced security",
      "Custom workflows",
      "API access",
      "Dedicated success manager",
      "99.9% SLA",
      "Custom integrations",
      "Audit logs",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 relative" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-sm text-indigo-300 mb-6">
            <Star className="w-4 h-4" />
            <span>Simple, transparent pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose your <span className="gradient-text">plan</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free, scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "relative rounded-2xl p-8 transition-all duration-300",
                plan.highlighted
                  ? "gradient-border glow-purple bg-gradient-to-b from-indigo-950/50 to-purple-950/50"
                  : "glass border border-white/5"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <Button
                asChild
                className="w-full mb-8"
                variant={plan.highlighted ? "gradient" : "outline"}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-12"
        >
          All plans include a 14-day free trial. No credit card required.
          <br />
          Questions?{" "}
          <Link href="/contact" className="text-indigo-400 hover:text-indigo-300">
            Talk to sales
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
