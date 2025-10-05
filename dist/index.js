// server/index.ts
import express9 from "express";

// server/routes.ts
import { createServer } from "http";
import express2 from "express";

// server/api/nasa.ts
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
var router = express.Router();
var NASA_API_KEY = process.env.NASA_API_KEY;
router.get("/earth-imagery", async (req, res) => {
  try {
    const { lat, lon, date } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: "lat and lon are required" });
    }
    const imageryDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${imageryDate}&dim=0.1&api_key=${NASA_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("NASA API error");
    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch Earth imagery" });
  }
});
router.get("/satellites", (_req, res) => {
  const satellites = [
    { id: 1, name: "CubeSat Alpha", lat: 0, lon: 0, altitude: 500 },
    { id: 2, name: "CubeSat Beta", lat: 45, lon: 90, altitude: 550 }
  ];
  res.json(satellites);
});
router.get("/payloads", (_req, res) => {
  const payloads = [
    { id: 1, name: "Weather Sensor", satelliteId: 1 },
    { id: 2, name: "IoT Relay", satelliteId: 2 }
  ];
  res.json(payloads);
});
var nasa_default = router;

// server/routes.ts
async function registerRoutes(app2) {
  app2.use(express2.json());
  app2.use("/api", nasa_default);
  const httpServer = createServer(app2);
  return httpServer;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const app2 = express2();
  const PORT = process.env.PORT || 5e3;
  registerRoutes(app2).then((server) => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

// server/vite.ts
import express3 from "express";
import fs from "fs";
import path2 from "path";

// vite.config.ts
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
<<<<<<< HEAD
var vite_config_default = (void 0)({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
=======
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig(async ({ mode }) => {
  const plugins = [react(), runtimeErrorOverlay()];
  if (mode !== "production" && process.env.REPL_ID) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    plugins.push(cartographer(), devBanner());
>>>>>>> 3fcf102f3cc6ad9a03d943b7b496f635fee634f6
  }
  return {
    root: path.resolve(__dirname, "client"),
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        // points to src correctly
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets")
      }
    },
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true
    },
    server: {
      fs: {
        strict: false
      }
    }
  };
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = (void 0)();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await (void 0)({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express3.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/api/marketplace.ts
import express4 from "express";
var slots = [
  {
    id: "SLOT-LEO-001",
    provider: "SpaceTech Labs",
    type: "computing",
    vCPU: 8,
    storage: "256 GB SSD",
    durationDays: 30,
    status: "available",
    price: 12500
  },
  {
    id: "SLOT-LEO-002",
    provider: "Orbital Dynamics",
    type: "storage",
    storage: "1 TB NVMe",
    durationDays: 60,
    status: "booked",
    price: 8900
  },
  {
    id: "SLOT-LEO-003",
    provider: "CubeSat Solutions",
    type: "thermal cycling",
    temperatureRange: "-40\xB0C to +85\xB0C",
    durationDays: 14,
    status: "available",
    price: 15e3
  },
  {
    id: "SLOT-LEO-004",
    provider: "Astro Innovations",
    type: "sample return",
    payloadWeightLimit: 5,
    durationDays: 45,
    status: "available",
    price: 24500
  },
  {
    id: "SLOT-LEO-005",
    provider: "NanoSat Networks",
    type: "computing",
    vCPU: 16,
    storage: "512 GB SSD",
    durationDays: 90,
    status: "maintenance",
    price: 18e3
  },
  {
    id: "SLOT-LEO-006",
    provider: "LEO Data Systems",
    type: "storage",
    storage: "2 TB NVMe RAID",
    durationDays: 120,
    status: "available",
    price: 16500
  }
];
var bookings = [];
var router2 = express4.Router();
router2.get("/slots", (_req, res) => {
  res.json(slots);
});
router2.get("/slot/:id", (req, res) => {
  const slot = slots.find((s) => s.id === req.params.id);
  if (!slot) return res.status(404).json({ message: "Slot not found" });
  res.json(slot);
});
router2.post("/book-slot", (req, res) => {
  const { slotId, userId, payloadId } = req.body;
  const slot = slots.find((s) => s.id === slotId);
  if (!slot) return res.status(404).json({ message: "Slot not found" });
  if (slot.status !== "available")
    return res.status(400).json({ message: "Slot not available" });
  slot.status = "booked";
  slot.linkedPayloads = slot.linkedPayloads || [];
  slot.linkedPayloads.push(payloadId);
  const bookingId = `BOOK-${bookings.length + 1}`;
  bookings.push({ bookingId, slotId, payloadId, userId });
  res.json({ success: true, message: "Slot booked successfully", bookingId });
});
router2.post("/cancel-slot", (req, res) => {
  const { bookingId, userId } = req.body;
  const bookingIndex = bookings.findIndex(
    (b) => b.bookingId === bookingId && b.userId === userId
  );
  if (bookingIndex === -1)
    return res.status(404).json({ message: "Booking not found" });
  const booking = bookings[bookingIndex];
  const slot = slots.find((s) => s.id === booking.slotId);
  if (slot) {
    slot.status = "available";
    slot.linkedPayloads = slot.linkedPayloads?.filter(
      (p) => p !== booking.payloadId
    );
  }
  bookings.splice(bookingIndex, 1);
  res.json({ success: true, message: "Booking canceled" });
});
var marketplace_default = router2;

// server/api/simulator.ts
import express5 from "express";

// server/api/marketplaceSlots.ts
var slots2 = [
  {
    id: "slot-1",
    provider: "Provider A",
    type: "thermal cycling",
    durationDays: 14
  },
  { id: "slot-2", provider: "Provider B", type: "standard", durationDays: 30 }
];
var bookings2 = [
  { bookingId: "booking-1", slotId: "slot-1", payloadId: 101, userId: "user1" }
];
var marketplaceSlots_default = { slots: slots2, bookings: bookings2 };

// server/api/simulator.ts
var router3 = express5.Router();
var missions = [];
function simulateMission(params) {
  const { altitudeKm, inclinationDeg, durationDays } = params;
  const orbitalPeriodMin = Math.round(90 + (altitudeKm - 400) * 0.1);
  const passesPerDay = Math.max(1, Math.round(1440 / orbitalPeriodMin));
  const totalOrbits = passesPerDay * durationDays;
  const groundTrack = inclinationDeg > 45 ? "Inclined" : "Equatorial";
  const baseCost = 1e4;
  const estimatedCost = Math.round(
    baseCost * (altitudeKm / 400) * (durationDays / 30)
  );
  const nextLaunch = /* @__PURE__ */ new Date();
  nextLaunch.setDate(nextLaunch.getDate() + 14);
  const nextLaunchWindow = nextLaunch.toISOString().split("T")[0];
  return {
    estimatedCost,
    orbitalPeriodMin,
    passesPerDay,
    groundTrack,
    totalOrbits,
    nextLaunchWindow
  };
}
function generateTelemetry() {
  return {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    cpuUsage: Math.round(40 + Math.random() * 20),
    memoryUsage: Math.round(50 + Math.random() * 20),
    temperatureC: Math.round(25 + Math.random() * 10),
    systemPerformance: Math.round(40 + Math.random() * 20)
  };
}
router3.post("/start-mission-from-booking", (req, res) => {
  const { bookingId } = req.body;
  const booking = marketplaceSlots_default.bookings.find(
    (b) => b.bookingId === bookingId
  );
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  const slot = marketplaceSlots_default.slots.find((s) => s.id === booking.slotId);
  if (!slot) return res.status(404).json({ message: "Slot not found" });
  const params = {
    altitudeKm: 400 + Math.floor(Math.random() * 200),
    inclinationDeg: slot.type === "thermal cycling" ? 90 : 51.6,
    durationDays: slot.durationDays
  };
  const result = simulateMission(params);
  const mission = {
    missionId: `MISSION-${missions.length + 1}`,
    slotId: slot.id,
    payloadId: booking.payloadId,
    userId: booking.userId,
    params,
    result,
    telemetry: [],
    status: "active"
  };
  missions.push(mission);
  res.json({
    success: true,
    message: "Mission started",
    missionId: mission.missionId
  });
});
router3.get("/mission/:missionId", (req, res) => {
  const mission = missions.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });
  if (mission.status === "active") {
    mission.telemetry.push(generateTelemetry());
    if (mission.telemetry.length >= 30) mission.status = "completed";
  }
  res.json({
    missionId: mission.missionId,
    status: mission.status,
    telemetry: mission.telemetry
  });
});
router3.get("/sample-missions", (_req, res) => {
  const sampleMissions = [
    {
      missionId: "LEO-001",
      altitudeKm: 400,
      inclinationDeg: 51.6,
      durationDays: 30
    },
    {
      missionId: "LEO-002",
      altitudeKm: 500,
      inclinationDeg: 0,
      durationDays: 60
    },
    {
      missionId: "LEO-003",
      altitudeKm: 350,
      inclinationDeg: 90,
      durationDays: 14
    }
  ];
  res.json(sampleMissions);
});
var simulator_default = router3;

// server/api/missionControl.ts
import express6 from "express";
var missions2 = [];
var router4 = express6.Router();
function simulateMission2(params) {
  const { altitudeKm, inclinationDeg, durationDays } = params;
  const orbitalPeriodMin = Math.round(90 + (altitudeKm - 400) * 0.1);
  const passesPerDay = Math.max(1, Math.round(1440 / orbitalPeriodMin));
  const totalOrbits = passesPerDay * durationDays;
  const groundTrack = inclinationDeg > 45 ? "Inclined" : "Equatorial";
  const baseCost = 1e4;
  const altitudeFactor = altitudeKm / 400;
  const durationFactor = durationDays / 30;
  const estimatedCost = Math.round(baseCost * altitudeFactor * durationFactor);
  const nextLaunch = /* @__PURE__ */ new Date();
  nextLaunch.setDate(nextLaunch.getDate() + 14);
  const nextLaunchWindow = nextLaunch.toISOString().split("T")[0];
  return {
    estimatedCost,
    orbitalPeriodMin,
    passesPerDay,
    groundTrack,
    totalOrbits,
    nextLaunchWindow
  };
}
function generateTelemetry2() {
  return {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    cpuUsage: Math.round(40 + Math.random() * 20),
    memoryUsage: Math.round(50 + Math.random() * 20),
    temperatureC: Math.round(25 + Math.random() * 10),
    systemPerformance: Math.round(40 + Math.random() * 20)
  };
}
router4.post("/start-mission-from-booking", (req, res) => {
  const { bookingId } = req.body;
  const booking = marketplaceSlots_default.bookings.find(
    (b) => b.bookingId === bookingId
  );
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  const slot = marketplaceSlots_default.slots.find((s) => s.id === booking.slotId);
  if (!slot) return res.status(404).json({ message: "Slot not found" });
  const params = {
    altitudeKm: 400 + Math.floor(Math.random() * 200),
    inclinationDeg: slot.type === "thermal cycling" ? 90 : 51.6,
    durationDays: slot.durationDays
  };
  const result = simulateMission2(params);
  const mission = {
    missionId: `MISSION-${missions2.length + 1}`,
    slotId: slot.id,
    payloadId: booking.payloadId,
    userId: booking.userId,
    params,
    result,
    telemetry: [],
    status: "active"
  };
  missions2.push(mission);
  res.json({
    success: true,
    message: "Mission started",
    missionId: mission.missionId
  });
});
router4.get("/mission/:missionId", (req, res) => {
  const mission = missions2.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });
  if (mission.status === "active") {
    mission.telemetry.push(generateTelemetry2());
    if (mission.telemetry.length >= mission.params.durationDays)
      mission.status = "completed";
  }
  const stats = {
    cpuUsageAvg: Math.round(
      mission.telemetry.reduce((a, t) => a + t.cpuUsage, 0) / (mission.telemetry.length || 1)
    ),
    memoryUsageAvg: Math.round(
      mission.telemetry.reduce((a, t) => a + t.memoryUsage, 0) / (mission.telemetry.length || 1)
    ),
    temperatureAvg: Math.round(
      mission.telemetry.reduce((a, t) => a + t.temperatureC, 0) / (mission.telemetry.length || 1)
    )
  };
  res.json({
    missionId: mission.missionId,
    status: mission.status,
    telemetry: mission.telemetry,
    stats
  });
});
router4.post("/mission/:missionId/abort", (req, res) => {
  const mission = missions2.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });
  mission.status = "aborted";
  res.json({ success: true, message: "Mission aborted" });
});
router4.get("/missions", (_req, res) => {
  res.json(missions2);
});
router4.get("/sample-missions", (_req, res) => {
  const sampleMissions = [
    {
      missionId: "LEO-001",
      altitudeKm: 400,
      inclinationDeg: 51.6,
      durationDays: 30
    },
    {
      missionId: "LEO-002",
      altitudeKm: 500,
      inclinationDeg: 0,
      durationDays: 60
    },
    {
      missionId: "LEO-003",
      altitudeKm: 350,
      inclinationDeg: 90,
      durationDays: 14
    }
  ];
  res.json(sampleMissions);
});
var missionControl_default = router4;

