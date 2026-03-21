# ⏲️ #08. waitFor

El método `waitFor` de `vi` funciona para esperar que un callback salga exitoso cuando puede al principio dar errores. Por ejemplo:

```tsx
await waitFor(() => {
  expect(fakeOnWaited).toHaveBeenCalledTimes(1);
  expect(fakeOnWaited).toHaveBeenCalledWith(query);
});
```

Este método también recibe parámetros de configuración que configura, entre otras cosas, cuánto tiempo hay que esperar mientras se intenta hacer exitoso el callback, y el intervalo de intentos que hay que hacer por cada llamada fallida.

Mas información en [la documentación de Vitest](https://vitest.dev/api/vi.html#vi-waitfor).
