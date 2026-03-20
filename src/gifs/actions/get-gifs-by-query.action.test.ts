import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

describe("getGifsByQuery", () => {
  test("Should get a list of gifs by query", async () => {
    const gifs = await getGifsByQuery("jenga");

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(gif).toStrictEqual({
        id: expect.any(String),
        title: expect.any(String),
        url: expect.any(String),
        width: expect.any(Number),
        height: expect.any(Number),
      });
    });
  });
});
