import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gifs.interface";
import { giphyApi } from "../api/giphy.api";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  // const response = await axios.get<GiphyResponse>(
  //   "https://api.giphy.com/v1/gifs/search",
  //   {
  //     params: {
  //       q: query,
  //       api_key: import.meta.env["VITE_GIPHY_API_KEY"],
  //       limit: 10,
  //       rating: "g",
  //       lang: "es",
  //       bundle: "messaging_non_clips",
  //     },
  //   },
  // );

  const response = await giphyApi<GiphyResponse>("/search", {
    params: {
      q: query,
      limit: 10,
      bundle: "messaging_non_clips",
    },
  });

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};
