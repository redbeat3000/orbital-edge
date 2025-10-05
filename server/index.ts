import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

import nasaRoutes from "./api/nasa"; // Phase 1
import marketplaceRoutes from "./api/marketplace"; // Phase 2
import simulatorRoutes from "./api/simulator"; // Phase 3
import missionControlRoutes from "./api/missionControl"; // Phase 4
import analyticsRoutes from "./api/analytics"; // Phase 5
import userRoutes from "./api/users"; // Phase 6

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

// ----------------------
// ES module equivalent of __dirname
// ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------
// Load environment variables
// ----------------------
dotenv.config({ path: path.resolve(__dirname, ".env") });

// ----------------------
// Kill existing process on port 5000 (Replit-friendly)
// ----------------------
try {
  const pid = execSync("lsof -ti:5000").toString().trim();
  if (pid) {
    console.log(`Killing process on port 5000 (PID: ${pid})`);
    execSync(`kill -9 ${pid}`);
  }
} catch {
  // No process running on port 5000
}

// ----------------------
// Initialize Express
// ----------------------
const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ----------------------
// Mount API routes
// ----------------------
app.use("/api", nasaRoutes);
app.use("/api", marketplaceRoutes);
app.use("/api", simulatorRoutes);
app.use("/api", missionControlRoutes);
app.use("/api", analyticsRoutes);
app.use("/api/users", userRoutes);

// ----------------------
// Logging middleware for /api routes
// ----------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalJson = res.json.bind(res);
  res.json = (bodyJson, ...args) => {
    capturedJsonResponse = bodyJson;
    return originalJson(bodyJson, ...args);
  };

  res.on("finish", () => {
    if (path.startsWith("/api")) {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse)
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

// ----------------------
// Main async setup
// ----------------------
(async () => {
  const server = await registerRoutes(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  // Setup Vite for development or serve static files in production
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start server
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`Server running on port ${port}`);
  });
})();
