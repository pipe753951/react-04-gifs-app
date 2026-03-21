# #07. act asíncrono

Es posible usar la función `act` de Vitest con métodos asíncronos. Para hacerlo, la función callback se declara asíncrona y, por tanto, el código de la función es tal; y si se prefiere, se ejecuta la función con `await` (Es posible porque cuando el callback es asíncrono, el `act` “se convierte” en una promesa). Por ejemplo:

````ts
await act(async () => {
  await result.current.handleSearch("Foto");
});
```I
````
