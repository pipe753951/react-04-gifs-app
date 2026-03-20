# #05. Permitir a axios-mock-adapter hacer peticiones “reales”

Para permitir a una instancia de `axios` tipo `axios-mock-adapter` hacer peticiones “reales”. Existen dos formas que conozco:

1. **Permitir las peticiones con `passThrough`:** Consiste en que al configurar una petición, en lugar de falsificarla, se utiliza el método mencionado para hacer que todo el proceso pase por `axios`. El método no recibe parámetros. Por ejemplo: `axiosMock.onAny().passThrough();`.

   ```ts
   beforeEach(() => {
     axiosMock.reset();
   });

   test("should do a real HTTP request.", async () => {
     axiosMock.onAny().passThrough();
     // ...
   });
   test("should do a fake HTTP request.", async () => {
     axiosMock.onGet("/api"); // ✅ Listo.
     // ...
   });
   ```

2. **Desvincular la instancia de `axios` del adaptador:** Para ello, desde la instancia de `axios-mock-adapter` se llama al método `restore`, que tampoco recibe parámetros. El problema es que la desvinculación no se puede repetir que, en pruebas, si se desea hacer una “petición falsa” ya no será posible, por lo que tocará volver a crear la instancia. Por ejemplo:

   ```ts
   beforeEach(() => {
     axiosMock.reset();
   });

   test("should do a real HTTP request.", async () => {
     axiosMock.restore();
     // ...
   });
   test("should do a fake HTTP request.", async () => {
     axiosMock.onGet("/api"); // ⚠️ ¡No funcionará!
     // ...
   });
   ```
