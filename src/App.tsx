import { ControlPanel, ModelViewer } from "@/components";
import { useKeyboardState } from "@/hooks/useKeyboardState";

const App = () => {
  const { state, actions } = useKeyboardState();
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <ModelViewer state={state} />
      <ControlPanel
        state={state}
        onUpdateParts={actions.updateParts}
        onUpdateColors={actions.updateColors}
        onUpdateKeyboard={actions.setSelectedKeyboard}
        onUpdateCoverType={actions.setCoverType}
        onUpdateSwitchType={actions.setSwitchType}
      />
    </div>
  );
};

export default App;
