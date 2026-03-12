import { sampleGifs } from "./sample-data/gifs.sample";

import { AppHeader } from "./shared/components/AppHeader";
import { PreviousSearches } from "./shared/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";

import { GifList } from "./gifs/components/GifList";

export const GifsApp = function () {
  // const [previousSearches, setPreviousSearches] = useState([["Libros"]]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  return (
    <>
      {/* Header */}
      <AppHeader
        title="Buscador de Gifs"
        description="Encuentra un gif adecuado"
      />

      {/* Search */}
      <SearchBar name="gifSearch" id="search" placeholder="Buscar gifs..." />

      {/* Búsquedas previas */}
      <PreviousSearches
        onLabelClick={handleTermClicked}
        previousSearchesList={["Libros", "Risas", "Naturaleza", "Química"]}
      />

      {/* Gifs */}
      <GifList gifs={sampleGifs} />
    </>
  );
};
