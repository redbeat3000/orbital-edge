import express, { type Request, Response } from "express";
import marketplaceSlots from "./marketplaceSlots";

export interface MissionParams {
  altitudeKm: number;
  inclinationDeg: number;
  durationDays: number;
}

export interface SimulationResult {
  estimatedCost: number;
  orbitalPeriodMin: number;
  passesPerDay: number;
  groundTrack: string;
  totalOrbits: number;
  nextLaunchWindow: string;
}

export interface Telemetry {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  temperatureC: number;
  systemPerformance: number;
}

export interface Mission {
  missionId: string;
  slotId: string;
  payloadId: number;
  userId: string;
  params: MissionParams;
  result: SimulationResult;
  telemetry: Telemetry[];
  status: "pending" | "active" | "completed";
}

const router = express.Router();
export const missions: Mission[] = []; // exported for analytics

// ----------------------
// Utility: simulate a mission
// ----------------------
function simulateMission(params: MissionParams): SimulationResult {
  const { altitudeKm, inclinationDeg, durationDays } = params;
  const orbitalPeriodMin = Math.round(90 + (altitudeKm - 400) * 0.1);
  const passesPerDay = Math.max(1, Math.round(1440 / orbitalPeriodMin));
  const totalOrbits = passesPerDay * durationDays;
  const groundTrack = inclinationDeg > 45 ? "Inclined" : "Equatorial";

  const baseCost = 10000;
  const estimatedCost = Math.round(
    baseCost * (altitudeKm / 400) * (durationDays / 30),
  );

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

// ----------------------
// Utility: generate random telemetry
// ----------------------
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
// 1. Start mission from marketplace booking
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
// 2. Get mission telemetry
// ----------------------
router.get("/mission/:missionId", (req: Request, res: Response) => {
  const mission = missions.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });

  if (mission.status === "active") {
    mission.telemetry.push(generateTelemetry());
    if (mission.telemetry.length >= 30) mission.status = "completed";
  }

  res.json({
    missionId: mission.missionId,
    status: mission.status,
    telemetry: mission.telemetry,
  });
});

// ----------------------
// 3. Sample missions
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
