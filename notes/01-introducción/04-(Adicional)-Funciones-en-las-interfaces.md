# #04. Adicional - Funciones en las interfaces

Las funciones en las interfaces se pueden definir definiendo el nombre del método y, como tipo de valor: Entre paréntesis los parámetros y los tipos de datos; y, luego del signo igual junto con el de mayor que, el tipo de dato que devuelve la función. Por ejemplo:

```tsx
interface Props {
  onProcessQuery: (query: string) => void;
}
```

## Otra manera

Existe otra manera que consiste en nombrar el método y, entre paréntesis, los parámetros con sus tipos de datos. Luego, luego de los dos puntos, se indica el tipo de valor que devuelve. Por ejemplo:

```tsx
interface Props {
  onLabelClick?(previousSearch: string): void;
}
```

> **💡 Nota:** Para métodos opcionales que utilizan este método, se coloca el signo de pregunta después del nombre de aquel.
