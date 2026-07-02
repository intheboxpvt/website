'use client';

import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useConfigStore } from "@/lib/configurator/store";
import { buildBoxGroup, disposeBoxGroup } from "@/lib/configurator/BoxBuilder";
import { getMaterial } from "@/lib/configurator/MaterialSystem";

function BoxScene() {
  const store = useConfigStore();
  const { scene } = useThree();
  const boxGroupRef = useRef<THREE.Group | null>(null);

  // Rebuild box when type, dimensions, material, finish, or foilEffect change
  useEffect(() => {
    const { l, w, h } = store.getDimensionsInMM();
    const newGroup = buildBoxGroup({
      type: store.boxType,
      lMM: l,
      wMM: w,
      hMM: h,
    });

    // Apply materials to each mesh in the generated group
    newGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.userData.isLid !== true) {
        obj.material = getMaterial({
          material: store.material,
          finish: store.finish,
          foilEffect: store.foilEffect,
          face: obj.userData.face ?? "body",
        });
      }
    });

    scene.add(newGroup);
    boxGroupRef.current = newGroup;

    // Cleanup: remove and dispose geometries/materials on update or unmount
    return () => {
      scene.remove(newGroup);
      disposeBoxGroup(newGroup);
      boxGroupRef.current = null;
    };
  }, [
    store.boxType,
    store.dimensions,
    store.material,
    store.finish,
    store.foilEffect,
    scene,
  ]);

  // Animate lid folds and sliding groups frame-by-frame
  useFrame(() => {
    const boxGroup = boxGroupRef.current;
    if (!boxGroup) return;

    boxGroup.traverse((obj) => {
      // 1. Animate tuck flap lid rotation
      if (obj instanceof THREE.Mesh && obj.userData.isLid) {
        const targetRot = -store.lidOpenAmount * Math.PI * 0.55;
        obj.rotation.x = THREE.MathUtils.lerp(obj.rotation.x, targetRot, 0.1);
      }

      // 2. Animate rigid box lid movement
      if (obj instanceof THREE.Group && obj.name === "lid_group") {
        const { h } = (() => {
          const dims = store.getDimensionsInMM();
          return { h: dims.h / 10 };
        })();
        // Closed position: baseH - t = h * 0.65 - 0.15
        const baseH = h * 0.65;
        const targetY = (baseH - 0.15) + store.lidOpenAmount * (h * 0.65 + 0.8);
        obj.position.y = THREE.MathUtils.lerp(obj.position.y, targetY, 0.1);
      }

      // 3. Animate drawer tray sliding movement
      if (obj instanceof THREE.Group && obj.name === "tray_group") {
        const { l } = (() => {
          const dims = store.getDimensionsInMM();
          return { l: dims.l / 10 };
        })();
        const targetX = store.lidOpenAmount * l * 0.85;
        obj.position.x = THREE.MathUtils.lerp(obj.position.x, targetX, 0.1);
      }
    });
  });

  return null;
}

export const Viewer3D = () => {
  const isRotating = useConfigStore((s) => s.isRotating);

  return (
    <div className="w-full h-full relative" style={{ background: "#050505" }}>
      <Canvas
        shadows
        camera={{ position: [8, 6, 12], fov: 35 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        style={{ width: "100%", height: "100%", background: "#050505" }}
      >
        <ambientLight intensity={0.35} />
        
        <directionalLight
          position={[6, 10, 6]}
          intensity={1.3}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        <directionalLight
          position={[-4, 3, -4]}
          intensity={0.25}
        />
        
        <pointLight position={[0, 8, 0]} intensity={0.6} />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <BoxScene />
        </Suspense>

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.25} />
        </mesh>

        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={35}
          autoRotate={isRotating}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
