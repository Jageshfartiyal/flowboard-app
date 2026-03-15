import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import Features from "@/components/marketing/Features";
import Pricing from "@/components/marketing/Pricing";
import Footer from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-950/5 to-background" />
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text">50,000+</span> teams worldwide
          </h2>
          <p className="text-muted-foreground text-lg mb-16">
            From startups to Fortune 500 companies
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "FlowBoard transformed how our team works. We ship 3x faster now and have complete visibility into everything.",
                author: "Sarah Chen",
                role: "CTO at TechCorp",
                avatar: "SC",
              },
              {
                quote:
                  "The Kanban board is incredible. Our designers and developers finally work in perfect sync.",
                author: "Marcus Johnson",
                role: "Product Lead at DesignCo",
                avatar: "MJ",
              },
              {
                quote:
                  "The analytics alone are worth it. We identified 3 major bottlenecks in our first week.",
                author: "Emily Rodriguez",
                role: "Eng Manager at StartupXYZ",
                avatar: "ER",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border border-white/5 text-left"
              >
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
          <div className="absolute inset-0 grid-bg opacity-30" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to transform your
            <br />
            <span className="gradient-text">workflow?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 50,000+ teams already using FlowBoard. Start free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-2xl shadow-indigo-500/30"
            >
              Start for Free Today
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg glass border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
