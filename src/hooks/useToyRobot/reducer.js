export const robotReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PLACE": {
      const { tableTopSize } = state;

      const requestedLoc = { x: parseInt(payload.x), y: parseInt(payload.y) };

      if (
        requestedLoc.x <= tableTopSize.x &&
        requestedLoc.x >= 0 &&
        requestedLoc.y <= tableTopSize.y &&
        requestedLoc.y >= 0
      ) {
        return {
          ...state,
          isPlaced: true,
          location: requestedLoc,
          direction: payload.direction,
        };
      }

      return { ...state };
    }

    case "MOVE_FORWARD": {
      const { tableTopSize, isPlaced, location, direction } = state;

      if (!isPlaced) return { ...state };

      let requestedLoc;
      let movedLocation;

      switch (direction) {
        case "NORTH":
          requestedLoc = { y: location.y + 1 };
          if (requestedLoc.y <= tableTopSize.y && requestedLoc.y >= 0)
            movedLocation = requestedLoc;
          break;

        case "EAST":
          requestedLoc = { x: location.x + 1 };
          if (requestedLoc.x <= tableTopSize.x && requestedLoc.x >= 0)
            movedLocation = requestedLoc;
          break;

        case "SOUTH":
          requestedLoc = { y: location.y - 1 };
          if (requestedLoc.y <= tableTopSize.y && requestedLoc.y >= 0)
            movedLocation = requestedLoc;
          break;

        case "WEST":
          requestedLoc = { x: location.x - 1 };
          if (requestedLoc.x <= tableTopSize.x && requestedLoc.x >= 0)
            movedLocation = requestedLoc;
          break;

        default:
          break;
      }

      return { ...state, location: { ...location, ...movedLocation } };
    }

    case "ROTATE": {
      const { isPlaced, direction } = state;

      if (!isPlaced) return { ...state };

      let newDirection;
      if (payload === "LEFT") {
        if (direction === "NORTH") newDirection = "WEST";
        if (direction === "EAST") newDirection = "NORTH";
        if (direction === "SOUTH") newDirection = "EAST";
        if (direction === "WEST") newDirection = "NORTH";
      }
      if (payload === "RIGHT") {
        if (direction === "NORTH") newDirection = "EAST";
        if (direction === "EAST") newDirection = "SOUTH";
        if (direction === "SOUTH") newDirection = "WEST";
        if (direction === "WEST") newDirection = "NORTH";
      }

      return { ...state, direction: newDirection };
    }

    default:
      return state;
  }
};
