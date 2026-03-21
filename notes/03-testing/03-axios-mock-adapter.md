# #03. `axios-mock-adapter`

El paquete `axios-mock-adapter` es una herramienta que se utiliza para convertir una instancia de `axios` en una instancia modificada y falsificada donde se tiene control total sobre su comportamiento, y sobre las peticiones HTTP que se hacen a través de él. Se utiliza para realizar pruebas que requieran peticiones HTTP que puedan o deban ser falsificadas.

Para hacer que el paquete tome control de una instancia de `axios` (O incluso, del propio `axios`), se crea una instancia de `AxiosMockAdapter` con la instancia deseada cómo parámetro de constructor. El código fuente del paquete se encarga de modificar el comportamiento de aquella instancia de `axios` para lograr tomar el control sobre él; lo hace permitiendo el uso de métodos de la instancia que se encargan de ello.

## Hacer una falsificación de una petición HTTP

Para falsifica una petición HTTP con el paquete, desde la instancia se llama los métodos que comienzan con `on`, que falsifican cualquier tipo de petición HTTP soportada. Existe el método `onGet`, que falsifica las peticiones GET; sus parámetros (Y posiblemente el de las otras funciones) se conforman de la URL o la ruta que se desea falsificar, y un objeto de configuración. También, este método devuelve métodos cómo `reply`, que indica cómo será la respuesta HTTP, se compone del código HTTP de respuesta, y los datos de la respuesta. Por ejemplo:

```ts
// ...
const axiosMock = new AxiosMockAdapter(giphyApi);

test("Should get a list of gify by query", async () => {
  axiosMock.onGet("/search").reply(200, giphySearchResponseMock);
  const gifs = await getGifsByQuery("Foto");
});
```
