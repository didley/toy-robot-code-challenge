import { useState } from "react";

export const MoveInputField = ({ robotActions, requestReport }) => {
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

    if (command === "MOVE") moveForward();

    if (command === "LEFT") rotate("LEFT");

    if (command === "RIGHT") rotate("RIGHT");

    if (command === "REPORT") requestReport();

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Move Robot:{" "}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
    </form>
  );
};
