import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "OrbitalEdge cut our time to orbit by 18 months and reduced costs by 70%. We can now run multiple microgravity experiments per year.",
    author: "Dr. Sarah Chen",
    role: "Principal Investigator",
    organization: "MIT Space Research Lab",
  },
  {
    quote: "The on-orbit computing platform allowed us to process Earth observation data in real-time. Game-changing for disaster response applications.",
    author: "Marcus Rodriguez",
    role: "CTO",
    organization: "TerraVision Analytics",
  },
  {
    quote: "Sample return service exceeded expectations. Retrieved our biotech samples in pristine condition after 60 days in LEO.",
    author: "Prof. Amanda Wei",
    role: "Department Head",
    organization: "Stanford BioAstro Lab",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Trusted by Innovators</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Research labs and startups worldwide rely on OrbitalEdge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300 overflow-visible"
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold" data-testid={`text-author-${index}`}>{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-sm text-primary font-medium mt-1">{testimonial.organization}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
