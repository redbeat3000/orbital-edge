import Navigation from "../Navigation";
import Footer from "../Footer";
import TelemetryDashboard from "../TelemetryDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Upload, FileText, Play } from "lucide-react";

export default function Dashboard() {
  const handleFileUpload = () => {
    console.log("File upload triggered");
  };

  const handleExecute = () => {
    console.log("Experiment execution triggered");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl font-bold">Mission Control</h1>
              <Badge
                className="text-lg px-4 py-2"
                data-testid="badge-mission-id"
              >
                Mission #LEO-001
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              Upload experiments, monitor telemetry, and manage your orbital
              missions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Upload className="w-5 h-5" />
                  Upload Experiment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload your experiment code, data, or configuration files
                </p>
                <Button
                  className="w-full gap-2"
                  onClick={handleFileUpload}
                  data-testid="button-upload-experiment"
                >
                  <Upload className="w-4 h-4" />
                  Select Files
                </Button>
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Supported formats:
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    .py, .js, .json, .csv, .zip (max 100 MB)
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  API reference and integration guides
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  data-testid="button-view-docs"
                >
                  View Documentation
                </Button>
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Quick links:
                  </div>
                  <div className="mt-2 space-y-1">
                    <a
                      href="#"
                      className="block text-xs text-primary hover:underline"
                    >
                      Getting Started Guide
                    </a>
                    <a
                      href="#"
                      className="block text-xs text-primary hover:underline"
                    >
                      API Reference
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Play className="w-5 h-5" />
                  Execute Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Start experiment execution in orbit
                </p>
                <Button
                  className="w-full gap-2"
                  onClick={handleExecute}
                  data-testid="button-execute-mission"
                >
                  <Play className="w-4 h-4" />
                  Execute Now
                </Button>
                <div className="pt-4 border-t border-primary/20">
                  <div className="text-xs text-muted-foreground">
                    Estimated duration:
                  </div>
                  <div className="text-sm font-semibold text-primary mt-1">
                    30 days
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <TelemetryDashboard />
        </div>
      </div>

      <Footer />
    </div>
  );
}
