import { useRef, useState } from "react";

import { sampleGifs } from "../../sample-data/gifs.sample";
import type { Gif } from "../interfaces/gifs.interface";

import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [foundGifs, setFoundGifs] = useState(sampleGifs);
  const wasClickedPreviousSearchTerm = useRef(false);
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    // TODO: Reject any value that is not in history.
    addQueryToPreviousSearches(term);

    wasClickedPreviousSearchTerm.current = true;

    if (gifsCache.current[term]) {
      setFoundGifs(gifsCache.current[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    gifsCache.current[term] = gifs;
    setFoundGifs(gifs);
  };

  const addQueryToPreviousSearches = (processedQuery: string) => {
    // Now, set newPreviousSearches on previousSearches state.
    setPreviousSearches((prevPreviousSearches) => {
      // Create new searched terms list.
      // Check if query has been previously is registered;
      // if so, then remove registered query to "move it" to the first place.
      const processedPreviousSearches = prevPreviousSearches.filter(
        (term) => term !== processedQuery,
      );

      // If there are more than 7 terms, remove the last one (New query will be added on update state).
      if (processedPreviousSearches.length > 7) {
        processedPreviousSearches.pop();
      }

      return [processedQuery, ...processedPreviousSearches];
    });
  };

  const handleSearch = async (query: string) => {
    if (wasClickedPreviousSearchTerm.current) {
      wasClickedPreviousSearchTerm.current = false;
      return;
    }

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

    if (gifsCache.current[processedQuery]) {
      setFoundGifs(gifsCache.current[processedQuery]);
      return;
    }

    // Make request
    const gifs = await getGifsByQuery(processedQuery);
    gifsCache.current[processedQuery] = gifs;

    wasClickedPreviousSearchTerm.current = false;
    setFoundGifs(gifs);
  };

  return {
    // Properties
    foundGifs,
    previousSearches,

    // Methods
    handleSearch,
    handleTermClicked,
  };
};
