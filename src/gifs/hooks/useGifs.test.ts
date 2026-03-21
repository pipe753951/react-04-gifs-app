import { act } from "react";
import { describe, expect, test, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { useGifs } from "./useGifs";
import { sampleGifs } from "../../sample-data/gifs.sample";
import * as gifActions from "../actions/get-gifs-by-query.action";

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

  test("should return a list of GIFs when handleTermClicked is clicked.", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleTermClicked("Foto");
    });

    expect(result.current.foundGifs.length).toBe(10);
  });

  test("should return a list of GIFs from cache.", async () => {
    const searchTerm = "Risa";

    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleTermClicked(searchTerm);
    });

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error(
        `The cache for the search term ${searchTerm} was not found when this term was used previously.`,
      ),
    );

    expect(async () => {
      await act(async () => {
        await result.current.handleTermClicked(searchTerm);
      });
    }).not.toThrow();
  });

  test("must retain 8 previous search terms.", async () => {
    const { result } = renderHook(useGifs);

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    for (let searchIndex = 1; searchIndex <= 10; searchIndex++) {
      await act(async () => {
        await result.current.handleSearch(`search ${searchIndex}`);
      });
    }

    expect(result.current.previousSearches).toHaveLength(8);
    expect(result.current.previousSearches[0]).toBe("search 10");
    expect(result.current.previousSearches[7]).toBe("search 3");
    expect(result.current.previousSearches[7]).not.toContain("search 1");
  });
});
