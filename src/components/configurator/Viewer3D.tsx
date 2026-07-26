'use client';

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useConfigStore } from "@/lib/configurator/store";
import { buildBoxGroup, disposeBoxGroup } from "@/lib/configurator/BoxBuilder";
import { getMaterial } from "@/lib/configurator/MaterialSystem";
import { bakeTexture } from "@/lib/configurator/TextureBaker";
import { isTargetMeshFace } from "@/lib/configurator/surfaceMapper";
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

  // Rebuild box when type, dimensions, material, boxColor, finish, or foilEffect change
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
      if (obj instanceof THREE.Mesh) {
        obj.material = getMaterial({
          material: store.material,
          boxColor: store.boxColor,
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
    store.boxColor,
    store.finish,
    store.foilEffect,
    scene,
  ]);

  // Manage textures and apply to face meshes dynamically
  useEffect(() => {
    let active = true;
    let logoTex: THREE.CanvasTexture | null = null;

    async function applyBakedTextures() {
      if (!store.logoDataUrl) {
        const group = boxGroupRef.current;
        if (group) {
          group.traverse((obj) => {
            if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
              if (obj.material.map) {
                obj.material.map.dispose();
                obj.material.map = null;
              }
              obj.material.color = new THREE.Color(store.boxColor || '#F5F0EB');
              obj.material.needsUpdate = true;
            }
          });
        }
        return;
      }

      // Bake texture with logo at current position/scale/rotation/opacity
      const lTex = await bakeTexture({
        material: store.material,
        boxColor: store.boxColor,
        logoDataUrl: store.logoDataUrl,
        logoX: store.logoX,
        logoY: store.logoY,
        logoScale: store.logoScale,
        logoRotation: store.logoRotation,
        logoOpacity: store.logoOpacity,
      });

      if (!active) {
        lTex.dispose();
        return;
      }

      lTex.anisotropy = 16;
      logoTex = lTex;

      const group = boxGroupRef.current;
      if (group) {
        group.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
            const face = obj.userData.face ?? "";
            const isTarget = isTargetMeshFace(store.boxType, store.logoFace, face);

            if (isTarget) {
              if (obj.material.map && obj.material.map !== logoTex) {
                obj.material.map.dispose();
              }
              obj.material.map = logoTex;
              obj.material.color = new THREE.Color("#FFFFFF"); // Let texture colors show accurately
              obj.material.needsUpdate = true;
            } else {
              if (obj.material.map) {
                obj.material.map.dispose();
                obj.material.map = null;
              }
              obj.material.color = new THREE.Color(store.boxColor || '#F5F0EB');
              obj.material.needsUpdate = true;
            }
          }
        });
      }
    }

    const timer = setTimeout(() => {
      applyBakedTextures();
    }, 20);

    return () => {
      active = false;
      clearTimeout(timer);
      if (logoTex) logoTex.dispose();
    };
  }, [
    store.logoDataUrl,
    store.logoFace,
    store.logoX,
    store.logoY,
    store.logoScale,
    store.logoRotation,
    store.logoOpacity,
    store.material,
    store.boxColor,
    store.boxType,
    store.dimensions,
  ]);

  const reducedMotion = useReducedMotion();

  // Animate lid folds and sliding groups frame-by-frame.
  useFrame(({ gl }) => {
    (window as any)._glCanvas = gl.domElement;
    const boxGroup = boxGroupRef.current;
    if (!boxGroup) return;

    const lerpT = reducedMotion ? 1 : 0.1;

    boxGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.userData.isLid) {
        const targetRot = -store.lidOpenAmount * Math.PI * 0.55;
        obj.rotation.x = THREE.MathUtils.lerp(obj.rotation.x, targetRot, lerpT);
      }

      if (obj instanceof THREE.Group && obj.name === "lid_group") {
        const { h } = (() => {
          const dims = store.getDimensionsInMM();
          return { h: dims.h / 10 };
        })();
        const baseH = h * 0.65;
        const targetY = (baseH - 0.15) + store.lidOpenAmount * (h * 0.65 + 0.8);
        obj.position.y = THREE.MathUtils.lerp(obj.position.y, targetY, lerpT);
      }

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

const CameraController = () => {
  const { camera } = useThree();
  const store = useConfigStore();

  useEffect(() => {
    const { l, w, h } = store.getDimensionsInMM();
    const maxDim = Math.max(l, w, h) / 10;
    const baseDist = Math.max(14, maxDim * 2.2 + store.lidOpenAmount * 3.5);
    
    // Scale camera distance dynamically so opening/enlarging box never clips or goes out of boundary
    const dir = camera.position.clone().normalize();
    if (dir.length() === 0) dir.set(0.6, 0.45, 0.8).normalize();
    camera.position.copy(dir.multiplyScalar(baseDist));
    camera.updateProjectionMatrix();
  }, [store.dimensions, store.lidOpenAmount, camera]);

  useEffect(() => {
    const handleZoomIn = () => {
      camera.position.multiplyScalar(0.85);
    };
    const handleZoomOut = () => {
      camera.position.multiplyScalar(1.15);
    };

    window.addEventListener("configurator-zoom-in", handleZoomIn);
    window.addEventListener("configurator-zoom-out", handleZoomOut);
    return () => {
      window.removeEventListener("configurator-zoom-in", handleZoomIn);
      window.removeEventListener("configurator-zoom-out", handleZoomOut);
    };
  }, [camera]);

  return null;
};

export const Viewer3D = () => {
  const isRotating = useConfigStore((s) => s.isRotating);
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full h-full relative bg-[#edf0f5] overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
      
      {/* Background Watermark Logo — Consistent with Catalogue */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-[0.05] select-none z-0">
        <img src="/images/inthebox-logo.png" alt="" className="w-full h-full object-contain filter grayscale" />
      </div>

      <Canvas
        shadows
        camera={{ position: [10, 7.5, 14], fov: 35 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Soft Studio Lighting */}
        <ambientLight intensity={0.85} />
        
        <directionalLight
          position={[8, 12, 8]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        <directionalLight
          position={[-6, 4, -6]}
          intensity={0.35}
        />
        
        <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#d4d4d4" />
        
        <CameraController />
        
        <Suspense fallback={null}>
          <BoxScene />
        </Suspense>

        {/* Contact Shadow Ground Plane */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.18} />
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

