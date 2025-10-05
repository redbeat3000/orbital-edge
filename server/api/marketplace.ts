import express, { type Request, Response } from "express";

// ----------------------
// Types
// ----------------------
interface Slot {
  id: string;
  provider: string;
  type: "computing" | "storage" | "thermal cycling" | "sample return";
  vCPU?: number;
  storage?: string;
  temperatureRange?: string;
  payloadWeightLimit?: number;
  durationDays: number;
  status: "available" | "booked" | "maintenance";
  price: number;
  linkedPayloads?: number[];
}

interface Booking {
  bookingId: string;
  slotId: string;
  payloadId: number;
  userId: string;
}

// ----------------------
// Simulated Storage
// ----------------------
const slots: Slot[] = [
  {
    id: "SLOT-LEO-001",
    provider: "SpaceTech Labs",
    type: "computing",
    vCPU: 8,
    storage: "256 GB SSD",
    durationDays: 30,
    status: "available",
    price: 12500,
  },
  {
    id: "SLOT-LEO-002",
    provider: "Orbital Dynamics",
    type: "storage",
    storage: "1 TB NVMe",
    durationDays: 60,
    status: "booked",
    price: 8900,
  },
  {
    id: "SLOT-LEO-003",
    provider: "CubeSat Solutions",
    type: "thermal cycling",
    temperatureRange: "-40°C to +85°C",
    durationDays: 14,
    status: "available",
    price: 15000,
  },
  {
    id: "SLOT-LEO-004",
    provider: "Astro Innovations",
    type: "sample return",
    payloadWeightLimit: 5,
    durationDays: 45,
    status: "available",
    price: 24500,
  },
  {
    id: "SLOT-LEO-005",
    provider: "NanoSat Networks",
    type: "computing",
    vCPU: 16,
    storage: "512 GB SSD",
    durationDays: 90,
    status: "maintenance",
    price: 18000,
  },
  {
    id: "SLOT-LEO-006",
    provider: "LEO Data Systems",
    type: "storage",
    storage: "2 TB NVMe RAID",
    durationDays: 120,
    status: "available",
    price: 16500,
  },
];

const bookings: Booking[] = [];

// ----------------------
// Router
// ----------------------
const router = express.Router();

// ----------------------
// 1. List All Slots
// ----------------------
router.get("/slots", (_req: Request, res: Response) => {
  res.json(slots);
});

// ----------------------
// 2. Get Slot Details
// ----------------------
router.get("/slot/:id", (req: Request, res: Response) => {
  const slot = slots.find((s) => s.id === req.params.id);
  if (!slot) return res.status(404).json({ message: "Slot not found" });
  res.json(slot);
});

// ----------------------
// 3. Book a Slot
// ----------------------
router.post("/book-slot", (req: Request, res: Response) => {
  const { slotId, userId, payloadId } = req.body;

  const slot = slots.find((s) => s.id === slotId);
  if (!slot) return res.status(404).json({ message: "Slot not found" });
  if (slot.status !== "available")
    return res.status(400).json({ message: "Slot not available" });

  // Update slot status
  slot.status = "booked";
  slot.linkedPayloads = slot.linkedPayloads || [];
  slot.linkedPayloads.push(payloadId);

  const bookingId = `BOOK-${bookings.length + 1}`;
  bookings.push({ bookingId, slotId, payloadId, userId });

  res.json({ success: true, message: "Slot booked successfully", bookingId });
});

// ----------------------
// 4. Cancel a Booking
// ----------------------
router.post("/cancel-slot", (req: Request, res: Response) => {
  const { bookingId, userId } = req.body;

  const bookingIndex = bookings.findIndex(
    (b) => b.bookingId === bookingId && b.userId === userId,
  );
  if (bookingIndex === -1)
    return res.status(404).json({ message: "Booking not found" });

  const booking = bookings[bookingIndex];
  const slot = slots.find((s) => s.id === booking.slotId);
  if (slot) {
    slot.status = "available";
    slot.linkedPayloads = slot.linkedPayloads?.filter(
      (p) => p !== booking.payloadId,
    );
  }

  bookings.splice(bookingIndex, 1);
  res.json({ success: true, message: "Booking canceled" });
});

export default router;
