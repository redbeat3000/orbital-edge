import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PayloadCard from "@/components/PayloadCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";

const mockPayloads = [
  {
    id: "LEO-001",
    provider: "SpaceTech Labs",
    serviceType: "computing" as const,
    price: 12500,
    duration: "30 days",
    availability: "available" as const,
    specs: { cpu: "8 vCPU", storage: "256 GB SSD" },
  },
  {
    id: "LEO-002",
    provider: "Orbital Dynamics",
    serviceType: "storage" as const,
    price: 8900,
    duration: "60 days",
    availability: "booked" as const,
    specs: { storage: "1 TB NVMe" },
  },
  {
    id: "LEO-003",
    provider: "CubeSat Solutions",
    serviceType: "thermal-cycling" as const,
    price: 15000,
    duration: "14 days",
    availability: "available" as const,
    specs: { temp: "-40°C to +85°C" },
  },
  {
    id: "LEO-004",
    provider: "Astro Innovations",
    serviceType: "sample-return" as const,
    price: 24500,
    duration: "45 days",
    availability: "available" as const,
    specs: { temp: "Controlled environment" },
  },
  {
    id: "LEO-005",
    provider: "NanoSat Networks",
    serviceType: "computing" as const,
    price: 18000,
    duration: "90 days",
    availability: "maintenance" as const,
    specs: { cpu: "16 vCPU", storage: "512 GB SSD" },
  },
  {
    id: "LEO-006",
    provider: "LEO Data Systems",
    serviceType: "storage" as const,
    price: 16500,
    duration: "120 days",
    availability: "available" as const,
    specs: { storage: "2 TB NVMe RAID" },
  },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPayloads = mockPayloads.filter((payload) => {
    const matchesSearch =
      payload.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payload.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payload.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      payload.price >= priceRange[0] && payload.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Payload Marketplace</h1>
            <p className="text-xl text-muted-foreground">
              Browse and book available orbital slots from verified providers
            </p>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by provider, slot ID, or service type..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowFilters(!showFilters)}
              data-testid="button-toggle-filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Price Range (USD)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={30000}
                    step={500}
                    data-testid="slider-price-range"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span data-testid="text-price-min">
                      ${priceRange[0].toLocaleString()}
                    </span>
                    <span data-testid="text-price-max">
                      ${priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mb-6 flex items-center justify-between">
            <p
              className="text-muted-foreground"
              data-testid="text-results-count"
            >
              Showing {filteredPayloads.length} of {mockPayloads.length}{" "}
              available slots
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPayloads.map((payload) => (
              <PayloadCard key={payload.id} {...payload} />
            ))}
          </div>

          {filteredPayloads.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No payloads match your search criteria
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setPriceRange([0, 30000]);
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
