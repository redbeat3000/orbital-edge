import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, HardDrive, Thermometer, Signal } from "lucide-react";

const mockTelemetryData = [
  { time: "09:00", cpu: 45, memory: 62, temp: 28 },
  { time: "09:15", cpu: 52, memory: 65, temp: 30 },
  { time: "09:30", cpu: 48, memory: 68, temp: 29 },
  { time: "09:45", cpu: 55, memory: 70, temp: 31 },
  { time: "10:00", cpu: 51, memory: 67, temp: 30 },
];

export default function TelemetryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Mission Telemetry</h2>
        <Badge className="gap-1" data-testid="badge-mission-status">
          <Signal className="w-3 h-3" />
          Live
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary" data-testid="text-cpu-usage">51%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +6% from last hour
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "51%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <HardDrive className="w-4 h-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-2" data-testid="text-memory-usage">67%</div>
            <p className="text-xs text-muted-foreground mt-1">
              172 GB / 256 GB
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-chart-2 rounded-full" style={{ width: "67%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="w-4 h-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3" data-testid="text-temperature">30°C</div>
            <p className="text-xs text-muted-foreground mt-1">
              Within normal range
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-chart-3 rounded-full" style={{ width: "40%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {mockTelemetryData.map((data, index) => (
                <div key={index} className="text-center" data-testid={`telemetry-point-${index}`}>
                  <div className="text-xs text-muted-foreground mb-2">{data.time}</div>
                  <div className="space-y-2">
                    <div
                      className="h-16 bg-primary/20 rounded-t relative overflow-hidden"
                      style={{ height: `${data.cpu}px` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/50"></div>
                    </div>
                    <div className="text-xs font-mono">{data.cpu}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm text-muted-foreground">CPU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                <span className="text-sm text-muted-foreground">Memory</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-3"></div>
                <span className="text-sm text-muted-foreground">Temperature</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-sm">Mission Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { status: "completed", label: "Payload Upload", time: "Day 1" },
              { status: "completed", label: "Launch & Deployment", time: "Day 3" },
              { status: "active", label: "Experiment Execution", time: "Day 5-30" },
              { status: "pending", label: "Sample Return", time: "Day 32" },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4" data-testid={`timeline-step-${index}`}>
                <div
                  className={`w-3 h-3 rounded-full ${
                    step.status === "completed"
                      ? "bg-chart-2"
                      : step.status === "active"
                      ? "bg-primary animate-pulse"
                      : "bg-muted"
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="font-medium">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.time}</div>
                </div>
                <Badge variant={step.status === "completed" ? "default" : step.status === "active" ? "default" : "secondary"}>
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
