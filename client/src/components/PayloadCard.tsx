import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Clock,
  DollarSign,
  Cpu,
  HardDrive,
  Thermometer,
  PackageCheck,
} from "lucide-react";

interface PayloadCardProps {
  id: string;
  provider: string;
  serviceType: "computing" | "storage" | "thermal-cycling" | "sample-return";
  price: number;
  duration: string;
  availability: "available" | "booked" | "maintenance";
  specs?: {
    cpu?: string;
    storage?: string;
    temp?: string;
  };
}

const serviceIcons = {
  computing: Cpu,
  storage: HardDrive,
  "thermal-cycling": Thermometer,
  "sample-return": PackageCheck,
};

const serviceColors = {
  computing: "text-primary",
  storage: "text-chart-2",
  "thermal-cycling": "text-chart-3",
  "sample-return": "text-chart-4",
};

const availabilityVariants = {
  available: "default",
  booked: "secondary",
  maintenance: "destructive",
} as const;

export default function PayloadCard({
  id,
  provider,
  serviceType,
  price,
  duration,
  availability,
  specs,
}: PayloadCardProps) {
  const ServiceIcon = serviceIcons[serviceType];

  return (
    <Card
      className="hover-elevate transition-all duration-300 hover:scale-105 overflow-visible"
      data-testid={`card-payload-${id}`}
    >
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge
            variant={availabilityVariants[availability]}
            className="capitalize"
            data-testid={`badge-status-${availability}`}
          >
            {availability}
          </Badge>
          <ServiceIcon className={`w-5 h-5 ${serviceColors[serviceType]}`} />
        </div>
        <div
          className="text-xs font-mono text-muted-foreground"
          data-testid={`text-slot-id-${id}`}
        >
          SLOT-{id}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Provider</div>
          <div className="font-semibold" data-testid={`text-provider-${id}`}>
            {provider}
          </div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">Service Type</div>
          <div
            className="font-medium capitalize"
            data-testid={`text-service-${id}`}
          >
            {serviceType.replace("-", " ")}
          </div>
        </div>

        {specs && (
          <div className="space-y-2 pt-2 border-t border-border">
            {specs.cpu && (
              <div className="flex items-center gap-2 text-sm">
                <Cpu className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{specs.cpu}</span>
              </div>
            )}
            {specs.storage && (
              <div className="flex items-center gap-2 text-sm">
                <HardDrive className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{specs.storage}</span>
              </div>
            )}
            {specs.temp && (
              <div className="flex items-center gap-2 text-sm">
                <Thermometer className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{specs.temp}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span data-testid={`text-duration-${id}`}>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-primary" />
            <span
              className="text-2xl font-bold text-primary"
              data-testid={`text-price-${id}`}
            >
              {price.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={availability !== "available"}
          data-testid={`button-book-${id}`}
        >
          {availability === "available"
            ? "Book Now"
            : availability === "booked"
              ? "Fully Booked"
              : "Under Maintenance"}
        </Button>
      </CardFooter>
    </Card>
  );
}
