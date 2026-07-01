import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

function VideoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1.02, 1.02, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -6]);

  const springScale = useSpring(scale, { stiffness: 100, damping: 22, mass: 0.7 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 22, mass: 0.7 });

  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.7, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.65, 0.95], [80, 0, 0, -60]);
  const badgeScale = useTransform(scrollYProgress, [0, 0.28, 0.72, 0.95], [0.9, 1, 1, 0.95]);
  const paragraphY = useTransform(scrollYProgress, [0, 0.34, 0.68, 0.95], [60, 0, 0, -40]);
  const ctaY = useTransform(scrollYProgress, [0, 0.38, 0.71, 0.95], [40, 0, 0, -20]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleLoadedData = () => setIsVideoReady(true);

    if (video.readyState >= 2) {
      setIsVideoReady(true);
    } else {
      video.addEventListener("loadeddata", handleLoadedData);
    }

    return () => video.removeEventListener("loadeddata", handleLoadedData);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !isVideoReady || !video.duration) return;

    const targetTime = progress * video.duration;
    const diff = targetTime - video.currentTime;

    if (Math.abs(diff) > 0.01) {
      video.currentTime += diff * 0.18;
    } else {
      video.currentTime = targetTime;
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-luxury-black"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            y,
            scale: springScale,
            rotateX: springRotateX,
            opacity,
            transformPerspective: 1200,
            transformOrigin: "center center",
          }}
          className="relative w-full h-full"
        >
          <video
            ref={videoRef}
            src="/assets/video1.mp4"
            className="size-full object-cover"
            muted
            playsInline
            preload="auto"
            style={{ willChange: "transform" }}
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.75)_100%)]" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-luxury-black to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-luxury-black to-transparent" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 blur-[140px] rounded-full" />
        </motion.div>

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="text-center px-6 will-change-transform"
          >
            <motion.span
              style={{ scale: badgeScale }}
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gold mb-6 origin-center"
            >
              <span className="h-px w-12 bg-gold/60" />
              The Experience
              <span className="h-px w-12 bg-gold/60" />
            </motion.span>

            <h2 className="font-display text-4xl font-medium text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              Life at <span className="italic text-gold">POM&apos;S</span>
            </h2>

            <motion.p
              style={{ y: paragraphY }}
              className="mt-6 max-w-lg mx-auto text-sm text-white/70 sm:text-base drop-shadow-md"
            >
              Where every moment is crafted for luxury living
            </motion.p>

            <motion.div style={{ y: ctaY }} className="mt-8 pointer-events-auto">
              <a
                href="/apartments"
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm transition-all duration-500 hover:bg-gold/25 hover:border-gold/70 hover:shadow-[0_0_40px_rgba(201,168,108,0.4)]"
              >
                Explore
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll to explore</span>
            <motion.div
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-12 w-px bg-gradient-to-b from-gold/80 to-transparent origin-top"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export { VideoScroll };