// server/api/analytics.ts
import express7 from "express";
var router5 = express7.Router();
router5.get("/analytics/summary", (_req, res) => {
  const totalMissions = missions.length;
  const activeMissions = missions.filter((m) => m.status === "active").length;
  const completedMissions = missions.filter(
    (m) => m.status === "completed"
  ).length;
  const totalCost = missions.reduce(
    (sum, m) => sum + m.result.estimatedCost,
    0
  );
  const summary = {
    totalMissions,
    activeMissions,
    completedMissions,
    totalCost,
    averageCost: totalMissions ? Math.round(totalCost / totalMissions) : 0
  };
  res.json({ success: true, summary });
});
router5.get("/analytics/telemetry/:missionId", (req, res) => {
  const mission = missions.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });
  const telemetry = mission.telemetry;
  const averages = telemetry.length ? {
    avgCPU: Math.round(
      telemetry.reduce((sum, t) => sum + t.cpuUsage, 0) / telemetry.length
    ),
    avgMemory: Math.round(
      telemetry.reduce((sum, t) => sum + t.memoryUsage, 0) / telemetry.length
    ),
    avgTemp: Math.round(
      telemetry.reduce((sum, t) => sum + t.temperatureC, 0) / telemetry.length
    ),
    avgPerformance: Math.round(
      telemetry.reduce((sum, t) => sum + t.systemPerformance, 0) / telemetry.length
    )
  } : { avgCPU: 0, avgMemory: 0, avgTemp: 0, avgPerformance: 0 };
  res.json({ success: true, telemetry, averages });
});
router5.get("/analytics/bookings", (_req, res) => {
  const providerStats = marketplaceSlots_default.slots.map((slot) => {
    const bookingsCount = marketplaceSlots_default.bookings.filter(
      (b) => b.slotId === slot.id
    ).length;
    return {
      provider: slot.provider,
      slotId: slot.id,
      type: slot.type,
      bookingsCount
    };
  });
  res.json({ success: true, providerStats });
});
router5.get("/analytics/export", (_req, res) => {
  const csvHeader = "MissionID,SlotID,UserID,Status,EstimatedCost,DurationDays\n";
  const csvRows = missions.map(
    (m) => `${m.missionId},${m.slotId},${m.userId},${m.status},${m.result.estimatedCost},${m.params.durationDays}`
  ).join("\n");
  const csv = csvHeader + csvRows;
  res.header("Content-Type", "text/csv");
  res.attachment("mission_summary.csv");
  res.send(csv);
});
var analytics_default = router5;

