import { useState } from "react";

import { sampleGifs } from "../../sample-data/gifs.sample";
import { getGifsByQueryAction } from "../actions/get-gifs-by-query.action";

export const useGifs = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [foundGifs, setFoundGifs] = useState(sampleGifs);

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

  const handleTermClicked = (term: string) => {
    console.log({ term });
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

    // Make request
    const gifs = await getGifsByQueryAction(processedQuery);

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
