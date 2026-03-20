import { describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { giphySearchResponseMock } from "../../../tests/mocks/giphy.response.data";
import { giphyApi } from "../api/giphy.api";

import { getGifsByQuery } from "./get-gifs-by-query.action";

describe("getGifsByQuery", () => {
  const axiosMock = new AxiosMockAdapter(giphyApi);

  // test("Should get a list of gifs by query", async () => {
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

  test("Should get a list of gify by query", async () => {
    axiosMock.onGet("/search").reply(200, giphySearchResponseMock);

    const gifs = await getGifsByQuery("Foto");

    console.log(gifs);

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toStrictEqual("string");
      expect(typeof gif.title).toStrictEqual("string");
      expect(typeof gif.url).toStrictEqual("string");
      expect(typeof gif.width).toStrictEqual("number");
      expect(typeof gif.height).toStrictEqual("number");
      // expect(gif).toStrictEqual({
      // id: expect.any(String),
      // title: expect.any(String),
      // url: expect.any(String),
      // width: expect.any(Number),
      // height: expect.any(Number),
      // });
    });
  });
});
