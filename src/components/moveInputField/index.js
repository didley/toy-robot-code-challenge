import { useState } from "react";

export const MoveInputField = ({ robotActions }) => {
  const { place, moveForward, rotate } = robotActions;
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const args = input.toUpperCase().split(" ");
    const command = args[0];

    if (command === "PLACE") {
      const payload = args[1].split(",");
      place(...payload);
    }
    // if (command === "MOVE")
    // if (command === "LEFT")
    // if (command === "RIGHT")
    // if (command === "REPORT")
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Move Robot:{" "}
        <input type="text" onChange={(e) => setInput(e.target.value)} />
      </label>
    </form>
  );
};
