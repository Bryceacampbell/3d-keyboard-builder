import React from "react";
import { BUTTON_STYLES } from "@/constants";
import type { ToggleButtonProps } from "@/types";

export const ToggleButton = React.memo(
  ({ isActive, children, ...rest }: ToggleButtonProps) => (
    <button
      style={{
        ...BUTTON_STYLES.base,
        ...(isActive ? BUTTON_STYLES.active : BUTTON_STYLES.inactive),
      }}
      {...rest}
    >
      {children}
    </button>
  )
);

ToggleButton.displayName = "ToggleButton";
