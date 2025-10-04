import { Button } from "@/components/ui/button";
import { ArrowRight, Satellite, Zap, Globe } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Satellite className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">LEO-as-a-Service Platform</span>
        </div>

        <h1 className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Launch less.<br />Do more in orbit.
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Modular, on-demand access to Low Earth Orbit resources. Book payload slots, run experiments, 
          and access on-orbit computing without launching a full satellite.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="gap-2 text-base px-8" data-testid="button-explore-marketplace">
            Explore Marketplace
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-base px-8 backdrop-blur-md bg-white/5 border-white/10" data-testid="button-view-demo">
            View Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Satellite, value: "24", label: "Active Payloads" },
            { icon: Globe, value: "48", label: "Provider Partners" },
            { icon: Zap, value: "156", label: "Missions Completed" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card/50 border border-card-border backdrop-blur-sm hover-elevate transition-all"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
