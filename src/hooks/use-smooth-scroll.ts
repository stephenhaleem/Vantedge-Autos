import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Custom smooth scroll using GSAP ticker.
 * Wraps the page content in a smooth-scrolling container
 * and re-maps ScrollTrigger to use the wrapper's transform.
 */
export function useSmoothScroll() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const viewport = document.querySelector<HTMLDivElement>(".smooth-viewport");
    const content = document.querySelector<HTMLDivElement>(".smooth-content");
    if (!viewport || !content) return;

    let current = 0;
    let target = 0;
    const ease = 0.08;

    // Lock body
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    // Set the scroll height on the viewport
    const setHeight = () => {
      viewport.style.height = `${content.offsetHeight}px`;
    };
    setHeight();
    window.addEventListener("resize", setHeight);

    // GSAP ticker loop
    gsap.ticker.add(() => {
      target = window.scrollY || window.pageYOffset;
      // Use the viewport scrollTop when available
      // We'll capture the actual scroll from the window
    });

    // Override scroll with smooth version via wheel events
    let isScrolling = false;
    let wheelAccum = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccum += e.deltaY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    // Render loop
    const render = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Smooth toward the target
      current += (scrollY - current) * ease;
      current = Math.round(current * 100) / 100;

      gsap.set(content, {
        y: -current,
        force3D: true,
      });

      // Update ScrollTrigger
      ScrollTrigger.refresh();
      requestAnimationFrame(render);
    };

    const raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);
}
