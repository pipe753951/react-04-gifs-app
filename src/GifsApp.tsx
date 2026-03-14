import { AppHeader } from "./shared/components/AppHeader";
import { PreviousSearches } from "./shared/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";

import { GifList } from "./gifs/components/GifList";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = function () {
  const { foundGifs, handleSearch, handleTermClicked, previousSearches } =
    useGifs();

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
      <GifList gifs={foundGifs} />
    </>
  );
};
