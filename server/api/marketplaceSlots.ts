// server/api/marketplaceSlots.ts
export interface Slot {
  id: string;
  provider: string;
  type: string;
  durationDays: number;
}

export interface Booking {
  bookingId: string;
  slotId: string;
  payloadId: number;
  userId: string;
}

const slots: Slot[] = [
  {
    id: "slot-1",
    provider: "Provider A",
    type: "thermal cycling",
    durationDays: 14,
  },
  { id: "slot-2", provider: "Provider B", type: "standard", durationDays: 30 },
];

const bookings: Booking[] = [
  { bookingId: "booking-1", slotId: "slot-1", payloadId: 101, userId: "user1" },
];

export default { slots, bookings };
