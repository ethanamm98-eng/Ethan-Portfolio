"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CreativeCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [label, setLabel] = useState("");
  const rafRef = useRef<number | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  useEffect(() => {
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!isFinePointer) return;

    const updatePointerState = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) {
        setIsPointer(false);
        setLabel("");
        return;
      }

      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, summary, .cursor-hover'
      ) as HTMLElement | null;

      setIsPointer(Boolean(interactive));

      if (!interactive) {
        setLabel("");
        return;
      }

      const cursorLabel =
        interactive.dataset.cursor ||
        interactive.getAttribute("aria-label") ||
        "";

      setLabel(cursorLabel.length <= 12 ? cursorLabel : "");
    };

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });

      setIsVisible(true);
      updatePointerState(e.target);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [ringX, ringY, x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 hidden lg:block"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.8 : 1,
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <div className="relative">
          <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.75)]" />
          <div className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-cyan-400/70 blur-[6px]" />
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9998 hidden lg:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isPointer ? 84 : 38,
          height: isPointer ? 84 : 38,
          scale: isPressed ? 0.92 : 1,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 rounded-full border border-white/35 bg-white/4 backdrop-blur-[2px] shadow-[0_0_30px_rgba(99,102,241,0.16)]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)]" />
        {isPointer && label ? (
          <span className="relative text-[10px] font-medium uppercase tracking-[0.22em] text-white/85">
            {label}
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
