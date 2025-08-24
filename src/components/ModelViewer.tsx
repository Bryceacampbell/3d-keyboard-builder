import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useKeyboardState } from "@/hooks/useKeyboardState";
import { KeyboardRenderer } from "./KeyboardRenderer";
import { ControlPanel } from "./ControlPanel";
import { ErrorBoundary } from "./ErrorBoundary";

export const ModelViewer: React.FC = React.memo(() => {
  const { state, actions } = useKeyboardState();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 5 }}
        style={{ backgroundColor: "#1a1a1a", cursor: "grab" }}
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
          />
        </ErrorBoundary>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
        />
      </Canvas>

      <ControlPanel
        state={state}
        onUpdateParts={actions.updateParts}
        onUpdateColors={actions.updateColors}
        onUpdateKeyboard={actions.setSelectedKeyboard}
        onUpdateCoverType={actions.setCoverType}
        onUpdateSwitchType={actions.setSwitchType}
      />
    </div>
  );
});

ModelViewer.displayName = "ModelViewer";
