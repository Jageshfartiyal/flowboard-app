import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Pricing from "@/components/marketing/Pricing";
import { Check, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Pricing – FlowBoard",
  description: "Simple, transparent pricing for teams of all sizes.",
};

const faqs = [
  {
    q: "Can I change my plan later?",
    a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No contracts, no lock-ins. Cancel anytime and your data is yours.",
  },
  {
    q: "Do you offer discounts for nonprofits?",
    a: "Yes! We offer 50% off for nonprofits and educational institutions. Contact us to learn more.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export all your data before canceling. We keep your data for 30 days after cancellation.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Simple, honest <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No surprise charges. Pick the plan that works for your team.
          </p>
        </div>
      </section>

      <Pricing />

      {/* Feature Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Full feature comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-muted-foreground font-medium">
                    Feature
                  </th>
                  {["Starter", "Pro", "Enterprise"].map((plan) => (
                    <th
                      key={plan}
                      className="text-center py-4 px-6 text-white font-semibold"
                    >
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Projects", "3", "Unlimited", "Unlimited"],
                  ["Team members", "1", "10", "Unlimited"],
                  ["Storage", "1 GB", "50 GB", "Unlimited"],
                  ["Kanban boards", "Basic", "Advanced", "Advanced"],
                  ["Analytics", "—", "✓", "✓"],
                  ["Time tracking", "—", "✓", "✓"],
                  ["GitHub integration", "—", "✓", "✓"],
                  ["Custom fields", "—", "✓", "✓"],
                  ["API access", "—", "—", "✓"],
                  ["SSO/SAML", "—", "—", "✓"],
                  ["Audit logs", "—", "—", "✓"],
                  ["Dedicated support", "—", "—", "✓"],
                ].map(([feature, starter, pro, enterprise]) => (
                  <tr
                    key={feature}
                    className="border-b border-white/5 hover:bg-white/2"
                  >
                    <td className="py-4 px-6 text-muted-foreground text-sm">
                      {feature}
                    </td>
                    {[starter, pro, enterprise].map((value, i) => (
                      <td
                        key={i}
                        className="py-4 px-6 text-center text-sm text-white"
                      >
                        {value === "✓" ? (
                          <Check className="w-4 h-4 text-indigo-400 mx-auto" />
                        ) : value === "—" ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-indigo-400" />
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass rounded-xl p-6 border border-white/5">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
