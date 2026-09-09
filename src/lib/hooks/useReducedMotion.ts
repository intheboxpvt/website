import { useState, useEffect } from "react";

/**
 * Returns true when the user has requested reduced motion via
 * the OS-level `prefers-reduced-motion: reduce` media query.
 * Subscribes to live changes (e.g. toggled in system settings).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    // Read synchronously on first render to avoid a flash
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
