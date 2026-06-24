import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "@/lib/mongodb";
import { json } from "@/lib/auth";
import { ObjectId } from "mongodb";

const ROOM_TYPES: Record<number, string[]> = {
  1: ["Mountain View King Room", "Twin Comfort Room", "Deluxe Studio", "Mountain View King Room"],
  2: ["Deluxe Studio", "Twin Comfort Room", "Deluxe Double Room", "Mountain View King Room"],
  3: ["Deluxe Studio", "Deluxe Double Room", "Executive Suite", "Family Triple Room"],
  4: ["Deluxe Studio", "Deluxe Double Room", "Executive Suite", "Family Triple Room"],
  5: ["Executive Suite", "Premier Lake View Room", "Family Apartment", "Penthouse Master Room"],
  6: ["Premier Lake View Room", "Executive Suite", "Penthouse Master Room", "Family Apartment"],
  7: ["Penthouse Suite", "Penthouse Master Room", "Premier Lake View Room", "Family Apartment"],
};

function buildRooms() {
  const rooms: { floor: number; number: number; label: string; type: string; status: "available" | "booked"; }[] = [];
  for (let floor = 1; floor <= 7; floor++) {
    for (let r = 0; r < 4; r++) {
      const label = `${String.fromCharCode(65 + r)}${floor}`;
      rooms.push({ floor, number: r + 1, label, type: ROOM_TYPES[floor][r], status: "available" });
    }
  }
  return rooms;
}

export const Route = createFileRoute("/api/rooms")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const db = await getDb();
          const all = await db.collection("rooms").find().toArray();
          const bookedMap = new Map(all.map((r: any) => [r.label, r]));

          const rooms = buildRooms().map((r) => {
            const booked = bookedMap.get(r.label);
            return booked ? { ...r, status: "booked", guest_name: booked.guest_name, check_in: booked.check_in, check_out: booked.check_out } : r;
          });

          return json(rooms);
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },

      POST: async ({ request }) => {
        try {
          const { label, guest_name, check_in, check_out, action } = await request.json();
          const db = await getDb();

          if (action === "free") {
            await db.collection("rooms").deleteOne({ label });
            return json({ success: true, status: "available" });
          }

          const room = buildRooms().find((r) => r.label === label);
          if (!room) return json({ error: "Room not found" }, 400);

          const doc = { label, floor: room.floor, number: room.number, type: room.type, guest_name: guest_name || "Walk-in Guest", check_in: check_in || null, check_out: check_out || null, created_at: new Date() };

          await db.collection("rooms").updateOne({ label }, { $set: doc }, { upsert: true });
          return json({ success: true, status: "booked" });
        } catch (err: any) {
          return json({ error: err?.message }, 500);
        }
      },
    },
  },
});
