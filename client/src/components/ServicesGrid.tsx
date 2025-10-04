import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Thermometer, PackageCheck } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "On-Orbit Computing",
    description: "High-performance edge computing in LEO. Run AI models, process satellite imagery, or execute time-sensitive algorithms.",
    specs: ["Up to 64 vCPU", "GPU acceleration", "Low-latency uplink"],
  },
  {
    icon: HardDrive,
    title: "Data Storage",
    description: "Secure, redundant storage in orbit. Perfect for long-term data collection missions and distributed backups.",
    specs: ["Up to 10 TB capacity", "RAID redundancy", "256-bit encryption"],
  },
  {
    icon: Thermometer,
    title: "Thermal Cycling",
    description: "Test materials and components under extreme temperature variations. Essential for space-grade qualification.",
    specs: ["-40°C to +125°C", "Rapid cycling modes", "Vacuum compatible"],
  },
  {
    icon: PackageCheck,
    title: "Sample Return",
    description: "Retrieve physical samples or hardware from orbit. Capsule-based return service with precision landing.",
    specs: ["5 kg payload max", "3-7 day turnaround", "Global recovery"],
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-card">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">On-Orbit Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Modular capabilities designed for research, development, and commercial applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300 hover:scale-[1.02] overflow-visible"
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
