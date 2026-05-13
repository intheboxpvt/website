import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera, Float, OrbitControls } from "@react-three/drei";
import FoldedCard from "./FoldedCard";

interface CardSceneProps {
  settings: any;
}

const CardScene = ({ settings }: CardSceneProps) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} setLens={undefined} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.7} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
        />
        <directionalLight position={[-5, 5, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c1d95" />
        
        <Suspense fallback={null}>
          <Float
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5} 
          >
            <FoldedCard settings={settings} />
          </Float>
        </Suspense>

        <ContactShadows 
          position={[0, -1.2, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2.5} 
          far={4.5} 
        />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5} 
        />
      </Canvas>
    </div>
  );
};

export default CardScene;
