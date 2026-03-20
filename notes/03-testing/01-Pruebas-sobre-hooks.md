# #01. Pruebas sobre hooks

Para realizar pruebas sobre hooks, hay que hacer uso de la función de Testing Library llamada `renderHook`, que se especializa en hacer funcionar hooks. Fue creada debido a que la función `render` no permite usar hooks, porque los hooks deben usarse únicamente dentro de un componente de React.

Como parámetro, esta función solicita el hook, que a veces se deberá usar un callback para llamarlo. Por ejemplo:

```tsx
const { result } = renderHook(() => useCounter());
const { result } = renderHook(useCounter);
```

## Cambiar estado de los hooks

La función `renderHook` devuelve un objeto que, entre otras cosas, tiene el “resultado” (`result`) y dentro de él está el resultado actual (`current`), ahí está lo que devuelve el hook y, por tanto, se puede llamar a los métodos del hook que sirven para actualizar el estado.

Sin embargo, hay un problema, se trata de que el estado al actualizarse directamente en la prueba con `result.current`, el estado no se actualizará. De hecho, la prueba lanza el siguiente mensaje:

```
An update to TestComponent inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act
```

En pocas palabras, en mensaje dice lo siguiente: \*\*Cualquier actualización de estado debe estar envuelto dentro de un callback en `act`. Por tanto, para actualizar el estado, más o menos debe ser de la siguiente manera:

```tsx
act(() => {
  result.current.handleAdd();
});
```

### El problema de actualización de estado

Es posible actualizar el mismo estado con métodos repetidos, sin embargo, hay que tener en cuenta cómo se actualiza el estado en el custom hook:

1. Si el estado se actualiza de manera directa con el estado deseado, siempre se actualizará con el estado antes del `act`, aunque se repita el mismo método. Esto se debe a que cada vez que se llama al método utiliza el estado actual, iniciando un proceso de actualización del hook que, mientras ocurre, los otros métodos se quedan actualizando el mismo estado que estaba antes del `act`. Un ejemplo de este tipo de actualización es: `setCounter(counter - 1)`.

2. Si el estado se actualiza con un callback que utiliza el estado anterior, ahí sí se logra el efecto esperado. Lo que sucede es confuso, pero pasa porque mientras ocurren las actualizaciones del estado, el callback o su estado anterior que se manda cómo argumento permite el comportamiento deseado. En palabras más simples, tanto el callback cómo el estado anterior pueden lograr que se logre la actualización deseada. Un ejemplo de este tipo de actualización es: `setCounter((prevState) => prevState - 1)`.
