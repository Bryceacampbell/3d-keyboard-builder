import { useState, useCallback, useMemo } from "react";
import type {
  ViewerState,
  KeyboardParts,
  KeyboardColors,
  KeyboardType,
  CoverType,
  SwitchType,
  HexColor,
} from "@/types";
import { DEFAULT_PARTS, DEFAULT_COLORS } from "@/constants";

export const useKeyboardState = () => {
  const [state, setState] = useState<ViewerState>({
    parts: DEFAULT_PARTS,
    colors: DEFAULT_COLORS,
    selectedKeyboard: "corne",
    coverType: "3dp",
    switchType: "mx",
    isExplodedView: false,
  });

  const togglePart = useCallback((partName: keyof KeyboardParts) => {
    setState((prevState) => ({
      ...prevState,
      parts: {
        ...prevState.parts,
        [partName]: !prevState.parts[partName],
      },
    }));
  }, []);

  const updateParts = useCallback((partUpdates: Partial<KeyboardParts>) => {
    setState((prevState) => ({
      ...prevState,
      parts: {
        ...prevState.parts,
        ...partUpdates,
      },
    }));
  }, []);

  const updateColor = useCallback(
    (colorKey: keyof KeyboardColors, color: HexColor) => {
      setState((prevState) => ({
        ...prevState,
        colors: {
          ...prevState.colors,
          [colorKey]: color,
        },
      }));
    },
    []
  );

  const updateColors = useCallback((colorUpdates: Partial<KeyboardColors>) => {
    setState((prevState) => ({
      ...prevState,
      colors: {
        ...prevState.colors,
        ...colorUpdates,
      },
    }));
  }, []);

  const setSelectedKeyboard = useCallback((keyboard: KeyboardType) => {
    setState((prevState) => ({
      ...prevState,
      selectedKeyboard: keyboard,
    }));
  }, []);

  const setCoverType = useCallback((coverType: CoverType) => {
    setState((prevState) => ({
      ...prevState,
      coverType,
    }));
  }, []);

  const setSwitchType = useCallback((switchType: SwitchType) => {
    setState((prevState) => ({
      ...prevState,
      switchType,
    }));
  }, []);

  const toggleExplodedView = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isExplodedView: !prevState.isExplodedView,
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState({
      parts: DEFAULT_PARTS,
      colors: DEFAULT_COLORS,
      selectedKeyboard: "corne",
      coverType: "acrylic",
      switchType: "mx",
      isExplodedView: false,
    });
  }, []);

  const derivedState = useMemo(
    () => ({
      hasEnabledParts: Object.values(state.parts).some(Boolean),
      enabledPartCount: Object.values(state.parts).filter(Boolean).length,
      isUsingAcrylicCover: state.coverType === "acrylic",
      isUsing3dpCover: state.coverType === "3dp",
      isMxSwitch: state.switchType === "mx",
      isChocSwitch: state.switchType === "choc",
    }),
    [state.parts, state.coverType, state.switchType]
  );

  return {
    state,
    derivedState,
    actions: {
      togglePart,
      updateParts,
      updateColor,
      updateColors,
      setSelectedKeyboard,
      setCoverType,
      setSwitchType,
      toggleExplodedView,
      resetToDefaults,
    },
  } as const;
};
