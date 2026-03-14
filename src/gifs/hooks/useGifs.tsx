import { useState } from "react";

import { sampleGifs } from "../../sample-data/gifs.sample";
import type { Gif } from "../interfaces/gifs.interface";

import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [foundGifs, setFoundGifs] = useState(sampleGifs);

  const handleTermClicked = async (term: string) => {
    console.debug(gifsCache);

    addQueryToPreviousSearches(term);

    if (gifsCache[term]) {
      setFoundGifs(gifsCache[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setFoundGifs(gifs);
  };

  const addQueryToPreviousSearches = (processedQuery: string) => {
    // Create new searched terms list.
    // Check if query has been previously is registered;
    // if so, then remove registered query to "move it" to the first place.
    const processedPreviousSearches = previousSearches.filter(
      (term) => term !== processedQuery,
    );

    // If there are more than 7 terms, remove the last one (New query will be added on update state).
    if (processedPreviousSearches.length > 7) {
      processedPreviousSearches.pop();
    }

    // Now, set newPreviousSearches on previousSearches state.
    setPreviousSearches([processedQuery, ...processedPreviousSearches]);
  };

  const handleSearch = async (query: string) => {
    // On a new variable, delete unnecesary spaces at from both ends of the received query.
    let processedQuery = query.trim();

    // If processedQuery is empty, return.
    if (!query.trim()) return;

    // Turn processedQuery into lower case.
    processedQuery = processedQuery.toLowerCase();

    // If query was previously consulted, return.
    if (previousSearches[0] === processedQuery) return;

    // Add query to previous searches array, also, update state.
    addQueryToPreviousSearches(processedQuery);

    console.debug(gifsCache);

    if (gifsCache[processedQuery]) {
      setFoundGifs(gifsCache[processedQuery]);
      return;
    }

    // Make request
    const gifs = await getGifsByQuery(processedQuery);
    gifsCache[processedQuery] = gifs;

    setFoundGifs(gifs);
  };

  return {
    // Properties
    foundGifs,

    // Methods
    handleSearch,
    handleTermClicked,
    previousSearches,
  };
};
