import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useSettings } from "@/lib/hooks";

export function FAQ() {
  const { data: settings } = useSettings();
  const faq = settings?.faq_settings || {};
  const title = faq.title || "Questions";
  const faqs = faq.items || [
    { q: "Is it freehold?", a: "Yes, full freehold ownership. Ready to transfer." },
    { q: "Can I book nightly stays?", a: "Yes, via Book a Stay. 2-night minimum. Instant request." },
  ];

  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
      <div className="relative max-w-[720px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" />FAQ<span className="h-px w-8 bg-gold" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-center text-4xl font-medium leading-tight text-luxury-black sm:text-5xl mb-12">{title}</motion.h2>
        <ul className="divide-y border-y border-border rounded-2xl overflow-hidden bg-card border">
          {faqs.map((f: any, i: number) => {
            const isOpen = open === i;
            return (
              <li key={i} className="bg-card">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center py-5 px-6 text-left gap-6 transition-colors hover:bg-muted/50"
                  aria-expanded={isOpen}
                >
                  <span className={`font-display text-xl md:text-2xl transition-colors ${isOpen ? "text-gold" : "text-luxury-black"}`}>{f.q}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {isOpen ? <Minus size={18} className="text-gold shrink-0" /> : <Plus size={18} className="text-gold shrink-0" />}
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 px-6 text-muted-foreground leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
