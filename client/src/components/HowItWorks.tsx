import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Filter",
    description: "Explore available payload slots from verified providers. Filter by service type, duration, price, and orbital parameters.",
  },
  {
    icon: Calendar,
    title: "Book & Configure",
    description: "Select your slot, configure your mission parameters, and schedule your launch window. Upload experiment code or data.",
  },
  {
    icon: Rocket,
    title: "Launch & Monitor",
    description: "Track your payload in real-time. Access telemetry data, execution logs, and request sample returns when ready.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to access Low Earth Orbit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`step-${index + 1}`}>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
              )}

              <Card className="hover-elevate transition-all duration-300 overflow-visible">
                <CardContent className="pt-6 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
