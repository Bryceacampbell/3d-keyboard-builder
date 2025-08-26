import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { ModelViewerProps } from "@/types";
import { KeyboardRenderer } from "./KeyboardRenderer";
import { ErrorBoundary } from "../ErrorBoundary";

export const ModelViewer = React.memo(({ state }: ModelViewerProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 5 }}
      style={{ background: "rgba(0, 4, 18, 0.95)", cursor: "grab" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <ErrorBoundary>
        <KeyboardRenderer
          keyboardType={state.selectedKeyboard}
          parts={state.parts}
          colors={state.colors}
          coverType={state.coverType}
          switchType={state.switchType}
          isExplodedView={state.isExplodedView}
        />
      </ErrorBoundary>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
      />
    </Canvas>
  );
});

ModelViewer.displayName = "ModelViewer";
