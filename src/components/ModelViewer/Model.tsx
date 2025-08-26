import React, { useMemo, useRef, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
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
  ({ path, position, targetPosition, mirrored = false, color, animationConfig }: ModelProps) => {
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

    // Use animated position if targetPosition and animationConfig are provided
    const animatedPosition = useSpring({
      position: targetPosition || position,
      config: animationConfig ? {
        tension: animationConfig.tension,
        friction: animationConfig.friction,
      } : { tension: 170, friction: 26 },
    });

    return (
      <animated.group ref={groupRef} position={animatedPosition.position}>
        <primitive object={processedScene} scale={scale} />
      </animated.group>
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
