import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

export const scrollRevealClasses = (isVisible: boolean, delay: number = 0) => {
  const baseClasses = "transition-all duration-700 ease-out";
  const visibleClasses = "opacity-100 translate-y-0";
  const hiddenClasses = "opacity-0 translate-y-8";
  const delayClass = delay > 0 ? `delay-[${delay}ms]` : "";
  
  return `${baseClasses} ${isVisible ? visibleClasses : hiddenClasses} ${delayClass}`;
};
