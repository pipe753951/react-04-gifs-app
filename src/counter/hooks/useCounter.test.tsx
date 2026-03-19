import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  // Default hook initial value for tests.
  // This will be only used for keep value in case of changing the
  // default value on useCounter.
  // Note that this will not be used for call hooks.
  const defaultInitialValue = 10;

  // let { result } = renderHook(() => useCounter());
  // beforeEach(() => {
  //   result = renderHook(() => useCounter()).result;
  // });

  test("Should initialize with default value (10).", () => {
    const { result } = renderHook(useCounter);

    expect(result.current.counter).toBe(10);
  });
  test("Should initialize with value '20'.", () => {
    const initialValue = 20;

    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test("Should increase when handleAdd is called.", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(defaultInitialValue + 1);
  });

  test("Should reduce when handleSubtract is called.", () => {
    const { result } = renderHook(() => useCounter());

    act(result.current.handleSubtract);

    expect(result.current.counter).toBe(defaultInitialValue - 1);
  });

  describe("Should reset to default value when handleReset is called...", () => {
    test("when handleAdd was called two times.", () => {
      const { result } = renderHook(() => useCounter());

      act(result.current.handleAdd);
      act(result.current.handleAdd);
      act(result.current.handleReset);

      expect(result.current.counter).toBe(defaultInitialValue);
    });
    test("when handleSubtract was called two times.", () => {
      const { result } = renderHook(() => useCounter());

      act(result.current.handleSubtract);
      act(result.current.handleSubtract);
      act(result.current.handleReset);

      expect(result.current.counter).toBe(defaultInitialValue);
    });
  });

  describe("Should reset to custom value (40) when handleReset is called.", () => {
    const initialValue = 40;

    test("when handleAdd was called two times.", () => {
      const { result } = renderHook(() => useCounter(initialValue));

      act(result.current.handleAdd);
      act(result.current.handleAdd);
      act(result.current.handleReset);

      expect(result.current.counter).toBe(initialValue);
    });
    test("when handleSubtract was called two times.", () => {
      const { result } = renderHook(() => useCounter(initialValue));

      act(result.current.handleSubtract);
      act(result.current.handleSubtract);
      act(result.current.handleReset);

      expect(result.current.counter).toBe(initialValue);
    });
  });
});
