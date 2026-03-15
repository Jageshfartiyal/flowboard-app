import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Features from "@/components/marketing/Features";
import {
  Kanban,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Features – FlowBoard",
  description: "Explore all the powerful features that make FlowBoard the best project management tool.",
};

const detailedFeatures = [
  {
    icon: Kanban,
    title: "Smart Kanban Boards",
    description:
      "Our Kanban boards are built for speed. Drag tasks between columns, create custom workflows, add labels, set priorities, and watch your WIP limits keep your team focused.",
    highlights: [
      "Unlimited custom columns",
      "Drag-and-drop reordering",
      "WIP limits",
      "Swimlanes",
      "Card aging",
      "Board templates",
    ],
    color: "#6366f1",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description:
      "Get deep insights into your team's performance. Track velocity, identify bottlenecks, forecast delivery dates, and generate beautiful reports for stakeholders.",
    highlights: [
      "Burndown charts",
      "Velocity tracking",
      "Team performance",
      "Custom reports",
      "Export to CSV/PDF",
      "Real-time updates",
    ],
    color: "#8b5cf6",
  },
  {
    icon: Zap,
    title: "Automations",
    description:
      "Create powerful automations without writing code. When a task is completed, notify the team. When a due date passes, escalate priority. The possibilities are endless.",
    highlights: [
      "Trigger-based rules",
      "Slack/Teams integration",
      "Email notifications",
      "Webhook support",
      "Conditional logic",
      "Scheduled automations",
    ],
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Your data is safe with us. SOC 2 Type II certified, GDPR compliant, with enterprise-grade security features that give IT teams peace of mind.",
    highlights: [
      "SOC 2 Type II certified",
      "GDPR compliant",
      "SSO/SAML support",
      "2FA enforcement",
      "Audit logs",
      "Data encryption at rest",
    ],
    color: "#10b981",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-sm text-indigo-300 mb-6">
            <Zap className="w-4 h-4" />
            <span>Features built for modern teams</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Every feature you need
            <br />
            <span className="gradient-text">nothing you don&apos;t</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            FlowBoard is purpose-built for software teams. Every feature is
            thoughtfully designed to reduce friction and maximize flow.
          </p>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {detailedFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-16 items-center`}
              >
                <div className="flex-1">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon
                      className="w-7 h-7"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3">
                    {feature.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: feature.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="glass rounded-2xl border border-white/5 p-8 aspect-video flex items-center justify-center">
                    <feature.icon
                      className="w-32 h-32 opacity-10"
                      style={{ color: feature.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Features />

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to try all these features?
          </h2>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
