import React, { useCallback, useMemo } from "react";
import type { ControlPanelProps, HexColor, KeyboardParts } from "@/types";
import { PART_METADATA, CONTROL_PANEL_STYLES } from "@/constants";
import { ToggleButton } from "./ToggleButton";
import { ColorInput } from "./ColorInput";

export const ControlPanel = React.memo(
  ({
    state,
    onUpdateParts,
    onUpdateColors,
    onUpdateKeyboard,
    onUpdateCoverType,
    onUpdateSwitchType,
    onToggleExplodedView,
  }: ControlPanelProps) => {
    const handlePartToggle = useCallback(
      (partName: keyof KeyboardParts) => {
        onUpdateParts({ [partName]: !state.parts[partName] });
      },
      [state.parts, onUpdateParts]
    );

    const handleCaseBottomColorChange = useCallback(
      (color: HexColor) => {
        onUpdateColors({ caseBottom: color });
      },
      [onUpdateColors]
    );

    const handleKeycapsColorChange = useCallback(
      (color: HexColor) => {
        onUpdateColors({ keycaps: color });
      },
      [onUpdateColors]
    );

    const handleCaseCoverColorChange = useCallback(
      (color: HexColor) => {
        onUpdateColors({ caseCover: color });
      },
      [onUpdateColors]
    );

    const partEntries = useMemo(
      () =>
        (Object.keys(state.parts) as Array<keyof KeyboardParts>).map(
          (partName) => ({
            key: partName,
            displayName:
              PART_METADATA[partName]?.displayName ||
              partName
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
            isEnabled: state.parts[partName],
          })
        ),
      [state.parts]
    );
    return (
      <div style={CONTROL_PANEL_STYLES}>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "16px" }}>
          Keyboard Builder
        </h3>

        <div
          style={{
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #444",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
            Keyboard Type
          </h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <ToggleButton
              isActive={state.selectedKeyboard === "corne"}
              onClick={() => onUpdateKeyboard("corne")}
              aria-label="Select Corne keyboard"
            >
              Corne
            </ToggleButton>
            <ToggleButton
              isActive={state.selectedKeyboard === "lily58"}
              onClick={() => onUpdateKeyboard("lily58")}
              aria-label="Select Lily58 keyboard"
            >
              Lily58
            </ToggleButton>
          </div>
        </div>

        <div
          style={{
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #444",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
            Switch Type
          </h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <ToggleButton
              isActive={state.switchType === "mx"}
              onClick={() => onUpdateSwitchType("mx")}
              aria-label="Select MX switches"
            >
              MX
            </ToggleButton>
            <ToggleButton
              isActive={state.switchType === "choc"}
              onClick={() => onUpdateSwitchType("choc")}
              aria-label="Select Choc switches"
            >
              Choc
            </ToggleButton>
          </div>
        </div>

        <div
          style={{
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #444",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>Cover Type</h4>
          <div style={{ display: "flex", gap: "10px" }}>
            <ToggleButton
              isActive={state.coverType === "3dp"}
              onClick={() => onUpdateCoverType("3dp")}
              aria-label="Select 3D printed cover"
            >
              3D Print
            </ToggleButton>
            <ToggleButton
              isActive={state.coverType === "acrylic"}
              onClick={() => onUpdateCoverType("acrylic")}
              aria-label="Select acrylic cover"
            >
              Acrylic
            </ToggleButton>
          </div>
        </div>

        <div
          style={{
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #444",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>View</h4>
          <ToggleButton
            isActive={state.isExplodedView}
            onClick={onToggleExplodedView}
            aria-label="Toggle exploded view"
            style={{ width: "100%" }}
          >
            {state.isExplodedView ? "Assembled View" : "Exploded View"}
          </ToggleButton>
        </div>

        <h4 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>Parts</h4>
        {partEntries.map(({ key, displayName, isEnabled }) => (
          <label
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={() => handlePartToggle(key)}
              style={{ marginRight: "8px", accentColor: "#ff4da6" }}
              aria-label={`Toggle ${displayName}`}
            />
            {displayName}
          </label>
        ))}

        <ColorInput
          label="Case Bottom Color"
          value={state.colors.caseBottom}
          onChange={handleCaseBottomColorChange}
        />

        <ColorInput
          label="Keycaps Color"
          value={state.colors.keycaps}
          onChange={handleKeycapsColorChange}
        />

        {state.coverType === "3dp" && (
          <ColorInput
            label="Case Cover Color"
            value={state.colors.caseCover}
            onChange={handleCaseCoverColorChange}
          />
        )}
      </div>
    );
  }
);

ControlPanel.displayName = "ControlPanel";
