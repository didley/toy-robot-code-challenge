import { useReducer } from "react";
import { robotReducer } from "./reducer";

export const useToyRobot = (tableTopSize = { x: 4, y: 4 }) => {
  const initialState = {
    tableTopSize,
    isPlaced: false,
    location: { x: null, y: null },
    direction: null,
  };

  const [robotState, dispatch] = useReducer(robotReducer, initialState);

  const place = (x, y, direction) =>
    dispatch({ type: "PLACE", payload: { x, y, direction } });

  const moveForward = () => dispatch({ type: "MOVE_FORWARD" });

  const rotate = (direction) =>
    dispatch({ type: "ROTATE", payload: direction });

  const actions = { place, moveForward, rotate };

  return [robotState, actions];
};
