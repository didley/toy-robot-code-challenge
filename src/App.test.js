import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("toy robot", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => null); // suppresses console log from test console
    render(<App />);
  });

  describe("PLACE", () => {
    it("can be placed on the table top multiple times", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "PLACE 3,4,SOUTH{enter}");
      userEvent.type(input, "REPORT{enter}");

      userEvent.type(input, "PLACE 2,2,WEST{enter}");
      userEvent.type(input, "REPORT{enter}");

      const logs = screen.getAllByRole("listitem", {
        name: /report log/i,
      });

      expect(logs[0].innerHTML).toBe("3,4,SOUTH");
      expect(logs[1].innerHTML).toBe("2,2,WEST");
    });
    it("can not be placed off the table top", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "PLACE 6,4,SOUTH{enter}");
      userEvent.type(input, "REPORT{enter}");

      userEvent.type(input, "PLACE -6,4,SOUTH{enter}");
      userEvent.type(input, "REPORT{enter}");

      expect(
        screen.queryByRole("listitem", { name: /report log/i })
      ).toBeNull();
    });
  });
  describe("MOVE", () => {
    it("can move forward on the table top", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "PLACE 1,2,EAST{enter}");
      userEvent.type(input, "MOVE{enter}");
      userEvent.type(input, "MOVE{enter}");
      userEvent.type(input, "REPORT{enter}");

      const logs = screen.getAllByRole("listitem", {
        name: /report log/i,
      });

      expect(logs[0].innerHTML).toBe("3,2,EAST");
    });
    it("can not move off the table top", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "PLACE 4,4,EAST{enter}");
      userEvent.type(input, "MOVE{enter}");
      userEvent.type(input, "REPORT{enter}");

      userEvent.type(input, "PLACE 0,0,SOUTH{enter}");
      userEvent.type(input, "MOVE{enter}");
      userEvent.type(input, "REPORT{enter}");

      const logs = screen.getAllByRole("listitem", {
        name: /report log/i,
      });

      expect(logs[0].innerHTML).toBe("4,4,EAST");
      expect(logs[1].innerHTML).toBe("0,0,SOUTH");
    });
    it("can not move if robot is not placed on table top", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "MOVE{enter}");
      userEvent.type(input, "MOVE{enter}");
      userEvent.type(input, "REPORT{enter}");

      expect(
        screen.queryByRole("listitem", { name: /report log/i })
      ).toBeNull();
    });
  });
  describe("LEFT & RIGHT rotation", () => {
    it("can rotate left", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "PLACE 4,4,EAST{enter}");
      userEvent.type(input, "LEFT{enter}");
      userEvent.type(input, "REPORT{enter}");

      userEvent.type(input, "LEFT{enter}");
      userEvent.type(input, "REPORT{enter}");

      const logs = screen.getAllByRole("listitem", {
        name: /report log/i,
      });

      expect(logs[0].innerHTML).toBe("4,4,NORTH");
      expect(logs[1].innerHTML).toBe("4,4,WEST");
    });
    it("can rotate right", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "PLACE 4,4,EAST{enter}");
      userEvent.type(input, "RIGHT{enter}");
      userEvent.type(input, "REPORT{enter}");

      userEvent.type(input, "RIGHT{enter}");
      userEvent.type(input, "REPORT{enter}");

      const logs = screen.getAllByRole("listitem", {
        name: /report log/i,
      });

      expect(logs[0].innerHTML).toBe("4,4,SOUTH");
      expect(logs[1].innerHTML).toBe("4,4,WEST");
    });
    it("can not rotate if robot is not placed on table top", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "LEFT{enter}");
      userEvent.type(input, "RIGHT{enter}");
      userEvent.type(input, "REPORT{enter}");

      expect(
        screen.queryByRole("listitem", { name: /report log/i })
      ).toBeNull();
    });
  });

  describe("REPORT", () => {
    it("does not report if robot is not placed on table top", () => {
      const input = screen.getByRole("textbox");
      userEvent.type(input, "REPORT{enter}");

      expect(
        screen.queryByRole("listitem", { name: /report log/i })
      ).toBeNull();
    });
  });
});
