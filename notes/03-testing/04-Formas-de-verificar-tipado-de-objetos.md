# #04. Formas de verificar tipado de objetos

## 1ra. forma - usando `expect.any(*tipo*)`

Esta forma consiste en comparar un objeto con otro utilizando `toEqual` ó `toStrictEqual` para hacerlo estrictamente. Ahora, el objeto a comparar se compone de las mismas propiedades del objeto a comparar con el valor cómo `expect.any(*tipo_de_dato*)`. Esto quiere decir de manera literal que, al comparar, se aceptará cómo _igual_ cualquier tipo de dato con tal que sea el tipo específico especificado en el objeto. Por ejemplo:

```tsx
expect(gif).toStrictEqual({
  id: expect.any(String),
  title: expect.any(String),
  url: expect.any(String),
  width: expect.any(Number),
  height: expect.any(Number),
});
```

## 2da forma - usando `typeof`

El instructor mencionó que esta forma es común de que los desarrolladores la empleen. Consiste en hacer una comparación de que el tipo de un dato sea el deseado, indicando en una cadena de texto del tipo de dato deseado. De manera práctica, esto se logra usando `typeof` con el dato deseado y un método de comparación del framework de pruebas (En este caso, Vitest). Por ejemplo:

```tsx
expect(typeof gif.id).toStrictEqual("string");
expect(typeof gif.id).toBe("string");
```
