import React from "react";
import type { KeyboardRendererProps, HexColor } from "@/types";
import { PART_METADATA } from "@/constants";
import { KeyboardPart } from "./KeyboardPart";

export const KeyboardRenderer = React.memo(
  ({
    keyboardType,
    parts,
    colors,
    coverType,
    switchType,
  }: KeyboardRendererProps) => {
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
