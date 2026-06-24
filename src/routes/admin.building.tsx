import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useRooms, useUpdateRoom, useRoomConfig, useUpdateRoomConfig, useDeleteRoomFromConfig } from "@/lib/hooks";
import { BedDouble, Check, X, Plus, Trash2, Settings2, Building2, ChevronDown, ChevronUp, Save, Pencil } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/building")({
  component: BuildingPage,
});

const ALL_ROOM_TYPES = [
  "Studio Apartment",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "Single Room — Single Bed",
  "Single Room — Double Bed",
  "Single Room — Twin Bed",
];

function BuildingPage() {
  const { data: rooms = [], isLoading } = useRooms();
  const { data: roomConfig, isLoading: configLoading } = useRoomConfig();
  const updateRoom = useUpdateRoom();
  const updateRoomConfig = useUpdateRoomConfig();
  const deleteRoomFromConfig = useDeleteRoomFromConfig();

  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [bookingModal, setBookingModal] = useState<{ label: string; type: string } | null>(null);
  const [guestName, setGuestName] = useState("");
  const [manageMode, setManageMode] = useState(false);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [editType, setEditType] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFloor, setNewFloor] = useState(1);
  const [newType, setNewType] = useState("Studio Apartment");
  const [newLabel, setNewLabel] = useState("");

  const floors = [1, 2, 3, 4, 5, 6, 7];

  const config = roomConfig || [];

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

  const startEdit = (label: string, currentType: string) => {
    setEditingRoom(label);
    setEditType(currentType);
  };

  const saveEdit = async (label: string) => {
    const updated = config.map((r) => r.label === label ? { ...r, type: editType } : r);
    try {
      await updateRoomConfig.mutateAsync(updated);
      toast.success("Room type updated");
      setEditingRoom(null);
    } catch {
      toast.error("Failed to update room");
    }
  };

  const handleDeleteRoom = async (label: string) => {
    try {
      await deleteRoomFromConfig.mutateAsync(label);
      toast.success(`Room ${label} removed`);
    } catch {
      toast.error("Failed to remove room");
    }
  };

  const handleAddRoom = async () => {
    if (!newLabel.trim()) {
      toast.error("Room label is required");
      return;
    }
    if (config.some((r) => r.label === newLabel.trim())) {
      toast.error("Room label already exists");
      return;
    }
    const roomsOnFloor = config.filter((r) => r.floor === newFloor);
    const nextNumber = roomsOnFloor.length + 1;
    const updated = [...config, { floor: newFloor, number: nextNumber, label: newLabel.trim(), type: newType }];
    try {
      await updateRoomConfig.mutateAsync(updated);
      toast.success(`Room ${newLabel} added`);
      setNewLabel("");
      setNewType("Studio Apartment");
      setShowAddForm(false);
    } catch {
      toast.error("Failed to add room");
    }
  };

  if (isLoading || configLoading) {
    return <div className="flex items-center justify-center py-20 text-sm text-foreground/60">Loading rooms...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Building View</h1>
          <p className="text-sm text-foreground/60">
            {manageMode
              ? "Add, edit, or remove rooms from the building"
              : `${floors.length} floors · ${config.length} rooms · ${rooms.filter((r) => r.status === "available").length} available`
            }
          </p>
        </div>
        <button
          onClick={() => setManageMode(!manageMode)}
          className={`flex items-center gap-2 text-sm border rounded-lg px-3 py-2 transition ${manageMode ? "bg-gold text-black border-gold" : "hover:bg-muted"}`}
        >
          <Settings2 size={14} /> {manageMode ? "View Building" : "Manage Rooms"}
        </button>
      </div>

      {manageMode ? (
        /* ========== MANAGE ROOMS MODE ========== */
        <div className="bg-background border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
            <h3 className="text-sm font-medium">Room Configuration ({config.length} rooms)</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1 text-xs bg-gold text-black rounded-lg px-3 py-1.5 font-medium"
            >
              <Plus size={12} /> Add Room
            </button>
          </div>

          {showAddForm && (
            <div className="border-b bg-muted/20 p-4">
              <div className="flex flex-wrap items-end gap-3 max-w-2xl">
                <div>
                  <label className="text-xs text-foreground/60 block mb-1">Floor</label>
                  <select
                    value={newFloor}
                    onChange={(e) => setNewFloor(Number(e.target.value))}
                    className="rounded-lg border px-3 py-2 bg-transparent outline-none text-sm"
                  >
                    {floors.map((f) => <option key={f} value={f}>Floor {f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-foreground/60 block mb-1">Label</label>
                  <input
                    placeholder="e.g. D1"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    className="rounded-lg border px-3 py-2 bg-transparent outline-none text-sm w-20"
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/60 block mb-1">Room Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="rounded-lg border px-3 py-2 bg-transparent outline-none text-sm"
                  >
                    {ALL_ROOM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <button onClick={handleAddRoom} className="btn-primary text-xs py-2 px-3">
                  <Plus size={12} className="inline mr-1" /> Add
                </button>
                <button onClick={() => setShowAddForm(false)} className="text-xs border rounded-lg px-3 py-2 hover:bg-muted transition">
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium">Floor</th>
                  <th className="text-left px-4 py-3 font-medium">Label</th>
                  <th className="text-left px-4 py-3 font-medium">Room Type</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {config.map((r) => {
                  const room = rooms.find((rm) => rm.label === r.label);
                  const isBooked = room?.status === "booked";
                  const isEditing = editingRoom === r.label;
                  return (
                    <tr key={r.label} className="hover:bg-muted/30 transition">
                      <td className="px-4 py-3">Floor {r.floor}</td>
                      <td className="px-4 py-3 font-medium">{r.label}</td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <select
                              value={editType}
                              onChange={(e) => setEditType(e.target.value)}
                              className="rounded-lg border px-2 py-1 bg-transparent outline-none text-xs"
                            >
                              {ALL_ROOM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <button onClick={() => saveEdit(r.label)} className="p-1 text-emerald-600 hover:bg-emerald-100 rounded">
                              <Check size={14} />
                            </button>
                            <button onClick={() => setEditingRoom(null)} className="p-1 text-red-600 hover:bg-red-100 rounded">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span>{r.type}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${
                          isBooked
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                          <span className={`size-1.5 rounded-full ${isBooked ? "bg-red-500" : "bg-green-500"}`} />
                          {isBooked ? "Booked" : "Available"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => startEdit(r.label, r.type)} className="p-1.5 rounded-lg hover:bg-muted transition" title="Edit type">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDeleteRoom(r.label)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition" title="Remove room">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {config.length === 0 && (
            <p className="text-center py-8 text-sm text-foreground/60">No rooms configured — add your first one</p>
          )}
        </div>
      ) : (
        /* ========== BUILDING VISUAL MODE ========== */
        <>
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
                      <span className="ml-auto text-xs text-foreground/60">{bookedCount > 0 ? `${bookedCount}/${floorRooms.length} booked` : "All available"}</span>
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
        </>
      )}

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
