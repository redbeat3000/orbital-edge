import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10"></div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-chart-2/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Rocket className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Start Your Mission Today</span>
        </div>

        <h2 className="text-5xl lg:text-6xl font-bold mb-6">
          Ready to access<br />Low Earth Orbit?
        </h2>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Join leading research institutions and startups leveraging on-orbit infrastructure. 
          Book your first payload slot and launch in weeks, not years.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2 text-base px-8" data-testid="button-cta-get-started">
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-base px-8 backdrop-blur-md bg-white/5 border-white/10" data-testid="button-cta-schedule-demo">
            Schedule Demo
          </Button>
        </div>

        <div className="mt-12 pt-12 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$8.9M", label: "Cost Savings" },
              { value: "18mo", label: "Time Reduction" },
              { value: "99.8%", label: "Mission Success" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} data-testid={`stat-cta-${index}`}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
