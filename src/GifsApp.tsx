import { sampleGifs } from "./sample-data/gifs.sample";
import { AppHeader } from "./shared/components/AppHeader";
import { PreviousSearches } from "./shared/components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = function () {
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
        previousSearchesList={["Libros", "Risas", "Naturaleza", "Química"]}
      />

      {/* Gifs */}
      <div className="gifs-container">
        {sampleGifs.map((gif) => (
          <div key={gif.id} className="gif-card">
            <img src={gif.url} alt={gif.title} />
            <h3>{gif.title}</h3>

            <p>
              {gif.width}x{gif.height} (?MB)
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
