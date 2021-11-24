import "./App.css";
import { useToyRobot } from "./hooks/useToyRobot";
import { useRobotReport } from "./hooks/useRobotReport";
import { ReportLog } from "./components/ReportLog";
import { MoveInputField } from "./components/MoveInputField";

function App() {
  const [robotState, robotActions] = useToyRobot({
    x: 4,
    y: 4,
  });
  const [reportLogs, requestReport] = useRobotReport(robotState);

  console.log(robotState, reportLogs);

  return (
    <div className="App" style={{ textAlign: "left", margin: "50px" }}>
      <h1>🤖 Toy Robot Simulator</h1>
      <div>
        <h5>Commands:</h5>
        <ul>
          <li>PLACE X,Y,NORTH/SOUTH/EAST/WEST</li>
          <li>MOVE</li>
          <li>LEFT</li>
          <li>RIGHT</li>
          <li>REPORT</li>
        </ul>
      </div>
      <MoveInputField
        robotActions={robotActions}
        requestReport={requestReport}
      />
      <br />
      <ReportLog reportLogs={reportLogs} />
    </div>
  );
}

export default App;
