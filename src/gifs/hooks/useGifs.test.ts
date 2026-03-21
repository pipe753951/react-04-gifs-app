import { describe, expect, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { useGifs } from "./useGifs";
import { sampleGifs } from "../../sample-data/gifs.sample";
import { act } from "react";

describe("useGifs", () => {
  test("should return default values and methods.", () => {
    const { result } = renderHook(useGifs);

    expect(result.current).toStrictEqual({
      foundGifs: sampleGifs,
      previousSearches: [],
      handleSearch: expect.any(Function),
      handleTermClicked: expect.any(Function),
    });
  });

  test("should return a list of GIFs.", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleSearch("Foto");
    });

    expect(result.current.foundGifs.length).toBe(10);
  });

  test("Should return a list of GIFs when handleTermClicked is clicked.", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleTermClicked("Foto");
    });

    expect(result.current.foundGifs.length).toBe(10);
  });
});
