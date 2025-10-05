import express, { type Request, Response } from "express";
import marketplaceSlots from "./marketplaceSlots"; // Slots & bookings
import { missions } from "./simulator"; // Access exported missions array

const router = express.Router();

// ----------------------
// 1. Mission Summary
// ----------------------
router.get("/analytics/summary", (_req: Request, res: Response) => {
  const totalMissions = missions.length;
  const activeMissions = missions.filter((m) => m.status === "active").length;
  const completedMissions = missions.filter(
    (m) => m.status === "completed",
  ).length;

  const totalCost = missions.reduce(
    (sum, m) => sum + m.result.estimatedCost,
    0,
  );

  const summary = {
    totalMissions,
    activeMissions,
    completedMissions,
    totalCost,
    averageCost: totalMissions ? Math.round(totalCost / totalMissions) : 0,
  };

  res.json({ success: true, summary });
});

// ----------------------
// 2. Telemetry Analytics for a Mission
// ----------------------
router.get("/analytics/telemetry/:missionId", (req: Request, res: Response) => {
  const mission = missions.find((m) => m.missionId === req.params.missionId);
  if (!mission) return res.status(404).json({ message: "Mission not found" });

  const telemetry = mission.telemetry;

  const averages = telemetry.length
    ? {
        avgCPU: Math.round(
          telemetry.reduce((sum, t) => sum + t.cpuUsage, 0) / telemetry.length,
        ),
        avgMemory: Math.round(
          telemetry.reduce((sum, t) => sum + t.memoryUsage, 0) /
            telemetry.length,
        ),
        avgTemp: Math.round(
          telemetry.reduce((sum, t) => sum + t.temperatureC, 0) /
            telemetry.length,
        ),
        avgPerformance: Math.round(
          telemetry.reduce((sum, t) => sum + t.systemPerformance, 0) /
            telemetry.length,
        ),
      }
    : { avgCPU: 0, avgMemory: 0, avgTemp: 0, avgPerformance: 0 };

  res.json({ success: true, telemetry, averages });
});

// ----------------------
// 3. Bookings per Provider
// ----------------------
router.get("/analytics/bookings", (_req: Request, res: Response) => {
  const providerStats = marketplaceSlots.slots.map((slot) => {
    const bookingsCount = marketplaceSlots.bookings.filter(
      (b) => b.slotId === slot.id,
    ).length;
    return {
      provider: slot.provider,
      slotId: slot.id,
      type: slot.type,
      bookingsCount,
    };
  });

  res.json({ success: true, providerStats });
});

// ----------------------
// 4. Export Summary (CSV)
// ----------------------
router.get("/analytics/export", (_req: Request, res: Response) => {
  const csvHeader =
    "MissionID,SlotID,UserID,Status,EstimatedCost,DurationDays\n";
  const csvRows = missions
    .map(
      (m) =>
        `${m.missionId},${m.slotId},${m.userId},${m.status},${m.result.estimatedCost},${m.params.durationDays}`,
    )
    .join("\n");
  const csv = csvHeader + csvRows;

  res.header("Content-Type", "text/csv");
  res.attachment("mission_summary.csv");
  res.send(csv);
});

export default router;
