import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useRooms, useUpdateRoom } from "@/lib/hooks";
import { BedDouble, Check, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/building")({
  component: BuildingPage,
});

function BuildingPage() {
  const { data: rooms = [], isLoading } = useRooms();
  const updateRoom = useUpdateRoom();
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [bookingModal, setBookingModal] = useState<{ label: string; type: string } | null>(null);
  const [guestName, setGuestName] = useState("");

  const floors = [1, 2, 3, 4, 5, 6, 7];

  const handleBook = async () => {
    if (!bookingModal) return;
    try {
      await updateRoom.mutateAsync({ label: bookingModal.label, guest_name: guestName || "Walk-in Guest", action: "book" });
      toast.success(`${bookingModal.label} — ${bookingModal.type} booked`);
      setBookingModal(null);
      setGuestName("");
    } catch {
      toast.error("Failed to book room");
    }
  };

  const handleFree = async (label: string) => {
    try {
      await updateRoom.mutateAsync({ label, action: "free" });
      toast.success(`${label} marked as available`);
    } catch {
      toast.error("Failed to free room");
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-sm text-foreground/60">Loading rooms...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Building View</h1>
        <p className="text-sm text-foreground/60">7 floors &middot; 4 rooms per floor &middot; {rooms.filter((r) => r.status === "available").length} available</p>
      </div>

      {/* Building visualization */}
      <div className="bg-background border rounded-xl p-6">
        <div className="mx-auto flex max-w-lg flex-col-reverse gap-2">
          {floors.map((floor) => {
            const floorRooms = rooms.filter((r) => r.floor === floor);
            const bookedCount = floorRooms.filter((r) => r.status === "booked").length;
            const isSelected = selectedFloor === floor;
            return (
              <div key={floor}>
                <button
                  onClick={() => setSelectedFloor(isSelected ? null : floor)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-2 text-left text-sm font-medium transition ${isSelected ? "border-gold bg-gold/5" : "border-border hover:bg-muted/50"}`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-[10px] font-bold">{floor}</span>
                  <span>Floor {floor}</span>
                  <span className="ml-auto text-xs text-foreground/60">{bookedCount > 0 ? `${bookedCount}/4 booked` : "All available"}</span>
                </button>
                {isSelected && (
                  <div className="mt-2 grid grid-cols-4 gap-2 px-2">
                    {floorRooms.map((room) => {
                      const isBooked = room.status === "booked";
                      return (
                        <div
                          key={room.label}
                          className={`relative flex cursor-pointer flex-col items-center rounded-xl border p-3 text-center transition hover:shadow-md ${
                            isBooked
                              ? "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
                              : "border-green-300 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300"
                          }`}
                          onClick={() => {
                            if (isBooked) {
                              handleFree(room.label);
                            } else {
                              setBookingModal({ label: room.label, type: room.type });
                            }
                          }}
                        >
                          <BedDouble size={18} className="mb-1" />
                          <span className="text-[11px] font-bold">{room.label}</span>
                          <span className="text-[9px] leading-tight opacity-70">{room.type}</span>
                          {isBooked && <span className="mt-1 text-[9px] font-medium">{room.guest_name}</span>}
                          <div className="mt-1 flex gap-1">
                            <span className={`inline-block size-2 rounded-full ${isBooked ? "bg-red-500" : "bg-green-500"}`} />
                            <span className="text-[9px]">{isBooked ? "Booked" : "Free"}</span>
                          </div>
                          {isBooked && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleFree(room.label); }}
                              className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition hover:opacity-100"
                              title="Mark as free"
                            >
                              <X size={10} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-green-500" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-red-500" />
          Booked
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-green-500" />
          <span className="text-xs text-foreground/60">{rooms.filter((r) => r.status === "available").length} free</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-red-500" />
          <span className="text-xs text-foreground/60">{rooms.filter((r) => r.status === "booked").length} booked</span>
        </div>
      </div>

      {/* Book room modal */}
      {bookingModal && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setBookingModal(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-background border rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-semibold text-lg mb-1">Book Room</h3>
              <p className="text-sm text-foreground/60 mb-4">{bookingModal.label} — {bookingModal.type}</p>
              <input
                placeholder="Guest name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm mb-4"
                autoFocus
              />
              <div className="flex gap-2">
                <button onClick={handleBook} disabled={updateRoom.isPending} className="flex-1 btn-primary justify-center text-sm py-2 disabled:opacity-50">
                  <Check size={14} className="inline mr-1" /> Confirm Booking
                </button>
                <button onClick={() => setBookingModal(null)} className="flex-1 border rounded-full py-2 text-sm hover:bg-muted transition">Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
