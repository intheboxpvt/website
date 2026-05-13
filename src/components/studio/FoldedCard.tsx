import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

interface FoldedCardProps {
  settings: any;
}

const FoldedCard = ({ settings }: FoldedCardProps) => {
  const group = useRef<THREE.Group>(null);
  const backPanel = useRef<THREE.Group>(null);

  // 1. Generate Dynamic Texture via HTML Canvas
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const draw = () => {
      // Clear
      ctx.fillStyle = settings.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle grain/texture
      ctx.globalAlpha = 0.05;
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1.0;

      // 4 Quadrants for 2 panels x 2 sides
      // [Top Left: Inside Left] [Top Right: Inside Right]
      // [Bottom Left: Back Cover] [Bottom Right: Front Cover]

      ctx.fillStyle = settings.textColor;
      ctx.textAlign = "center";

      // 1. Front Cover (Bottom Right)
      ctx.font = "bold 60px 'Playfair Display', serif";
      ctx.fillText(settings.frontText, 768, 768);
      
      // 2. Inside Right (Top Right) - The Story
      ctx.font = "30px sans-serif";
      const words = settings.insideText.split(" ");
      let line = "";
      let y = 300;
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        if (ctx.measureText(testLine).width > 400 && n > 0) {
          ctx.fillText(line, 768, y);
          line = words[n] + " ";
          y += 40;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 768, y);

      // 3. Inside Left (Top Left) - Logo/Branding
      ctx.font = "bold 40px 'Playfair Display', serif";
      ctx.fillText("InTheBox", 256, 512);

      // 4. Back Cover (Bottom Left) - Empty or minimal
      ctx.font = "14px sans-serif";
      ctx.fillText("Handcrafted in Mohali", 256, 900);

      // Foil Effect Simulation
      if (settings.foilEffect) {
        const gradient = ctx.createLinearGradient(512, 512, 1024, 1024);
        gradient.addColorStop(0, "rgba(255,215,0,0)");
        gradient.addColorStop(0.5, "rgba(255,215,0,0.3)");
        gradient.addColorStop(1, "rgba(255,215,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(512, 512, 512, 512); // Foil on Front Cover
      }
    };

    draw();
    return new THREE.CanvasTexture(canvas);
  }, [settings]);

  // 2. Animate Folding
  useFrame((state) => {
    if (!backPanel.current) return;
    
    // Target rotation: 0 = fully open, PI = fully closed
    const targetRotation = (1 - settings.isOpen) * Math.PI;
    
    backPanel.current.rotation.y = THREE.MathUtils.lerp(
      backPanel.current.rotation.y,
      targetRotation,
      0.08
    );
    
    // Idle sway
    if (group.current) {
        group.current.rotation.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Right Panel (Fixed) - Pivot at X=0 */}
      <group position={[0, 0, 0]}>
        {/* Inside Right Face */}
        <mesh receiveShadow position={[0.75, 0, 0.01]}>
          <planeGeometry args={[1.5, 2]} />
          <meshStandardMaterial map={texture} map-repeat={[0.5, 0.5]} map-offset={[0.5, 0.5]} roughness={0.8} />
        </mesh>
        {/* Back Cover Face */}
        <mesh receiveShadow position={[0.75, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.5, 2]} />
          <meshStandardMaterial map={texture} map-repeat={[0.5, 0.5]} map-offset={[0, 0]} roughness={0.8} />
        </mesh>
      </group>

      {/* Left Panel (Pivoting) - Pivot at X=0 */}
      <group ref={backPanel} position={[0, 0, 0]}>
        {/* Inside Left Face */}
        <mesh receiveShadow position={[-0.75, 0, 0.01]}>
          <planeGeometry args={[1.5, 2]} />
          <meshStandardMaterial map={texture} map-repeat={[0.5, 0.5]} map-offset={[0, 0.5]} roughness={0.8} />
        </mesh>
        {/* Front Cover Face */}
        <mesh receiveShadow castShadow position={[-0.75, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.5, 2]} />
          <meshStandardMaterial map={texture} map-repeat={[0.5, 0.5]} map-offset={[0.5, 0]} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

export default FoldedCard;
