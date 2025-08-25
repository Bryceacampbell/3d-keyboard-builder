import type {
  KeyboardParts,
  KeyboardColors,
  KeyboardType,
  SwitchType,
  HexColor,
  ModelPath,
} from "@/types";

export const DEFAULT_PARTS: KeyboardParts = {
  battery: true,
  caseBottom: true,
  caseTop: true,
  caseCover: true,
  coverHardware: true,
  headers: true,
  keycaps: true,
  pcb: true,
  nano: true,
  switches: true,
  view: true,
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

export const PART_METADATA = {
  battery: {
    displayName: "Battery",
    requiresMirroring: true,
    supportsColor: false,
    description: "Battery pack for wireless operation",
  },
  caseBottom: {
    displayName: "Case Bottom",
    requiresMirroring: true,
    supportsColor: true,
    description: "Bottom case housing",
  },
  caseTop: {
    displayName: "Case Top",
    requiresMirroring: true,
    supportsColor: false,
    description: "Top case housing",
  },
  caseCover: {
    displayName: "Case Cover",
    requiresMirroring: true,
    supportsColor: true,
    dependsOn: "coverType" as const,
    description: "Protective cover (acrylic or 3D printed)",
  },
  coverHardware: {
    displayName: "Cover Hardware",
    requiresMirroring: true,
    supportsColor: false,
    description: "Hardware for cover attachment",
  },
  headers: {
    displayName: "Headers",
    requiresMirroring: true,
    supportsColor: false,
    description: "Pin headers for connections",
  },
  keycaps: {
    displayName: "Keycaps",
    requiresMirroring: false,
    supportsColor: true,
    description: "Key caps for switches",
  },
  pcb: {
    displayName: "PCB",
    requiresMirroring: false,
    supportsColor: false,
    description: "Printed circuit board",
  },
  nano: {
    displayName: "Nano",
    requiresMirroring: true,
    supportsColor: false,
    description: "Microcontroller board",
  },
  switches: {
    displayName: "Switches",
    requiresMirroring: false,
    supportsColor: false,
    description: "Mechanical switches",
  },
  view: {
    displayName: "View",
    requiresMirroring: false,
    supportsColor: false,
    description: "Complete assembly view",
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
