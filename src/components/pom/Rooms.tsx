import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function openBooking(room?: string, image?: string) {
  window.dispatchEvent(new CustomEvent("poms:open-booking", { detail: { name: room, image } }));
}

export function Rooms() {
  const { data: settings } = useSettings();
  const roomsData = settings?.rooms_settings || {};
  const rooms = (roomsData.items || [
    { name: "Single Room — Double Bed", images: [], price: "$40", size: "22 m²", beds: "1 Double Bed", view: "Garden View", features: ["Double Bed", "Desk", "WiFi", "Smart TV"] },
    { name: "Single Room — Twin Bed", images: [], price: "$45", size: "24 m²", beds: "2 Single Beds", view: "Mountain View", features: ["2 Singles", "Mini Fridge", "WiFi", "AC"] },
  ]).map((r: any) => ({
    ...r,
    name: r.name === "Single Room — Single Bed" ? "Single Room — Double Bed" : r.name,
  }));

  return (
    <section id="rooms" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Our Rooms<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Choose Your <span className="italic text-gold">Room</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 text-muted-foreground">
            Simple, comfortable rooms for short stays — designed for rest and productivity.
          </motion.p>
        </div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rooms.map((r: any) => (
            <motion.article
              key={r.name} variants={scaleIn}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_30px_60px_-25px_rgba(201,168,108,0.2)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {(r.images?.[0] || r.image) && (
                <img
                  src={r.images?.[0] || r.image}
                  alt={r.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black backdrop-blur-md">
                  {r.view}
                </span>
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <h3 className="font-display text-xl font-medium">{r.name}</h3>
                  <p className="mt-1 text-xs text-white/60">{r.beds} · {r.size}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-1.5">
                  {r.features?.map((f: string) => (
                    <span key={f} className="rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] text-luxury-black/75 transition-colors group-hover:border-gold/30">{f}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">From</span>
                    <span className="font-display text-lg text-luxury-black">{r.price}<span className="ml-1 text-xs text-muted-foreground">/ night</span></span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => openBooking(r.name, r.image)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-luxury-black px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-black"
                  >
                    Book Now <ArrowRight className="size-3" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
