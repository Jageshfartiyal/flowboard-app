import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { Users, Target, Heart, Rocket } from "lucide-react";

export const metadata = {
  title: "About – FlowBoard",
  description: "Learn about the team behind FlowBoard and our mission.",
};

const values = [
  {
    icon: Target,
    title: "Focus on what matters",
    description:
      "We obsess over building features that genuinely help teams work better, not just features that look good on a marketing page.",
    color: "#6366f1",
  },
  {
    icon: Users,
    title: "Built for teams",
    description:
      "Every decision we make is with real teams in mind. We eat our own dog food — FlowBoard is built using FlowBoard.",
    color: "#8b5cf6",
  },
  {
    icon: Heart,
    title: "Delightfully simple",
    description:
      "Powerful doesn't have to mean complex. We work hard to make FlowBoard feel intuitive for everyone on day one.",
    color: "#ec4899",
  },
  {
    icon: Rocket,
    title: "Ship fast, iterate",
    description:
      "We believe in releasing early and iterating based on real feedback. Our customers drive our roadmap.",
    color: "#f59e0b",
  },
];

const team = [
  { name: "Alex Chen", role: "CEO & Co-founder", avatar: "AC" },
  { name: "Sarah Kim", role: "CTO & Co-founder", avatar: "SK" },
  { name: "Marcus Lee", role: "Head of Design", avatar: "ML" },
  { name: "Priya Patel", role: "Head of Engineering", avatar: "PP" },
  { name: "Tom Wilson", role: "Head of Growth", avatar: "TW" },
  { name: "Lisa Zhang", role: "Head of Product", avatar: "LZ" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              We&apos;re building the future of
              <br />
              <span className="gradient-text">teamwork</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              FlowBoard was born from frustration. We were tired of switching between
              5 different tools to manage our projects. So we built the tool we always
              wanted: beautiful, fast, and actually powerful.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2023, FlowBoard started as a weekend project by two
                  engineers who were tired of their project management tools feeling
                  like bureaucratic nightmares.
                </p>
                <p>
                  What started as a simple Kanban board has grown into a comprehensive
                  platform used by over 50,000 teams worldwide. We&apos;ve raised $12M to
                  help us build the future of work.
                </p>
                <p>
                  Today, we&apos;re a team of 40 passionate people spread across 12 countries,
                  all working together to make work feel less like work.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Team members", value: "40+" },
                { label: "Countries", value: "12" },
                { label: "Customers", value: "50K+" },
                { label: "Founded", value: "2023" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-6 border border-white/5">
                  <div className="text-4xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass rounded-2xl p-6 border border-white/5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Meet the team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="glass rounded-2xl p-6 border border-white/5 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                  {member.avatar}
                </div>
                <div className="text-white font-medium text-sm">{member.name}</div>
                <div className="text-muted-foreground text-xs mt-1">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
