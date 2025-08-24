import React from "react";
import type { KeyboardRendererProps, ModelPath, HexColor } from "@/types";
import { MODEL_FILES, buildModelPath, PART_METADATA } from "@/constants";
import { Model } from "./Model";

const KeyboardPart: React.FC<{
  partName: keyof typeof PART_METADATA;
  keyboardType: KeyboardRendererProps["keyboardType"];
  switchType: KeyboardRendererProps["switchType"];
  coverType: KeyboardRendererProps["coverType"];
  isEnabled: boolean;
  color?: HexColor | undefined;
}> = React.memo(
  ({ partName, keyboardType, switchType, coverType, isEnabled, color }) => {
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
    const position = [0, 0, 0] as const;

    return (
      <>
        <Model
          path={modelPath as ModelPath}
          position={position}
          color={color}
        />
        {metadata.requiresMirroring && (
          <Model
            path={modelPath as ModelPath}
            position={position}
            color={color}
            mirrored
          />
        )}
      </>
    );
  }
);

KeyboardPart.displayName = "KeyboardPart";

export const KeyboardRenderer: React.FC<KeyboardRendererProps> = React.memo(
  ({ keyboardType, parts, colors, coverType, switchType }) => {
    const getPartColor = (
      partName: keyof typeof PART_METADATA
    ): HexColor | undefined => {
      if (!PART_METADATA[partName]?.supportsColor) return undefined;

      switch (partName) {
        case "caseBottom":
          return colors.caseBottom;
        case "keycaps":
          return colors.keycaps;
        case "caseCover":
          return coverType !== "acrylic" ? colors.caseCover : undefined;
        default:
          return undefined;
      }
    };

    return (
      <>
        {(Object.keys(parts) as Array<keyof typeof parts>).map((partName) => (
          <KeyboardPart
            key={partName}
            partName={partName}
            keyboardType={keyboardType}
            switchType={switchType}
            coverType={coverType}
            isEnabled={parts[partName]}
            color={getPartColor(partName)}
          />
        ))}
      </>
    );
  }
);

KeyboardRenderer.displayName = "KeyboardRenderer";
