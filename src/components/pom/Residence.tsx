import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function openBooking(apartment?: string, image?: string) {
  window.dispatchEvent(new CustomEvent("poms:open-booking", { detail: { name: apartment, image } }));
}

export function Residence() {
  const { data: settings } = useSettings();
  const aptData = settings?.residence_settings || {};
  const apartments = aptData.items || [
    { name: "3 BHK", images: [], price: "$150", desc: "Spacious three-bedroom apartment with modern living room, fully equipped kitchen, and scenic balcony views.", capacity: "4–6 Guests", area: "120 m²", features: ["3 Bedrooms", "Living Room", "Full Kitchen", "2 Bathrooms"] },
    { name: "2 BHK", images: [], price: "$110", desc: "Comfortable two-bedroom apartment perfect for families, featuring a bright hall and modular kitchen.", capacity: "3–5 Guests", area: "85 m²", features: ["2 Bedrooms", "Living Room", "Full Kitchen", "1 Bathroom"] },
    { name: "1 BHK", images: [], price: "$75", desc: "Cozy one-bedroom apartment with an attached hall and kitchen — ideal for couples or solo travelers.", capacity: "1–3 Guests", area: "55 m²", features: ["1 Bedroom", "Living Room", "Kitchenette", "1 Bathroom"] },
    { name: "Studio Apartment", images: [], price: "$55", desc: "Compact open-plan studio with a kitchenette and smart storage — designed for modern urban living.", capacity: "1–2 Guests", area: "35 m²", features: ["Open Layout", "Kitchenette", "Workspace", "Smart TV"] },
  ];

  return (
    <section id="apartments" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />The Residences<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Featured <span className="italic text-gold">Apartments</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 text-muted-foreground">
            Four thoughtfully designed residences to suit every need — from studio living to family comfort.
          </motion.p>
        </div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {apartments.map((a: any, i: number) => (
            <motion.article
              key={a.name} variants={scaleIn}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_30px_60px_-25px_rgba(201,168,108,0.2)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {(a.images?.[0] || a.image) && (
                <img
                  src={a.images?.[0] || a.image}
                  alt={a.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <h3 className="font-display text-xl font-medium">{a.name}</h3>
                  <p className="mt-1 text-xs text-white/60">{a.capacity} · {a.area}</p>
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-gold/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                  {a.price}/night
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-muted-foreground line-clamp-2">{a.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.features?.map((f: string) => (
                    <span key={f} className="rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] text-luxury-black/75 transition-colors group-hover:border-gold/30">{f}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">From</span>
                    <span className="font-display text-lg text-luxury-black">{a.price}<span className="ml-1 text-xs text-muted-foreground">/ night</span></span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => openBooking(a.name, a.image)}
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
