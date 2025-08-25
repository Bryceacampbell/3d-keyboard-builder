import React, { useMemo, useRef, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { ModelProps, HexColor } from "@/types";
import { ModelErrorBoundary } from "../ErrorBoundary";

const materialCache = new Map<string, THREE.MeshStandardMaterial>();

const getMaterial = (color: HexColor): THREE.MeshStandardMaterial => {
  const existing = materialCache.get(color);
  if (existing) return existing;

  const material = new THREE.MeshStandardMaterial({ color });
  materialCache.set(color, material);
  return material;
};

const ModelInner = React.memo(
  ({ path, position, mirrored = false, color }: ModelProps) => {
    const { scene } = useGLTF(path);
    const groupRef = useRef<THREE.Group>(null);

    const processedScene = useMemo(() => {
      const cloned = scene.clone();

      if (color) {
        const material = getMaterial(color);
        cloned.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material.clone();
          }
        });
      }

      return cloned;
    }, [scene, color]);

    const scale = useMemo(
      () => (mirrored ? ([-1, 1, 1] as const) : ([1, 1, 1] as const)),
      [mirrored]
    );

    return (
      <group ref={groupRef} position={position}>
        <primitive object={processedScene} scale={scale} />
      </group>
    );
  }
);

ModelInner.displayName = "ModelInner";

export const Model = React.memo((props: ModelProps) => {
  return (
    <ModelErrorBoundary modelPath={props.path}>
      <Suspense fallback={null}>
        <ModelInner {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
});

Model.displayName = "Model";
