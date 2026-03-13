# #01. Otra forma de definir componentes en TS.

Un componente también se puede definir en TypeScript como una función que devuelve es de tipo `FC` (Es decir, _Functional Component_), se le puede indicar el tipo de props que recibe a través de un genérico. Por ejemplo:

```jsx
interface Props {
	// ...
}

export const Componente: FC<Props> = function (props) {
	// ...
}
```
