export type KeyboardType = "corne" | "lily58";
export type SwitchType = "mx" | "choc";
export type CoverType = "acrylic" | "3dp";
export type ModelPath = `/${string}.glb`;

export type HexColor = `#${string}`;

export interface KeyboardParts {
  battery: boolean;
  caseBottom: boolean;
  caseTop: boolean;
  caseCover: boolean;
  coverHardware: boolean;
  headers: boolean;
  keycaps: boolean;
  pcb: boolean;
  nano: boolean;
  switches: boolean;
  view: boolean;
}

export interface KeyboardColors {
  caseBottom: HexColor;
  keycaps: HexColor;
  caseCover: HexColor;
}

export interface ViewerState {
  parts: KeyboardParts;
  colors: KeyboardColors;
  selectedKeyboard: KeyboardType;
  coverType: CoverType;
  switchType: SwitchType;
  isExplodedView: boolean;
}

export interface ModelViewerProps {
  state: ViewerState;
}

export interface ModelProps {
  path: ModelPath;
  position: readonly [number, number, number];
  mirrored?: boolean;
  color?: HexColor | undefined;
}

export interface KeyboardRendererProps {
  keyboardType: KeyboardType;
  parts: KeyboardParts;
  colors: KeyboardColors;
  coverType: CoverType;
  switchType: SwitchType;
  isExplodedView: boolean;
}

export interface KeyboardPartProps {
  partName: keyof KeyboardParts;
  keyboardType: KeyboardType;
  switchType: SwitchType;
  coverType: CoverType;
  isEnabled: boolean;
  color?: HexColor | undefined;
  isExplodedView: boolean;
}

export interface ControlPanelProps {
  state: ViewerState;
  onUpdateParts: (parts: Partial<KeyboardParts>) => void;
  onUpdateColors: (colors: Partial<KeyboardColors>) => void;
  onUpdateKeyboard: (keyboard: KeyboardType) => void;
  onUpdateCoverType: (coverType: CoverType) => void;
  onUpdateSwitchType: (switchType: SwitchType) => void;
  onToggleExplodedView: () => void;
}

export interface ToggleButtonProps extends React.ComponentProps<"button"> {
  isActive: boolean;
}

export interface ColorInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  label: string;
  value: HexColor;
  onChange: (color: HexColor) => void;
}

export interface PartConfig {
  name: keyof KeyboardParts;
  requiresMirroring: boolean;
  supportsColorCustomization: boolean;
  dependsOnCoverType?: boolean;
}

export interface ModelLoadError {
  path: ModelPath;
  message: string;
  timestamp: number;
}
