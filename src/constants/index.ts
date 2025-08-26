import type {
  KeyboardParts,
  KeyboardColors,
  KeyboardType,
  SwitchType,
  HexColor,
  ModelPath,
  AnimationConfig,
  AnimationState,
} from "@/types";

export const DEFAULT_PARTS: KeyboardParts = {
  caseBottom: true,
  pcb: true,
  headers: true,
  battery: true,
  nano: true,
  view: true,
  caseTop: true,
  switches: true,
  keycaps: true,
  coverHardware: true,
  caseCover: true,
} as const;

export const DEFAULT_COLORS: KeyboardColors = {
  caseBottom: "#ff4da6" as HexColor,
  keycaps: "#e8efff" as HexColor,
  caseCover: "#ff4da6" as HexColor,
} as const;

export const MODEL_FILES = {
  battery: "battery.glb",
  caseBottom: "case-bottom-3dp.glb",
  caseTop: "case-top.glb",
  coverAcrylic: "cover-acrylic.glb",
  cover3dp: "cover-3dp-cutout.glb",
  coverHardware: "cover-hardware.glb",
  headers: "headers.glb",
  keycaps: "keycaps.glb",
  pcb: "pcb.glb",
  nano: "nano.glb",
  switch: "switch.glb",
  view: "view.glb",
} as const;

export const buildModelPath = (
  keyboard: KeyboardType,
  switchType: SwitchType,
  fileName: string
): ModelPath =>
  `/3d-keyboard-builder/${keyboard}/${switchType}/${fileName}` as ModelPath;

export const EXPLODED_POSITIONS: Record<
  keyof KeyboardParts,
  readonly [number, number, number]
> = {
  caseBottom: [0, 0, -0.9],
  pcb: [0, 0, -0.65],
  headers: [0, 0, -0.45],
  battery: [0, 0, -0.25],
  nano: [0, 0, -0.1],
  view: [0, 0, 0],
  caseTop: [0, 0, 0.1],
  switches: [0, 0, 0.25],
  keycaps: [0, 0, 0.45],
  coverHardware: [0, 0, 0.65],
  caseCover: [0, 0, 0.9],
} as const;

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  duration: 1200,
  tension: 120,
  friction: 40,
  staggerDelay: 80,
} as const;

export const DEFAULT_ANIMATION_STATE: AnimationState = {
  isAnimating: false,
  animationProgress: 0,
} as const;

export const PART_ANIMATION_ORDER: Array<keyof KeyboardParts> = [
  "caseBottom",
  "pcb",
  "headers",
  "battery",
  "nano",
  "view",
  "caseTop",
  "switches",
  "keycaps",
  "coverHardware",
  "caseCover",
] as const;

export const PART_METADATA = {
  caseBottom: {
    displayName: "Case Bottom",
    requiresMirroring: true,
    supportsColor: true,
    description: "Bottom case housing",
  },
  pcb: {
    displayName: "PCB",
    requiresMirroring: false,
    supportsColor: false,
    description: "Printed circuit board",
  },
  headers: {
    displayName: "Headers",
    requiresMirroring: true,
    supportsColor: false,
    description: "Pin headers for connections",
  },
  battery: {
    displayName: "Battery",
    requiresMirroring: true,
    supportsColor: false,
    description: "Battery pack for wireless operation",
  },
  nano: {
    displayName: "Nano",
    requiresMirroring: true,
    supportsColor: false,
    description: "Microcontroller board",
  },
  view: {
    displayName: "View",
    requiresMirroring: false,
    supportsColor: false,
    description: "Complete assembly view",
  },
  caseTop: {
    displayName: "Case Top",
    requiresMirroring: true,
    supportsColor: false,
    description: "Top case housing",
  },
  switches: {
    displayName: "Switches",
    requiresMirroring: false,
    supportsColor: false,
    description: "Mechanical switches",
  },
  keycaps: {
    displayName: "Keycaps",
    requiresMirroring: false,
    supportsColor: true,
    description: "Key caps for switches",
  },
  coverHardware: {
    displayName: "Cover Hardware",
    requiresMirroring: true,
    supportsColor: false,
    description: "Hardware for cover attachment",
  },
  caseCover: {
    displayName: "Case Cover",
    requiresMirroring: true,
    supportsColor: true,
    dependsOn: "coverType" as const,
    description: "Protective cover (acrylic or 3D printed)",
  },
} as const;

export const CONTROL_PANEL_STYLES = {
  position: "absolute" as const,
  top: "20px",
  left: "20px",
  background: "rgba(0, 4, 18, 0.95)",
  padding: "20px",
  borderRadius: "8px",
  color: "#e8efff",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  maxWidth: "300px",
  maxHeight: "calc(100vh - 40px)",
  overflowY: "auto" as const,
  scrollbarWidth: "thin" as const,
  scrollbarColor: "#555 transparent",
} as const;

export const BUTTON_STYLES = {
  base: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    color: "#e8efff",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  active: {
    background: "#ff4da6",
    border: "1px solid #ff4da6",
  },
  inactive: {
    border: "1px solid #ff4da6",
    background: "none",
  },
} as const;
