# 03. axios

## Ventajas de axios

1. _Mucha gente lo utiliza._
2. Es más robusto que el Fetch API.
3. Permite hacer interceptores.
4. Se integra muy bien con TypeScript.

## Usar axios

Para utilizar axios, se utiliza el objeto `axios` junto con los tipos de peticiones HTTP cómo métodos (`get`, `post`, etc.). Estos métodos reciben el URL donde se hará la petición, junto con las opciones de petición. Por ejemplo:

```tsx
import axios from "axios";

export const getGifsByQueryAction = async (query: string): Promise<Gif[]> => {
  const response = await axios.get<GiphyResponse>(
    "https://api.giphy.com/v1/gifs/search",
    {
      params: {
        q: query,
        api_key: import.meta.env["VITE_GIPHY_API_KEY"],
        limit: 10,
        rating: "g",
        lang: "es",
        bundle: "messaging_non_clips",
      },
    },
  );
};
```

## Simplificar el uso de axios

Para simplificar una petición, se crea una instancia personalizada de axios, usando `axios.create`, donde se indica la configuración que tiene, entre otras cosas, la URL base y los parámetros preestablecidos. Por ejemplo:

```tsx
import axios from "axios";

export const giphyApi = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs",
  params: {
    api_key: import.meta.env["VITE_GIPHY_API_KEY"],
    lang: "es",
    rating: "g",
  },
});
```

Ahora, se utiliza la instancia como si fuera el propio axios, usarla conlleva a que aquellos parámetros se usarán como preestablecidos, y las peticiones que se hagan se harán sobre la URL base. Por ejemplo:

```tsx
const response = await giphyApi<GiphyResponse>("/search", {
  params: {
    q: query,
    limit: 10,
    bundle: "messaging_non_clips",
  },
});
```
