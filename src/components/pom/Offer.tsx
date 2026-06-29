import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/hooks";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function openBooking() {
  window.dispatchEvent(new CustomEvent("poms:open-booking"));
}

export function Offer() {
  const { data: settings } = useSettings();
  const offer = settings?.offer_settings || {};
  const title = offer.title || "Ready to Experience Premium Living?";
  const subtitle = offer.subtitle || "Book your luxury serviced apartment today. Our team will respond within the hour.";
  const btnText = offer.btn_text || "Book Now";
  const lifeItem = settings?.lifestyle_settings?.items?.[0] || {};
  const bgImg = lifeItem.image || "/images/gal-lake.jpg";
  const wa = settings?.footer_settings?.whatsapp || "https://wa.me/9779840814142";

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgImg} alt="" className="size-full object-cover opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/95 to-luxury-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-[150px] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center text-white sm:py-36">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold" />Reserve Your Stay<span className="h-px w-8 bg-gold" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl font-medium leading-tight sm:text-6xl">
            {title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-white/70">{subtitle}</motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button" onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-black transition hover:brightness-110"
            >
              {btnText}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={wa} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md transition hover:bg-white hover:text-luxury-black"
            >
              <MessageCircle className="size-4" /> WhatsApp Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
