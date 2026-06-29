import { motion } from "framer-motion";
import { useSettings } from "@/lib/hooks";
import { Tv, Snowflake, Utensils, Refrigerator, WashingMachine, Wind, Briefcase, Droplets, Zap, ShieldCheck, ArrowUpDown, Car } from "lucide-react";

const scaleIn = { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const ICON_MAP: Record<string, any> = {
  "Smart TV": Tv, "Air Conditioning": Snowflake, "Equipped Kitchen": Utensils,
  "Refrigerator": Refrigerator, "Washing Machine": WashingMachine, "Private Balcony": Wind,
  "Workspace": Briefcase, "Hot Water": Droplets, "Backup Power": Zap,
  "Security Cameras": ShieldCheck, "Elevator Access": ArrowUpDown, "Free Parking": Car,
};

export function Amenities() {
  const { data: settings } = useSettings();
  const amen = settings?.amenities_settings || {};
  const title = amen.title || "Luxury Amenities";
  const subtitle = amen.subtitle || "Everything you'd expect from a premium hotel — quietly built into every apartment.";
  const items = amen.items || [
    { name: "Smart TV" }, { name: "Air Conditioning" }, { name: "Equipped Kitchen" },
    { name: "Refrigerator" }, { name: "Washing Machine" }, { name: "Private Balcony" },
    { name: "Workspace" }, { name: "Hot Water" }, { name: "Backup Power" },
    { name: "Security Cameras" }, { name: "Elevator Access" }, { name: "Free Parking" },
  ];

  return (
    <section id="amenities" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />In-Residence<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            {title}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 text-muted-foreground">{subtitle}</motion.p>
        </div>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((item: any) => {
            const Icon = ICON_MAP[item.name] || Tv;
            return (
              <motion.div
                key={item.name} variants={scaleIn}
                className="group flex flex-col items-center justify-center gap-4 bg-background p-8 text-center transition-all duration-500 hover:bg-luxury-black hover:text-white"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.15 }}
                  className="grid size-14 place-items-center rounded-2xl border border-gold/40 text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/15"
                >
                  <Icon className="size-6" />
                </motion.div>
                <span className="text-sm font-medium tracking-wide">{item.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
