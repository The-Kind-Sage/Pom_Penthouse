import { motion } from "framer-motion";
import { Users, Maximize, ArrowRight } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function openBooking(apartment?: string) {
  window.dispatchEvent(new CustomEvent("poms:open-booking", { detail: apartment }));
}

export function Residence() {
  const { data: settings } = useSettings();
  const aptData = settings?.residence_settings || {};
  const apartments = aptData.items || [
    { name: "3 BHK", image: "", price: "$150", desc: "Spacious three-bedroom apartment with modern living room, fully equipped kitchen, and scenic balcony views.", capacity: "4–6 Guests", area: "120 m²", features: ["3 Bedrooms", "Living Room", "Full Kitchen", "2 Bathrooms"] },
    { name: "2 BHK", image: "", price: "$110", desc: "Comfortable two-bedroom apartment perfect for families, featuring a bright hall and modular kitchen.", capacity: "3–5 Guests", area: "85 m²", features: ["2 Bedrooms", "Living Room", "Full Kitchen", "1 Bathroom"] },
    { name: "1 BHK", image: "", price: "$75", desc: "Cozy one-bedroom apartment with an attached hall and kitchen — ideal for couples or solo travelers.", capacity: "1–3 Guests", area: "55 m²", features: ["1 Bedroom", "Living Room", "Kitchenette", "1 Bathroom"] },
    { name: "Studio Apartment", image: "", price: "$55", desc: "Compact open-plan studio with a kitchenette and smart storage — designed for modern urban living.", capacity: "1–2 Guests", area: "35 m²", features: ["Open Layout", "Kitchenette", "Workspace", "Smart TV"] },
  ];

  return (
    <section id="apartments" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />The Residences<span className="h-px w-8 bg-gold" />
          </div>
          <h2 className="font-display text-3xl font-medium leading-tight text-luxury-black sm:text-4xl">
            Featured <span className="italic text-gold">Apartments</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Four thoughtfully designed residences to suit every need — from studio living to family comfort.
          </p>
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {apartments.map((a: any) => (
            <motion.article
              key={a.name} variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={a.image || ""}
                  alt={a.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-black">
                  Available
                </span>
                <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/35 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                  {a.price}<span className="text-white/60">/n</span>
                </span>
                <div className="absolute inset-x-3 bottom-3">
                  <h3 className="font-display text-lg font-medium text-white">{a.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-white/75">
                    <span className="inline-flex items-center gap-0.5"><Users className="size-3 text-gold" />{a.capacity}</span>
                    <span className="inline-flex items-center gap-0.5"><Maximize className="size-3 text-gold" />{a.area}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{a.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {a.features?.map((f: string) => (
                    <span key={f} className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-foreground/70">{f}</span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openBooking(a.name)}
                  className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-[10px] font-semibold uppercase tracking-widest text-foreground transition hover:bg-luxury-black hover:text-white hover:border-luxury-black mt-4"
                >
                  Book Now <ArrowRight className="size-3" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
