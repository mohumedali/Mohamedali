"use client";

import { useEffect } from "react";

/** One delegated listener for every `.spotlight` card on the page (writes CSS variables, never re-renders). */
export function SpotlightTracker() {
  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
