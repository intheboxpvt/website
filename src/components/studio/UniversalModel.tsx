import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface UniversalModelProps {
  settings: {
    bgColor: string;
    textColor: string;
    frontText: string;
    insideText: string;
    isOpen: number;
    foilEffect: boolean;
    autoRotate: boolean;
    side?: "outside" | "inside";
    interiorColor?: string;
  };
  type?: "card" | "box" | "bag" | "rigid";
}

const UniversalModel = ({ settings, type = "card" }: UniversalModelProps) => {
  const group = useRef<THREE.Group>(null);
  
  // Generate Outside Texture
  const outsideTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = settings.bgColor;
      ctx.fillRect(0, 0, 2048, 2048);
      
      // Paper Grain
      ctx.globalAlpha = 0.03;
      for (let i = 0; i < 200000; i++) {
        const x = Math.random() * 2048;
        const y = Math.random() * 2048;
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1.0;

      // Typography
      ctx.fillStyle = settings.textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "bold 140px 'Playfair Display', serif";
      ctx.fillText(settings.frontText.toUpperCase(), 1024, 900);
      ctx.fillRect(874, 1000, 300, 6);
      ctx.font = "300 40px 'Inter', sans-serif";
      ctx.globalAlpha = 0.5;
      ctx.fillText("PREMIUM BESPOKE PACKAGING", 1024, 1100);
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = settings.textColor;
      ctx.lineWidth = 15;
      ctx.strokeRect(100, 100, 1848, 1848);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [settings.bgColor, settings.textColor, settings.frontText]);

  // Generate Inside Texture (Unboxing Experience)
  const insideTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = settings.interiorColor || "#fafafa";
      ctx.fillRect(0, 0, 2048, 2048);
      
      // Luxury Interior Pattern (Subtle dots or stripes)
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = settings.textColor;
      for (let i = 0; i < 2048; i += 100) {
        for (let j = 0; j < 2048; j += 100) {
           ctx.beginPath();
           ctx.arc(i, j, 5, 0, Math.PI * 2);
           ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // Interior Message
      ctx.fillStyle = "#4c1d95";
      ctx.textAlign = "center";
      ctx.font = "italic 60px Serif";
      ctx.fillText(settings.insideText, 1024, 1024);
    }
    return new THREE.CanvasTexture(canvas);
  }, [settings.interiorColor, settings.insideText, settings.textColor]);

  const springFold = useRef(0);
  useFrame((state) => {
    if (group.current) {
      const target = settings.isOpen;
      springFold.current += (target - springFold.current) * 0.08;
      
      if (settings.autoRotate) {
        group.current.rotation.y += 0.003;
      }
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Common Material Factory
  const getMaterial = (isInside: boolean) => (
    <meshPhysicalMaterial 
      map={isInside ? insideTexture : outsideTexture} 
      side={THREE.DoubleSide} 
      roughness={isInside ? 1 : 0.4} 
      metalness={!isInside && settings.foilEffect ? 0.9 : 0.05}
      reflectivity={0.5}
      envMapIntensity={isInside ? 0.5 : 1.5}
      clearcoat={!isInside && settings.foilEffect ? 1 : 0}
      clearcoatRoughness={0.1}
    />
  );

  if (type === "box" || type === "rigid") {
    return (
      <group ref={group}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          {getMaterial(false)}
        </mesh>
      </group>
    );
  }

  if (type === "bag") {
    return (
      <group ref={group}>
        <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
          <boxGeometry args={[1.2, 1.8, 0.6]} />
          {getMaterial(false)}
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <torusGeometry args={[0.3, 0.02, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#333" roughness={1} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={group}>
      <mesh 
        position={[0.75 * Math.sin(springFold.current * Math.PI), 0, 0.75 * Math.cos(springFold.current * Math.PI)]} 
        rotation={[0, -springFold.current * Math.PI, 0]}
        castShadow
      >
        <planeGeometry args={[1.5, 2]} />
        {getMaterial(false)}
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[1.5, 2]} />
        {getMaterial(true)}
      </mesh>
    </group>
  );
};

export default UniversalModel;
