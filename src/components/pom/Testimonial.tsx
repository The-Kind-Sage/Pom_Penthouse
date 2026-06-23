import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Sophie Laurent", country: "France", text: "The most thoughtful stay I've had in Asia. The view of Phewa from the balcony alone is worth the trip — but the service is what brings you back.", img: "https://i.pravatar.cc/120?img=47" },
  { name: "James Whitaker", country: "United Kingdom", text: "I worked from POM'S for two months. Fast WiFi, quiet apartments, and a team that genuinely cares. It set a new bar for me.", img: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Sharma", country: "India", text: "Travelled with my family — children, in-laws, the lot. The space, the kitchen, the calm. We've already booked again.", img: "https://i.pravatar.cc/120?img=45" },
];

function SectionEyebrow({ label, title }: { label: string; title: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
        <span className="h-px w-8 bg-gold" />{label}<span className="h-px w-8 bg-gold" />
      </div>
      <h2 className="font-display text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}

export function Testimonial() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const current = TESTIMONIALS[i];
  return (
    <section className="bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionEyebrow label="Guest Stories" title={<>Loved by guests <span className="italic text-gold">worldwide</span></>} />
        <motion.blockquote
          key={current.name}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mt-14"
        >
          <div className="flex items-center justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, n) => <Star key={n} className="size-4 fill-gold" />)}
          </div>
          <p className="mt-6 font-display text-2xl leading-relaxed text-luxury-black sm:text-3xl">
            &ldquo;{current.text}&rdquo;
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <img src={current.img} alt={current.name} className="size-12 rounded-full object-cover" />
            <div className="text-left">
              <div className="font-semibold text-luxury-black">{current.name}</div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{current.country}</div>
            </div>
          </div>
        </motion.blockquote>
        <div className="mt-10 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx} onClick={() => setI(idx)} aria-label={`Testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2 bg-luxury-black/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
