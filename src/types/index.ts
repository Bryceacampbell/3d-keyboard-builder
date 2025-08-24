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
}

export interface ControlPanelProps {
  state: ViewerState;
  onUpdateParts: (parts: Partial<KeyboardParts>) => void;
  onUpdateColors: (colors: Partial<KeyboardColors>) => void;
  onUpdateKeyboard: (keyboard: KeyboardType) => void;
  onUpdateCoverType: (coverType: CoverType) => void;
  onUpdateSwitchType: (switchType: SwitchType) => void;
}

export interface PartConfig {
  name: keyof KeyboardParts;
  requiresMirroring: boolean;
  supportsColorCustomization: boolean;
  dependsOnCoverType?: boolean;
}

export const MODEL_CONFIGS: Record<keyof KeyboardParts, PartConfig> = {
  battery: {
    name: "battery",
    requiresMirroring: true,
    supportsColorCustomization: false,
  },
  caseBottom: {
    name: "caseBottom",
    requiresMirroring: true,
    supportsColorCustomization: true,
  },
  caseTop: {
    name: "caseTop",
    requiresMirroring: true,
    supportsColorCustomization: false,
  },
  caseCover: {
    name: "caseCover",
    requiresMirroring: true,
    supportsColorCustomization: true,
    dependsOnCoverType: true,
  },
  coverHardware: {
    name: "coverHardware",
    requiresMirroring: true,
    supportsColorCustomization: false,
  },
  headers: {
    name: "headers",
    requiresMirroring: true,
    supportsColorCustomization: false,
  },
  keycaps: {
    name: "keycaps",
    requiresMirroring: false,
    supportsColorCustomization: true,
  },
  pcb: {
    name: "pcb",
    requiresMirroring: false,
    supportsColorCustomization: false,
  },
  nano: {
    name: "nano",
    requiresMirroring: true,
    supportsColorCustomization: false,
  },
  switches: {
    name: "switches",
    requiresMirroring: false,
    supportsColorCustomization: false,
  },
  view: {
    name: "view",
    requiresMirroring: false,
    supportsColorCustomization: false,
  },
} as const;

export interface ModelLoadError {
  path: ModelPath;
  message: string;
  timestamp: number;
}

export type PartToggleHandler = (part: keyof KeyboardParts) => void;
export type ColorChangeHandler = (color: HexColor) => void;
export type SelectionChangeHandler<T> = (value: T) => void;
