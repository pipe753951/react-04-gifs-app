import { useState } from "react";

import { sampleGifs } from "./sample-data/gifs.sample";

import { AppHeader } from "./shared/components/AppHeader";
import { PreviousSearches } from "./shared/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";

import { GifList } from "./gifs/components/GifList";

export const GifsApp = function () {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };
  const handleSearch = (query: string) => {
    // On a new variable, delete unnecesary spaces at from both ends of the received query.
    let processedQuery = query.trim();

    // If processedQuery is empty, return.
    if (!query.trim()) return;

    // Turn processedQuery into lower case.
    processedQuery = processedQuery.toLowerCase();

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

  return (
    <>
      {/* Header */}
      <AppHeader
        title="Buscador de Gifs"
        description="Encuentra un gif adecuado"
      />

      {/* Search */}
      <SearchBar
        onProcessQuery={handleSearch}
        name="gifSearch"
        id="search"
        placeholder="Buscar gifs..."
      />

      {/* Búsquedas previas */}
      <PreviousSearches
        onLabelClick={handleTermClicked}
        previousSearchesList={previousSearches}
      />

      {/* Gifs */}
      <GifList gifs={sampleGifs} />
    </>
  );
};
