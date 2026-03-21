# #02. Pruebas asíncronas

Para realizar pruebas asíncronas en Vitest, se hace de la misma manera que las pruebas síncronas de Vitest, con la diferencia que en las pruebas asíncronas se indica una función expresada asíncrona en lugar de una síncrona. Por ejemplo:

```ts
test("App should fetch API", async () => {
  const response = await fetch("https://www.example.org");
  // ...
});
```
