# #02. useEffect

`useEffect` es un Hook que permite sincronizar un componente con el sistema externo. Se ejecuta cada vez que un estado (Mejor dicho, un variable de “las dependencias”) cambia, cuando se monta el componente, hay efectos secundarios y también cuando se hace limpieza al desmontar el componente. Es un componente difícil de entender al principio, aunque esta es parte de la idea.

## Parámetros

Este Hook consiste en dos parámetros, un callback que reacciona ante los eventos anteriores, y un arreglo que contiene “dependencias”. Estas “dependencias” son estados y variables (No constantes) que se indican para evitar efectos secundarios indeseados que, en uno de los peores casos, es un bucle infinito.

## Ejemplo

```jsx
export const SearchBar = function (props: Props) {
  const { onProcessQuery } = props;

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onProcessQuery?.(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onProcessQuery]);
};
```
