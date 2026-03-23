import { describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useGifs } from "./useGifs";
import { sampleGifs } from "../../sample-data/gifs.sample";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("must return default values and methods.", () => {
    const { result } = renderHook(useGifs);

    expect(result.current).toStrictEqual({
      foundGifs: sampleGifs,
      previousSearches: [],
      handleSearch: expect.any(Function),
      handleTermClicked: expect.any(Function),
    });
  });

  test("must return a list of GIFs.", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleSearch("Foto");
    });

    expect(result.current.foundGifs.length).toBe(10);
  });

  test("must return a list of GIFs when handleTermClicked is clicked.", async () => {
    const { result } = renderHook(useGifs);

    await act(async () => {
      await result.current.handleTermClicked("Foto");
    });

    expect(result.current.foundGifs.length).toBe(10);
  });

  test("must return a list of GIFs from cache.", async () => {
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

  describe("Custom tests", () => {
    test("must cancel search when query is empty.", async () => {
      const { result } = renderHook(useGifs);
      vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
        new Error(`The search with an empty query was not canceled.`),
      );

      expect(() => {
        act(() => {
          result.current.handleSearch("");
        });
      }).not.toThrow();
    });

    test("must cancel the search when the query matches the recent search term.", async () => {
      const query = "Foto";
      const { result } = renderHook(useGifs);
      vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

      await act(async () => {
        await result.current.handleSearch(query);
      });

      vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
        new Error(`The search has not been cancelled.`),
      );

      await act(async () => {
        await result.current.handleSearch(query);
      });
    });

    test("must cancel the search when it has been previously saved in the cache.", async () => {
      const query = "Foto";
      const query2 = "Foto";

      const { result } = renderHook(useGifs);
      vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

      await act(async () => {
        await result.current.handleSearch(query);
      });
      await act(async () => {
        await result.current.handleSearch(query2);
      });

      vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
        new Error("The cached search has not been cancelled."),
      );

      await act(async () => {
        await result.current.handleSearch(query);
      });
    });
  });
});
