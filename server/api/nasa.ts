import express, { type Request, Response } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const NASA_API_KEY = process.env.NASA_API_KEY;

// ----------------------
// 1. Earth Imagery Endpoint
// ----------------------
router.get("/earth-imagery", async (req: Request, res: Response) => {
  try {
    const { lat, lon, date } = req.query as { lat?: string; lon?: string; date?: string };

    if (!lat || !lon) {
      return res.status(400).json({ message: "lat and lon are required" });
    }

    const imageryDate = date || new Date().toISOString().split("T")[0];

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

// ----------------------
// 2. Satellites Endpoint (simulated for now)
// ----------------------
interface Satellite {
  id: number;
  name: string;
  lat: number;
  lon: number;
  altitude: number;
}

router.get("/satellites", (_req: Request, res: Response) => {
  const satellites: Satellite[] = [
    { id: 1, name: "CubeSat Alpha", lat: 0, lon: 0, altitude: 500 },
    { id: 2, name: "CubeSat Beta", lat: 45, lon: 90, altitude: 550 },
  ];
  res.json(satellites);
});

// ----------------------
// 3. Payloads Endpoint (simulated for now)
// ----------------------
interface Payload {
  id: number;
  name: string;
  satelliteId: number;
}

router.get("/payloads", (_req: Request, res: Response) => {
  const payloads: Payload[] = [
    { id: 1, name: "Weather Sensor", satelliteId: 1 },
    { id: 2, name: "IoT Relay", satelliteId: 2 },
  ];
  res.json(payloads);
});

export default router;
