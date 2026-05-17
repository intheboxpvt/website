import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera, Float, OrbitControls, Html, useProgress } from "@react-three/drei";
import UniversalModel from "./UniversalModel";
import FoldedCard3D from "../FoldedCard3D";
import ErrorBoundary from "../ErrorBoundary";

function Loader() {
  const { progress } = useProgress();
  return <Html center><div className="text-royal-purple font-sans font-medium text-sm w-32 text-center bg-ivory/80 backdrop-blur-md py-2 px-4 rounded-full border border-royal-purple/10 shadow-sm">{progress.toFixed(0)}% Loaded</div></Html>;
}

interface CardSceneProps {
  settings: any;
}

const CardScene = ({ settings }: CardSceneProps) => {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // Show a loading state while checking WebGL
  if (hasWebGL === null) return <div className="w-full h-full bg-muted/10 animate-pulse flex items-center justify-center"><p className="text-soft-purple font-sans animate-pulse">Initializing Studio Engine...</p></div>;

  const FallbackUI = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-muted/20 p-8 text-center">
        <div className="relative mb-12">
          <FoldedCard3D 
            frontText={settings.frontText}
            insideText={settings.insideText}
            bgColor={settings.bgColor}
            textColor={settings.textColor}
            type={settings.type}
            className="w-[300px] h-[400px] scale-75 md:scale-100"
          />
          <div className="absolute -top-4 -right-4 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full border border-amber-200 shadow-sm uppercase tracking-widest">
            Compatibility Mode
          </div>
        </div>
        <div className="max-w-md space-y-4">
          <h3 className="font-serif text-xl text-royal-purple">Hardware Acceleration Disabled</h3>
          <p className="text-sm text-soft-purple leading-relaxed">
            We've enabled a high-performance 3D engine for your device. For the full cinematic experience, please enable hardware acceleration in your browser settings.
          </p>
        </div>
      </div>
  );

  if (!hasWebGL) {
    return FallbackUI;
  }

  return (
    <div className="w-full h-full">
      <ErrorBoundary fallback={FallbackUI}>
      <Canvas 
        shadows 
        dpr={[1, 1.5]} 
        alpha 
        gl={{ powerPreference: "high-performance", antialias: false, preserveDrawingBuffer: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={10}
          autoRotate={settings.autoRotate}
          autoRotateSpeed={0.5}
          makeDefault
        />

        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          <Float
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5} 
            floatingRange={[0.1, 0.3]}
          >
            <UniversalModel settings={settings} type={settings.type} />
          </Float>
        </Suspense>

        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={15} 
          blur={2.5} 
          far={4} 
          frames={1} // Optimize performance by only rendering shadow once
        />
      </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default CardScene;
