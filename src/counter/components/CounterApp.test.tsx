import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CounterApp } from "./CounterApp";

describe("CounterApp", () => {
  test("Should render the component.", () => {
    render(<CounterApp />);

    const heading = screen.getByRole("heading", { level: 1 });
    const increaseButton = screen.getByRole("button", { name: "+1" });
    const reduceButton = screen.getByRole("button", { name: "-1" });
    const resetButton = screen.getByRole("button", { name: "Reset" });

    expect(heading.innerHTML).toBeDefined();
    expect(heading.innerHTML).toBe("Counter: 5");

    expect(increaseButton.innerHTML).toBeDefined();
    expect(reduceButton.innerHTML).toBeDefined();
    expect(resetButton.innerHTML).toBeDefined();
  });

  test("Should increase the counter.", () => {
    render(<CounterApp />);

    const heading = screen.getByRole("heading", { level: 1 });
    const increaseButton = screen.getByRole("button", { name: "+1" });

    fireEvent.click(increaseButton);

    expect(heading.innerHTML).toBe("Counter: 6");
  });

  test("Should reduce the counter.", () => {
    render(<CounterApp />);

    const heading = screen.getByRole("heading", { level: 1 });
    const reduceButton = screen.getByRole("button", { name: "-1" });

    fireEvent.click(reduceButton);

    expect(heading.innerHTML).toBe("Counter: 4");
  });

  describe("Should reset the counter...", () => {
    test("when counter was increased.", () => {
      render(<CounterApp />);

      const heading = screen.getByRole("heading", { level: 1 });
      const increaseButton = screen.getByRole("button", { name: "+1" });
      const resetButton = screen.getByRole("button", { name: "Reset" });

      fireEvent.click(increaseButton);
      fireEvent.click(resetButton);

      expect(heading.innerHTML).toBe("Counter: 5");
    });
    test("when counter was reduced.", () => {
      render(<CounterApp />);

      const heading = screen.getByRole("heading", { level: 1 });
      const reduceButton = screen.getByRole("button", { name: "-1" });
      const resetButton = screen.getByRole("button", { name: "Reset" });

      fireEvent.click(reduceButton);
      fireEvent.click(resetButton);

      expect(heading.innerHTML).toBe("Counter: 5");
    });
  });
});
