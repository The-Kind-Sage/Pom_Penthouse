import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Wifi, Star, Bed, Check } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const ICONS: Record<string, any> = { "Remote Workers": Briefcase, "Digital Nomads": Wifi, "Business Travelers": Star, "Relocating Families": Bed };

function openBooking() {
  window.dispatchEvent(new CustomEvent("poms:open-booking"));
}

export function LongTerm() {
  const { data: settings } = useSettings();
  const lt = settings?.longterm_settings || {};
  const title = lt.title || "Weekly & Monthly Stay Packages";
  const subtitle = lt.subtitle || "Built for those who treat Pokhara as more than a stopover.";
  const features = lt.features || ["Fully Furnished", "Utilities Included", "Flexible Contracts", "Better Monthly Rates"];
  const items = lt.items || [];
  const bgImg = lt.image || "/images/gal-lake.jpg";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgImg} alt="" className="size-full object-cover opacity-25" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-black/95 to-luxury-black/85" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Stay Longer, Live Better<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base text-white/70">{subtitle}</motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {features.map((b: string) => (
            <motion.div
              key={b} variants={fadeUp}
              className="flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-sm text-gold"
            >
              <Check className="size-4" />
              <span className="font-medium">{b}</span>
            </motion.div>
          ))}
        </motion.div>

        {items.length > 0 && (
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((item: any) => {
              const Icon = ICONS[item.title] || Briefcase;
              return (
                <motion.div
                  key={item.title} variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-white/10"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gold/15 text-gold transition-colors group-hover:bg-gold/25">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-medium text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110"
          >
            Request Long-Term Pricing <ArrowRight className="size-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
