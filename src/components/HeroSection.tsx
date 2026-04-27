import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import heroProjector from "@/assets/hero-projector.jpg";
import heroCctv from "@/assets/hero-cctv.jpg";
import heroHometheater from "@/assets/hero-hometheater.jpg";

const slides = [
  {
    image: heroProjector,
    eyebrow: "Featured Collection",
    title: "Cinematic 4K Projectors",
    subtitle: "Engineered for clarity. Designed for presence. Starting at ₹49,990 with complimentary installation.",
    cta: "Shop Projectors",
  },
  {
    image: heroHometheater,
    eyebrow: "Curated Bundles",
    title: "The Complete Home Theater",
    subtitle: "Immersive sound, refined design. Save up to ₹35,000 on premium bundles.",
    cta: "Explore Bundles",
  },
  {
    image: heroCctv,
    eyebrow: "Professional Series",
    title: "Surveillance, Reimagined",
    subtitle: "Discreet. Reliable. Intelligent. From ₹9,990 with on-site survey included.",
    cta: "View CCTV Kits",
  },
];

const SLIDE_DURATION = 6500;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  const slide = slides[current];
  const titleWords = slide.title.split(" ");

  return (
    <section className="relative h-[460px] md:h-[560px] lg:h-[640px] overflow-hidden bg-primary">
      {/* Background ken-burns */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          {/* Editorial gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Subtle grain / texture line */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-primary-foreground/5 hidden lg:block" />

      <div className="relative container h-full flex items-center">
        <div className="max-w-2xl">
          {/* Eyebrow with accent line */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${current}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-accent" />
              <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-accent">
                {slide.eyebrow}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Title — staggered words */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-primary-foreground leading-[1.05] tracking-tight mb-6">
            <AnimatePresence mode="wait">
              <motion.span key={`title-${current}`} className="inline-block">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          </h1>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-primary-foreground/75 mb-10 max-w-xl leading-relaxed font-light"
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Actions */}
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="cta" size="lg">{slide.cta}</Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Get Bulk Quote
            </Button>
            <Button variant="whatsapp" size="lg">
              <MessageCircle className="h-5 w-5" />
              Talk to Expert
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Side navigation arrows — minimal */}
      <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-10">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-11 h-11 rounded-full border border-primary-foreground/20 text-primary-foreground/80 hover:border-accent hover:text-accent transition-all duration-300 flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-11 h-11 rounded-full border border-primary-foreground/20 text-primary-foreground/80 hover:border-accent hover:text-accent transition-all duration-300 flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur text-primary-foreground flex items-center justify-center"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur text-primary-foreground flex items-center justify-center"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Progress indicators — refined numbered */}
      <div className="absolute bottom-8 left-0 right-0 container flex items-center gap-6">
        {slides.map((_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="group flex items-center gap-3 flex-1 max-w-[120px]"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className={`text-xs font-medium tabular-nums transition-colors duration-300 ${isActive ? "text-accent" : "text-primary-foreground/40 group-hover:text-primary-foreground/70"}`}>
                0{i + 1}
              </span>
              <span className="relative flex-1 h-px bg-primary-foreground/15 overflow-hidden">
                <motion.span
                  key={`bar-${current}-${i}`}
                  initial={{ scaleX: isActive ? 0 : i < current ? 1 : 0 }}
                  animate={{ scaleX: isActive ? 1 : i < current ? 1 : 0 }}
                  transition={{ duration: isActive ? SLIDE_DURATION / 1000 : 0.4, ease: "linear" }}
                  className="absolute inset-0 bg-accent origin-left"
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HeroSection;
