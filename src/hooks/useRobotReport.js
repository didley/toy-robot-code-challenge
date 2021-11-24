import { useState } from "react";

export const useRobotReport = (robotState) => {
  const { isPlaced, location, direction } = robotState;
  const [reportLogs, setReportLog] = useState([]);

  const requestReport = () => {
    if (isPlaced)
      setReportLog([...reportLogs, { location, direction, key: Date.now() }]);
  };

  return [reportLogs, requestReport];
};
