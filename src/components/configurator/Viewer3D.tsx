'use client';

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useConfigStore } from "@/lib/configurator/store";
import { buildBoxGroup, disposeBoxGroup } from "@/lib/configurator/BoxBuilder";
import { getMaterial } from "@/lib/configurator/MaterialSystem";
import { bakeTexture } from "@/lib/configurator/TextureBaker";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Helper to find specific face meshes
export function findFace(group: THREE.Group, faceName: string): THREE.Mesh | null {
  let found: THREE.Mesh | null = null;
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh && obj.userData.face === faceName) {
      found = obj;
    }
  });
  return found;
}

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

  // Manage textures and apply to face meshes dynamically
  useEffect(() => {
    let active = true;
    let logoTex: THREE.CanvasTexture | null = null;
    let baseTex: THREE.CanvasTexture | null = null;

    async function applyBakedTextures() {
      // 1. Bake texture with logo
      const lTex = await bakeTexture({
        material: store.material,
        logoDataUrl: store.logoDataUrl,
        logoOpacity: store.logoOpacity,
        watermarkSrc: "/images/inthebox-logo.png",
      });

      // 2. Bake plain texture (watermark only)
      const bTex = await bakeTexture({
        material: store.material,
        logoDataUrl: null,
        logoOpacity: 0,
        watermarkSrc: "/images/inthebox-logo.png",
      });

      if (!active) {
        lTex.dispose();
        bTex.dispose();
        return;
      }

      logoTex = lTex;
      baseTex = bTex;

      const group = boxGroupRef.current;
      if (group) {
        group.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            const face = obj.userData.face ?? "";
            
            // Front & Back detection for sleeves, trays, or rigid components
            const isFront = face === "front" || face.endsWith("_front");
            const isBack = face === "back" || face.endsWith("_back");

            if (obj.userData.isLid) {
              // Apply base watermarked texture to the tuck lid
              if (obj.material instanceof THREE.MeshStandardMaterial) {
                obj.material.map = baseTex;
                obj.material.needsUpdate = true;
              }
              return;
            }

            // Determine if logo goes on this face
            const matchesFace =
              (store.logoFace === "front" && isFront) ||
              (store.logoFace === "back" && isBack);

            // Double sided printing covers both faces
            const matchesDoubleSide = store.printingSide === "both" && (isFront || isBack);

            const shouldHaveLogo = matchesFace || matchesDoubleSide;

            if (obj.material instanceof THREE.MeshStandardMaterial) {
              obj.material.map = shouldHaveLogo ? logoTex : baseTex;
              obj.material.needsUpdate = true;
            }
          }
        });
      }
    }

    // Delay texture bake slightly to allow new geometry group mounting
    const timer = setTimeout(() => {
      applyBakedTextures();
    }, 50);

    return () => {
      active = false;
      clearTimeout(timer);
      if (logoTex) logoTex.dispose();
      if (baseTex) baseTex.dispose();
    };
  }, [
    store.logoDataUrl,
    store.logoOpacity,
    store.logoFace,
    store.material,
    store.printingSide,
    store.boxType,
    store.dimensions,
  ]);

  const reducedMotion = useReducedMotion();

  // Animate lid folds and sliding groups frame-by-frame.
  // When prefers-reduced-motion is active, snap directly to target (no lerp).
  useFrame(({ gl }) => {
    // Safe cast: gl.domElement is always an HTMLCanvasElement at runtime
    (window as any)._glCanvas = gl.domElement;
    const boxGroup = boxGroupRef.current;
    if (!boxGroup) return;

    // lerp factor: 0.1 for smooth animation, 1 for instant snap
    const lerpT = reducedMotion ? 1 : 0.1;

    boxGroup.traverse((obj) => {
      // 1. Animate tuck flap lid rotation
      if (obj instanceof THREE.Mesh && obj.userData.isLid) {
        const targetRot = -store.lidOpenAmount * Math.PI * 0.55;
        obj.rotation.x = THREE.MathUtils.lerp(obj.rotation.x, targetRot, lerpT);
      }

      // 2. Animate rigid box lid movement
      if (obj instanceof THREE.Group && obj.name === "lid_group") {
        const { h } = (() => {
          const dims = store.getDimensionsInMM();
          return { h: dims.h / 10 };
        })();
        const baseH = h * 0.65;
        const targetY = (baseH - 0.15) + store.lidOpenAmount * (h * 0.65 + 0.8);
        obj.position.y = THREE.MathUtils.lerp(obj.position.y, targetY, lerpT);
      }

      // 3. Animate drawer tray sliding movement
      if (obj instanceof THREE.Group && obj.name === "tray_group") {
        const { l } = (() => {
          const dims = store.getDimensionsInMM();
          return { l: dims.l / 10 };
        })();
        const targetX = store.lidOpenAmount * l * 0.85;
        obj.position.x = THREE.MathUtils.lerp(obj.position.x, targetX, lerpT);
      }
    });
  });

  return null;
}

export const Viewer3D = () => {
  const isRotating = useConfigStore((s) => s.isRotating);
  // Honour OS-level reduced motion: never auto-rotate when user prefers it
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full h-full relative" style={{ background: "#050505" }} onContextMenu={(e) => e.preventDefault()}>
      <Canvas
        shadows
        camera={{ position: [8, 6, 12], fov: 35 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
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
          autoRotate={isRotating && !reducedMotion}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
