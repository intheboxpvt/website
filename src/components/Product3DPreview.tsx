import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows, Environment } from "@react-three/drei";
import UniversalModel from "./studio/UniversalModel";
import FoldedCard3D from "./FoldedCard3D";

interface Product3DPreviewProps {
  color: string;
  textColor: string;
  text: string;
  type?: "card" | "box" | "bag" | "rigid";
}

const Product3DPreview = ({ color, textColor, text, type = "card" }: Product3DPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) setHasWebGL(false);
  }, []);
  
  const settings = {
    bgColor: color,
    textColor: textColor,
    frontText: text,
    insideText: "Premium quality guaranteed.",
    isOpen: 0.1,
    foilEffect: true,
    autoRotate: true,
    type: type
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      {hasWebGL ? (
        <Canvas shadows dpr={[1, 1]} camera={{ position: [0, 0, 5], fov: 35 }} gl={{ antialias: false }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <UniversalModel settings={settings} type={type} />
            </Float>
          </Suspense>
          <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4">
          <FoldedCard3D 
            bgColor={color}
            textColor={textColor}
            frontText={text}
            type={type}
            className="scale-[0.6]"
          />
        </div>
      )}
    </div>
  );
};

export default Product3DPreview;
