import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
  badge?: string;
}

const ProductGallery = ({ images, name, badge }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number, dir?: number) => {
    setDirection(dir ?? (index > activeIndex ? 1 : -1));
    setActiveIndex(index);
    setIsZooming(false);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) goTo(activeIndex - 1, -1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    if (activeIndex < images.length - 1) goTo(activeIndex + 1, 1);
  }, [activeIndex, images.length, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setIsZooming(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (Math.abs(distance) >= 50) {
      if (distance > 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
    touchEnd.current = null;
  };

  // Zoom on hover (desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Zoom on tap (mobile)
  const handleTap = () => {
    setIsZooming((prev) => !prev);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image */}
      <div
        ref={imageContainerRef}
        className={cn(
          "bg-surface rounded-2xl border border-border relative overflow-hidden min-h-[300px] lg:min-h-[400px] flex items-center justify-center group",
          isZooming ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onClick={handleTap}
      >
        {badge && (
          <span className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-lg">
            {badge}
          </span>
        )}

        {/* Zoom hint */}
        <span className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-xs text-muted-foreground bg-card/80 backdrop-blur px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="h-3.5 w-3.5" /> Hover to zoom
        </span>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={images[activeIndex]}
              alt={`${name} - Image ${activeIndex + 1}`}
              className={cn(
                "max-w-full max-h-[350px] object-contain p-8 transition-transform duration-200 ease-out",
                isZooming && "scale-[2.2]"
              )}
              style={isZooming ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              disabled={activeIndex === 0}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center transition-all z-10",
                activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-card hover:shadow-md"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              disabled={activeIndex === images.length - 1}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center transition-all z-10",
                activeIndex === images.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-card hover:shadow-md"
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}

        {/* Dot indicators (mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i === activeIndex ? "bg-accent w-5" : "bg-muted-foreground/30"
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="hidden lg:flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-surface transition-all p-1.5",
                i === activeIndex
                  ? "border-accent shadow-sm"
                  : "border-border hover:border-muted-foreground/50"
              )}
            >
              <img
                src={img}
                alt={`${name} thumbnail ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
