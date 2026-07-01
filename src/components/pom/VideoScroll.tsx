import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import videoSrc from "@/assets/video1.mp4";

function VideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const brightness = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.8]);

  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.2;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);

      if (progress > 0 && progress < 1) {
        video.currentTime = progress * video.duration;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[150vh] w-full overflow-hidden bg-luxury-black"
    >
      {/* Sticky video container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black z-10 pointer-events-none" />

        {/* Video with 3D transforms */}
        <motion.div
          style={{
            y,
            scale: springScale,
            rotateX: springRotateX,
            opacity,
            transformPerspective: 1200,
          }}
          className="relative w-full h-full"
        >
          <motion.video
            ref={videoRef}
            src={videoSrc}
            className="size-full object-cover"
            style={{
              filter: useTransform(brightness, (v) => `brightness(${v})`),
            }}
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* Golden vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

          {/* Top gold glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gold/10 blur-[100px]" />

          {/* Bottom gold glow */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gold/8 blur-[80px]" />
        </motion.div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold mb-4">
              <span className="h-px w-8 bg-gold/50" />
              The Experience
              <span className="h-px w-8 bg-gold/50" />
            </span>
            <h2 className="font-display text-4xl font-medium text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Life at <span className="italic text-gold">POM'S</span>
            </h2>
            <p className="mt-4 max-w-md mx-auto text-sm text-white/60 sm:text-base">
              Where every moment is crafted for luxury living
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
            <div className="h-10 w-px bg-gradient-to-b from-gold/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export { VideoScroll };
