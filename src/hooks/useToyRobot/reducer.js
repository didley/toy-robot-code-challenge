export const robotReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PLACE": {
      return {
        ...state,
        isPlaced: true,
        location: { x: payload.x, y: payload.y },
        direction: payload.direction,
      };
    }

    case "MOVE_FORWARD": {
      const { tableTopSize, isPlaced, location, direction } = state;

      if (!isPlaced) return { ...state };

      let requestedLoc;
      let movedLocation;

      switch (direction) {
        case "NORTH":
          requestedLoc = { y: location.y + 1 };
          if (requestedLoc.y <= tableTopSize.y) movedLocation = requestedLoc;
          break;

        case "EAST":
          requestedLoc = { x: location.x + 1 };
          if (requestedLoc.x <= tableTopSize.x) movedLocation = requestedLoc;

          break;

        case "SOUTH":
          requestedLoc = { y: location.y - 1 };
          if (requestedLoc.y <= tableTopSize.y) movedLocation = requestedLoc;

          break;

        case "WEST":
          requestedLoc = { x: location.x - 1 };
          if (requestedLoc.x <= tableTopSize.x) movedLocation = requestedLoc;

          break;

        default:
          break;
      }

      return { ...state, location: { ...location, movedLocation } };
    }

    case "ROTATE": {
      if (!state.isPlaced) return { ...state };

      return { ...state };
    }

    default:
      return state;
  }
};
