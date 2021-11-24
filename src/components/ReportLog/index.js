export const ReportLog = ({ reportLogs }) => {
  return (
    <div>
      Report Log
      <br />
      <ul>
        {reportLogs &&
          reportLogs.map(({ location: { x, y }, direction, key }) => (
            <li
              key={key}
              aria-label="Report log"
            >{`${x},${y},${direction}`}</li>
          ))}
      </ul>
    </div>
  );
};
