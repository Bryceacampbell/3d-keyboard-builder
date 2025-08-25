import React from "react";
import type { ColorInputProps } from "@/types";

export const ColorInput = React.memo(
  ({ label, value, onChange, ...rest }: ColorInputProps) => (
    <div
      style={{
        marginTop: "15px",
        paddingTop: "15px",
        borderTop: "1px solid #444",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>{label}</h4>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value as ColorInputProps["value"])}
        style={{
          width: "100%",
          height: "40px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        {...rest}
      />
    </div>
  )
);

ColorInput.displayName = "ColorInput";
