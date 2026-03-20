# #06. Espías y sobre-escritura de métodos de objetos

Los espías son una característica de Vitest que permite rastrear el comportamiento de diferentes funciones y métodos en un proyecto. Estos pueden ser combinados con los mocks. Con `vi`, es posible crear un espía sobre un método de un objeto utilizando el método `spyOn`. Este método recibe cómo argumentos, el objeto origen del método, y el nombre del método en una cadena de texto. Por ejemplo: `vi.spyOn(*objeto*, "*método*")`.

Además, junto con este método se puede configurar un mock para que, encima de que se cree un espía, se reemplace la función para ciertos propósitos, una manera sencilla es utilizar el método `mockImplementation`; que recibe como parámetro la función falsificada. Por ejemplo:

```tsx
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
```
