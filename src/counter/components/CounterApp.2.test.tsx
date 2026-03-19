import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CounterApp } from "./CounterApp";

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 20,
    handleAdd: handleAddMock,
    handleSubtract: handleSubtractMock,
    handleReset: handleResetMock,
  }),
}));

describe("CounterApp (2)", () => {
  test("Should render the component", () => {
    render(<CounterApp />);

    const heading = screen.getByRole("heading", { level: 1 });
    const increaseButton = screen.getByRole("button", { name: "+1" });
    const reduceButton = screen.getByRole("button", { name: "-1" });
    const resetButton = screen.getByRole("button", { name: "Reset" });

    expect(heading.innerHTML).toBeDefined();
    expect(heading.innerHTML).toBe("Counter: 20");

    expect(increaseButton.innerHTML).toBeDefined();
    expect(reduceButton.innerHTML).toBeDefined();
    expect(resetButton.innerHTML).toBeDefined();
  });

  test("Should call handleAdd when button is clicked", () => {
    render(<CounterApp />);

    const increaseButton = screen.getByRole("button", { name: "+1" });

    fireEvent.click(increaseButton);

    expect(handleAddMock).toHaveBeenCalled();
    expect(handleAddMock).toHaveBeenCalledTimes(1);
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });
});
