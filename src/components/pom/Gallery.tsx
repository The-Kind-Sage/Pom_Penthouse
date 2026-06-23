import { motion } from "framer-motion";
import aptPent from "@/assets/apt-penthouse.jpg";
import galBedroom from "@/assets/gal-bedroom.jpg";
import galKitchen from "@/assets/gal-kitchen.jpg";
import lifeBalcony from "@/assets/life-balcony.jpg";
import galLake from "@/assets/gal-lake.jpg";
import galBath from "@/assets/gal-bath.jpg";
import whyImg from "@/assets/why-choose.jpg";
import aptExec from "@/assets/apt-executive.jpg";

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const GALLERY = [
  { src: aptPent, label: "Living Room", span: "row-span-2" },
  { src: galBedroom, label: "Bedroom", span: "" },
  { src: galKitchen, label: "Kitchen", span: "" },
  { src: lifeBalcony, label: "Balcony View", span: "row-span-2" },
  { src: galLake, label: "Phewa Lake", span: "" },
  { src: galBath, label: "Bathroom", span: "" },
  { src: whyImg, label: "Exterior", span: "" },
  { src: aptExec, label: "Suite", span: "" },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold" />The Gallery<span className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-center text-4xl font-medium leading-tight text-luxury-black sm:text-5xl">
          Inside <span className="italic text-gold">POM&apos;S Penthouse</span>
        </h2>
        <p className="mt-5 text-center text-muted-foreground">
          A look through the residences, the building and the views that frame them.
        </p>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
        >
          {GALLERY.map((g, i) => (
            <motion.figure
              key={i} variants={fadeUp}
              className={`group relative overflow-hidden bg-muted ${g.span}`}
            >
              <img src={g.src} alt={g.label} loading="lazy" className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-luxury-black/0 transition group-hover:bg-luxury-black/40" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full p-4 text-white transition-transform duration-500 group-hover:translate-y-0">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">View</span>
                <div className="font-display text-lg">{g.label}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
