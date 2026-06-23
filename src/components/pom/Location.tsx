import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const NEARBY = [
  ["Phewa Lake", "200 m"], ["Lakeside Market", "350 m"],
  ["Tal Barahi Temple", "1.2 km"], ["Restaurants & Cafes", "300 m"],
  ["Sarangkot Viewpoint", "12 km"], ["Pokhara Airport", "4 km"],
];

function SectionEyebrow({ label, title, kicker, light = false }: { label: string; title: React.ReactNode; kicker?: string; light?: boolean }) {
  return (
    <motion.div
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={stagger}
      className="mx-auto max-w-3xl text-center"
    >
      <motion.div variants={fadeUp} className={`mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] ${light ? "text-gold" : "text-gold"}`}>
        <span className="h-px w-8 bg-gold" />{label}<span className="h-px w-8 bg-gold" />
      </motion.div>
      <motion.h2 variants={fadeUp} className={`font-display text-4xl font-medium leading-tight sm:text-5xl ${light ? "text-white" : "text-luxury-black"}`}>
        {title}
      </motion.h2>
      {kicker && (
        <motion.p variants={fadeUp} className={`mt-5 text-base ${light ? "text-white/70" : "text-muted-foreground"}`}>
          {kicker}
        </motion.p>
      )}
    </motion.div>
  );
}

export function Location() {
  return (
    <section id="location" className="bg-luxury-black py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow
          light
          label="The Location"
          title={<>Lakeside, <span className="italic text-gold">Pokhara</span></>}
          kicker="Tucked between the lake and the mountains — moments from the city's best dining, boating and trails."
        />
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }}
            className="relative overflow-hidden border border-white/10"
          >
            <iframe
              title="POM'S Penthouse — Lakeside, Pokhara"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.7720105159715!2d83.95791376583846!3d28.209697011336996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995952ed26a383f%3A0x9b2bdf424583384a!2sPOM's+Penthouse!5e1!3m2!1sen!2snp!4v1782229596936!5m2!1sen!2snp"
              className="aspect-[4/3] w-full"
              style={{ colorScheme: "light" }}
              loading="lazy"
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h3 variants={fadeUp} className="font-display text-3xl text-white sm:text-4xl">Nearby Attractions</motion.h3>
            <motion.p variants={fadeUp} className="mt-4 max-w-lg text-white/65">
              Step out of the building and you're already where everyone else came to be.
            </motion.p>
            <motion.ul variants={stagger} className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {NEARBY.map(([name, dist]) => (
                <motion.li key={name} variants={fadeUp} className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-4">
                    <MapPin className="size-4 text-gold" />
                    <span className="font-display text-lg">{name}</span>
                  </div>
                  <span className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">{dist}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
