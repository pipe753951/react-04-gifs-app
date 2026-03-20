import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { giphySearchResponseMock } from "../../../tests/mocks/giphy.response.data";
import { giphyApi } from "../api/giphy.api";

import { getGifsByQuery } from "./get-gifs-by-query.action";

describe("getGifsByQuery", () => {
  // let axiosMock: AxiosMockAdapter;
  const axiosMock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    // axiosMock = new AxiosMockAdapter(giphyApi);
    axiosMock.reset();
  });

  // test("Should get a list of gifs by query.", async () => {
  //   const gifs = await getGifsByQuery("jenga");

  //   expect(gifs.length).toBe(10);

  //   gifs.forEach((gif) => {
  //     expect(gif).toStrictEqual({
  //       id: expect.any(String),
  //       title: expect.any(String),
  //       url: expect.any(String),
  //       width: expect.any(Number),
  //       height: expect.any(Number),
  //     });
  //   });
  // });

  test("should get a list of GIFs from a query.", async () => {
    axiosMock.onGet("/search").reply(200, giphySearchResponseMock);

    const gifs = await getGifsByQuery("Foto");

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toStrictEqual("string");
      expect(typeof gif.title).toStrictEqual("string");
      expect(typeof gif.url).toStrictEqual("string");
      expect(typeof gif.width).toStrictEqual("number");
      expect(typeof gif.height).toStrictEqual("number");
      // expect(gif).toStrictEqual({
      //   id: expect.any(String),
      //   title: expect.any(String),
      //   url: expect.any(String),
      //   width: expect.any(Number),
      //   height: expect.any(Number),
      // });
    });
  });
  test("should get an empty list of GIFs from an empty query.", async () => {
    // axiosMock.onGet("/search").reply(200, []);
    // axiosMock.restore();
    axiosMock.onAny().passThrough();

    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
    console.log(axiosMock.history);
  });

  test("should handle an error when the API returns it.", async () => {
    axiosMock.onGet("/search").reply(400, {
      data: [],
      meta: {
        status: 400,
        msg: "Bad request",
        response_id: "",
      },
    });

    const gifs = await getGifsByQuery("labs");

    console.log(gifs);

    // expect(gifs.length).toBe(0);
  });
});
