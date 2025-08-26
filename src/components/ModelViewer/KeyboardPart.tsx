import React from "react";
import type { KeyboardPartProps } from "@/types";
import { MODEL_FILES, buildModelPath, PART_METADATA, EXPLODED_POSITIONS } from "@/constants";
import { Model } from "./Model";

export const KeyboardPart = React.memo(
  ({
    partName,
    keyboardType,
    switchType,
    coverType,
    isEnabled,
    color,
    isExplodedView,
    animationState: _animationState,
    animationConfig,
  }: KeyboardPartProps) => {
    const metadata = PART_METADATA[partName];

    if (!isEnabled) return null;

    const getModelFileName = (): string => {
      switch (partName) {
        case "caseCover":
          return coverType === "acrylic"
            ? MODEL_FILES.coverAcrylic
            : MODEL_FILES.cover3dp;
        case "caseBottom":
          return MODEL_FILES.caseBottom;
        case "caseTop":
          return MODEL_FILES.caseTop;
        case "keycaps":
          return MODEL_FILES.keycaps;
        case "pcb":
          return MODEL_FILES.pcb;
        case "switches":
          return MODEL_FILES.switch;
        case "nano":
          return MODEL_FILES.nano;
        case "battery":
          return MODEL_FILES.battery;
        case "headers":
          return MODEL_FILES.headers;
        case "coverHardware":
          return MODEL_FILES.coverHardware;
        case "view":
          return MODEL_FILES.view;
        default:
          throw new Error(`Unknown part name: ${partName}`);
      }
    };

    const modelPath = buildModelPath(
      keyboardType,
      switchType,
      getModelFileName()
    );

    const normalPosition = [0, 0, 0] as const;
    const explodedPosition = EXPLODED_POSITIONS[partName];
    
    // Current position (starting point)
    const currentPosition = normalPosition;
    
    // Target position based on exploded view state
    const targetPosition = isExplodedView ? explodedPosition : normalPosition;

    return (
      <>
        <Model 
          path={modelPath} 
          position={currentPosition}
          targetPosition={targetPosition}
          color={color}
          animationConfig={animationConfig}
        />
        {metadata.requiresMirroring && (
          <Model 
            path={modelPath} 
            position={currentPosition}
            targetPosition={targetPosition}
            color={color} 
            mirrored
            animationConfig={animationConfig}
          />
        )}
      </>
    );
  }
);

KeyboardPart.displayName = "KeyboardPart";
