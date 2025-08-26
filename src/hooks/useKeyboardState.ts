import { useState, useCallback, useMemo, useRef } from "react";
import type {
  ViewerState,
  KeyboardParts,
  KeyboardColors,
  KeyboardType,
  CoverType,
  SwitchType,
  HexColor,
  AnimationConfig,
} from "@/types";
import { DEFAULT_PARTS, DEFAULT_COLORS, DEFAULT_ANIMATION_STATE, DEFAULT_ANIMATION_CONFIG } from "@/constants";

export const useKeyboardState = () => {
  const [state, setState] = useState<ViewerState>({
    parts: DEFAULT_PARTS,
    colors: DEFAULT_COLORS,
    selectedKeyboard: "corne",
    coverType: "3dp",
    switchType: "mx",
    isExplodedView: false,
    animationState: DEFAULT_ANIMATION_STATE,
  });
  
  const [animationConfig] = useState<AnimationConfig>(DEFAULT_ANIMATION_CONFIG);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setState((prevState) => {
      // Don't allow toggle if animation is in progress
      if (prevState.animationState.isAnimating) {
        return prevState;
      }

      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      const newExplodedState = !prevState.isExplodedView;
      
      // Start animation immediately - all parts animate together but smoothly
      const newState = {
        ...prevState,
        isExplodedView: newExplodedState,
        animationState: {
          isAnimating: true,
          animationProgress: 0,
        },
      };

      // Set timeout to mark animation as complete - use just the base duration
      animationTimeoutRef.current = setTimeout(() => {
        setState((currentState) => ({
          ...currentState,
          animationState: {
            isAnimating: false,
            animationProgress: 1,
          },
        }));
      }, animationConfig.duration);

      return newState;
    });
  }, [animationConfig.duration]);

  const resetToDefaults = useCallback(() => {
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setState({
      parts: DEFAULT_PARTS,
      colors: DEFAULT_COLORS,
      selectedKeyboard: "corne",
      coverType: "acrylic",
      switchType: "mx",
      isExplodedView: false,
      animationState: DEFAULT_ANIMATION_STATE,
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
    animationConfig,
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