// server/api/users.ts
import express8 from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
var router6 = express8.Router();
var users = [];
var JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
router6.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role)
    return res.status(400).json({ message: "Missing fields" });
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: `USER-${users.length + 1}`,
    username,
    passwordHash,
    role
  };
  users.push(newUser);
  res.json({ success: true, message: "User registered", userId: newUser.id });
});
router6.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: "User not found" });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Invalid password" });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "8h"
  });
  res.json({ success: true, token, role: user.role, userId: user.id });
});
router6.get("/profile", authenticateJWT, (req, res) => {
  const userId = req.user.id;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ id: user.id, username: user.username, role: user.role });
});
router6.get("/all", authenticateJWT, authorizeRoles("admin"), (_req, res) => {
  const safeUsers = users.map((u) => ({
    id: u.id,
    username: u.username,
    role: u.role
  }));
  res.json(safeUsers);
});
var users_default = router6;

// server/index.ts
import dotenv2 from "dotenv";
import path3 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { execSync } from "child_process";
var __filename = fileURLToPath2(import.meta.url);
var __dirname2 = path3.dirname(__filename);
dotenv2.config({ path: path3.resolve(__dirname2, ".env") });
try {
  const pid = execSync("lsof -ti:5000").toString().trim();
  if (pid) {
    console.log(`Killing process on port 5000 (PID: ${pid})`);
    execSync(`kill -9 ${pid}`);
  }
} catch {
}
var app = express9();
app.use(express9.json());
app.use(express9.urlencoded({ extended: false }));
app.use("/api", nasa_default);
app.use("/api", marketplace_default);
app.use("/api", simulator_default);
app.use("/api", missionControl_default);
app.use("/api", analytics_default);
app.use("/api/users", users_default);
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse;
  const originalJson = res.json.bind(res);
  res.json = (bodyJson, ...args) => {
    capturedJsonResponse = bodyJson;
    return originalJson(bodyJson, ...args);
  };
  res.on("finish", () => {
    if (path4.startsWith("/api")) {
      const duration = Date.now() - start;
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse)
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "\u2026";
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`Server running on port ${port}`);
  });
})();
