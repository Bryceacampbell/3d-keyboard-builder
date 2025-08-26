import { ControlPanel, ModelViewer } from "@/components";
import { useKeyboardState } from "@/hooks/useKeyboardState";

const App = () => {
  const { state, animationConfig, actions } = useKeyboardState();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <ModelViewer state={state} animationConfig={animationConfig} />
      <ControlPanel
        state={state}
        onUpdateParts={actions.updateParts}
        onUpdateColors={actions.updateColors}
        onUpdateKeyboard={actions.setSelectedKeyboard}
        onUpdateCoverType={actions.setCoverType}
        onUpdateSwitchType={actions.setSwitchType}
        onToggleExplodedView={actions.toggleExplodedView}
      />
    </div>
  );
};

export default App;
