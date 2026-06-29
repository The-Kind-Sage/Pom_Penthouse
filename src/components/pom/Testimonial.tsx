import { motion } from "framer-motion";
import testImg from "@/assets/405915677.jpg";

export function Testimonial() {
  return (
    <section className="relative bg-muted overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 opacity-[0.03]">
        <img src={testImg} alt="" className="size-full object-cover" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Guest Stories<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
            Loved by guests <span className="italic text-gold">worldwide</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div
            className="sk-ww-google-reviews"
            data-embed-id="25692242"
          />
        </motion.div>
      </div>
    </section>
  );
}
