'use client';

import React, { useEffect, useRef } from "react";
import { useConfigStore } from "@/lib/configurator/store";
import { renderDieline } from "@/lib/configurator/DielineRenderer";

export const DielineView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const store = useConfigStore();

  useEffect(() => {
    let active = true;

    renderDieline({
      boxType:      store.boxType,
      dimensions:   store.dimensions,
      watermarkSrc: "/images/inthebox-logo.png",
    }).then(({ canvas }) => {
      if (!active) return;
      const target = canvasRef.current;
      if (!target) return;
      
      const ctx = target.getContext("2d")!;
      target.width  = canvas.width;
      target.height = canvas.height;
      ctx.drawImage(canvas, 0, 0);
    });

    return () => {
      active = false;
    };
  }, [store.boxType, store.dimensions]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
      }}
      onContextMenu={(e) => e.preventDefault()} // Secure right-click prevention
    >
      <canvas
        ref={canvasRef}
        style={{ maxWidth: "100%", maxHeight: "100%", pointerEvents: "none" }}
      />
    </div>
  );
};

export default DielineView;
