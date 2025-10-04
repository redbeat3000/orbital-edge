import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export default function OrbitSimulator() {
  const [altitude, setAltitude] = useState([400]);
  const [inclination, setInclination] = useState([51.6]);
  const [duration, setDuration] = useState([30]);
  const [isSimulating, setIsSimulating] = useState(false);

  const estimatedCost = Math.round((altitude[0] * 10 + duration[0] * 250) * 1.2);
  const passesPerDay = Math.round(16 - (altitude[0] - 300) / 100);

  const handleSimulate = () => {
    setIsSimulating(true);
    console.log('Simulation started', { altitude: altitude[0], inclination: inclination[0], duration: duration[0] });
    setTimeout(() => setIsSimulating(false), 2000);
  };

  const handleReset = () => {
    setAltitude([400]);
    setInclination([51.6]);
    setDuration([30]);
    console.log('Simulation reset');
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-card to-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Mission Simulator</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plan your mission parameters and estimate costs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Mission Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Altitude (km)</Label>
                  <span className="text-sm font-mono text-primary" data-testid="text-altitude-value">{altitude[0]} km</span>
                </div>
                <Slider
                  value={altitude}
                  onValueChange={setAltitude}
                  min={300}
                  max={800}
                  step={10}
                  data-testid="slider-altitude"
                />
                <p className="text-xs text-muted-foreground">LEO range: 300-800 km</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Inclination (degrees)</Label>
                  <span className="text-sm font-mono text-primary" data-testid="text-inclination-value">{inclination[0]}°</span>
                </div>
                <Slider
                  value={inclination}
                  onValueChange={setInclination}
                  min={0}
                  max={98}
                  step={0.1}
                  data-testid="slider-inclination"
                />
                <p className="text-xs text-muted-foreground">0° = Equatorial, 90° = Polar</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Mission Duration (days)</Label>
                  <span className="text-sm font-mono text-primary" data-testid="text-duration-value">{duration[0]} days</span>
                </div>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  min={7}
                  max={180}
                  step={1}
                  data-testid="slider-duration"
                />
                <p className="text-xs text-muted-foreground">Min 7 days, max 180 days</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 gap-2" 
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  data-testid="button-simulate"
                >
                  <Play className="w-4 h-4" />
                  {isSimulating ? "Simulating..." : "Run Simulation"}
                </Button>
                <Button variant="outline" onClick={handleReset} data-testid="button-reset">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-sm font-medium">Estimated Cost</span>
                  <span className="text-2xl font-bold text-primary" data-testid="text-estimated-cost">
                    ${estimatedCost.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Orbital Period</div>
                    <div className="text-lg font-semibold" data-testid="text-orbital-period">
                      {Math.round(92 + (altitude[0] - 400) / 10)} min
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Passes per Day</div>
                    <div className="text-lg font-semibold" data-testid="text-passes-per-day">{passesPerDay}</div>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Ground Track</div>
                    <div className="text-lg font-semibold" data-testid="text-ground-track">
                      {inclination[0] > 80 ? "Polar" : inclination[0] < 10 ? "Equatorial" : "Inclined"}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Total Orbits</div>
                    <div className="text-lg font-semibold" data-testid="text-total-orbits">
                      {Math.round(passesPerDay * duration[0])}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Next Available Launch Window</div>
                  <div className="text-2xl font-bold mb-1" data-testid="text-launch-window">March 15, 2025</div>
                  <div className="text-sm text-primary font-mono">T-14 days</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
