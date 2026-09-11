'use client';

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export const ScreenshotOverlay = () => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setVisible(true);
        setTimeout(() => setVisible(false), 2500);
      }
    };

    let hiddenAt = 0;
    const handleVisibility = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
      } else {
        // If tab was hidden for less than 3s and then came back,
        // likely triggered by an external screenshot tool cropping screen
        if (Date.now() - hiddenAt < 3000 && hiddenAt > 0) {
          setVisible(true);
          setTimeout(() => setVisible(false), 2000);
        }
        hiddenAt = 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Expose toggle globally in dev mode for console verification checks
  useEffect(() => {
    if (import.meta.env.DEV) {
      (window as any).setScreenshotOverlayVisible = setVisible;
    }
    return () => {
      if (import.meta.env.DEV) {
        delete (window as any).setScreenshotOverlayVisible;
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(5,5,5,0.97)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        // Skip the fade-flash animation when prefers-reduced-motion is active;
        // the overlay still appears for IP-protection purposes.
        animation: reducedMotion ? "none" : "screenshotFlash 2.5s ease forwards",
      }}
    >
      <img
        src="/images/inthebox-logo.png"
        alt="InTheBox logo"
        style={{ height: 48, marginBottom: 16 }}
      />
      <p style={{ color: "#A1A1AA", fontSize: 14, fontFamily: "Inter, sans-serif" }}>
        © InTheBox — All Rights Reserved
      </p>
    </div>
  );
};

export default ScreenshotOverlay;

