import express, { type Request, Response } from "express";
import marketplaceSlots from "./marketplaceSlots"; // import slots & bookings

// ----------------------
// Types
// ----------------------
interface MissionParams {
  altitudeKm: number;
  inclinationDeg: number;
  durationDays: number;
}

interface SimulationResult {
  estimatedCost: number;
  orbitalPeriodMin: number;
  passesPerDay: number;
  groundTrack: string;
  totalOrbits: number;
  nextLaunchWindow: string;
}

interface Telemetry {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  temperatureC: number;
  systemPerformance: number;
}

interface Mission {
  missionId: string;
  slotId: string;
  payloadId: number;
  userId: string;
  params: MissionParams;
  result: SimulationResult;
  telemetry: Telemetry[];
  status: "pending" | "active" | "completed" | "aborted";
}

// ----------------------
// Storage
// ----------------------
const missions: Mission[] = [];

const router = express.Router();

// ----------------------
// Utils
// ----------------------
function simulateMission(params: MissionParams): SimulationResult {
  const { altitudeKm, inclinationDeg, durationDays } = params;
  const orbitalPeriodMin = Math.round(90 + (altitudeKm - 400) * 0.1);
  const passesPerDay = Math.max(1, Math.round(1440 / orbitalPeriodMin));
  const totalOrbits = passesPerDay * durationDays;
  const groundTrack = inclinationDeg > 45 ? "Inclined" : "Equatorial";
  const baseCost = 10000;
  const altitudeFactor = altitudeKm / 400;
  const durationFactor = durationDays / 30;
  const estimatedCost = Math.round(baseCost * altitudeFactor * durationFactor);
  const nextLaunch = new Date();
  nextLaunch.setDate(nextLaunch.getDate() + 14);
  const nextLaunchWindow = nextLaunch.toISOString().split("T")[0];

  return {
    estimatedCost,
    orbitalPeriodMin,
    passesPerDay,
    groundTrack,
    totalOrbits,
    nextLaunchWindow,
  };
}

function generateTelemetry(): Telemetry {
  return {
    timestamp: new Date().toISOString(),
    cpuUsage: Math.round(40 + Math.random() * 20),
    memoryUsage: Math.round(50 + Math.random() * 20),
    temperatureC: Math.round(25 + Math.random() * 10),
    systemPerformance: Math.round(40 + Math.random() * 20),
  };
}

// ----------------------
// 1. Start Mission from Booking
// ----------------------
router.post("/start-mission-from-booking", (req: Request, res: Response) => {
  const { bookingId } = req.body;
  const booking = marketplaceSlots.bookings.find(
    (b) => b.bookingId === bookingId,
  );
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const slot = marketplaceSlots.slots.find((s) => s.id === booking.slotId);
  if (!slot) return res.status(404).json({ message: "Slot not found" });

  const params: MissionParams = {
    altitudeKm: 400 + Math.floor(Math.random() * 200),
    inclinationDeg: slot.type === "thermal cycling" ? 90 : 51.6,
    durationDays: slot.durationDays,
  };

  const result = simulateMission(params);
  const mission: Mission = {
    missionId: `MISSION-${missions.length + 1}`,
    slotId: slot.id,
    payloadId: booking.payloadId,
    userId: booking.userId,
    params,
    result,
    telemetry: [],
    status: "active",
  };

  missions.push(mission);
  res.json({
    success: true,
    message: "Mission started",
    missionId: mission.missionId,
  });
});

// ----------------------
// 2. Get Mission Telemetry & Stats
// ----------------------
router.get("/mission/:missionId", (req: Request, res: Response) => {
  const mission = missions.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });

  // Simulate live telemetry
  if (mission.status === "active") {
    mission.telemetry.push(generateTelemetry());
    if (mission.telemetry.length >= mission.params.durationDays)
      mission.status = "completed";
  }

  // Calculate basic telemetry stats
  const stats = {
    cpuUsageAvg: Math.round(
      mission.telemetry.reduce((a, t) => a + t.cpuUsage, 0) /
        (mission.telemetry.length || 1),
    ),
    memoryUsageAvg: Math.round(
      mission.telemetry.reduce((a, t) => a + t.memoryUsage, 0) /
        (mission.telemetry.length || 1),
    ),
    temperatureAvg: Math.round(
      mission.telemetry.reduce((a, t) => a + t.temperatureC, 0) /
        (mission.telemetry.length || 1),
    ),
  };

  res.json({
    missionId: mission.missionId,
    status: mission.status,
    telemetry: mission.telemetry,
    stats,
  });
});

// ----------------------
// 3. Abort Mission
// ----------------------
router.post("/mission/:missionId/abort", (req: Request, res: Response) => {
  const mission = missions.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });
  mission.status = "aborted";
  res.json({ success: true, message: "Mission aborted" });
});

// ----------------------
// 4. List All Missions
// ----------------------
router.get("/missions", (_req: Request, res: Response) => {
  res.json(missions);
});

// ----------------------
// 5. Sample Missions
// ----------------------
router.get("/sample-missions", (_req: Request, res: Response) => {
  const sampleMissions = [
    {
      missionId: "LEO-001",
      altitudeKm: 400,
      inclinationDeg: 51.6,
      durationDays: 30,
    },
    {
      missionId: "LEO-002",
      altitudeKm: 500,
      inclinationDeg: 0,
      durationDays: 60,
    },
    {
      missionId: "LEO-003",
      altitudeKm: 350,
      inclinationDeg: 90,
      durationDays: 14,
    },
  ];
  res.json(sampleMissions);
});

export default router;
