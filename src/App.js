import "./App.css";
import { MoveInputField } from "./components/MoveInputField";
import { useToyRobot } from "./hooks/useToyRobot";

function App() {
  const [robotState, robotActions] = useToyRobot({
    x: 4,
    y: 4,
  });

  console.log(robotState);

  return (
    <div className="App">
      <h1>🤖 Toy Robot Simulator</h1>

      <MoveInputField robotActions={robotActions} />
    </div>
  );
}

export default App;
