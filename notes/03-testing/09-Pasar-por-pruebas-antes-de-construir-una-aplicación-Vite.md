# #09. Pasar por pruebas antes de construir una aplicación Vite

Para hacer que se pase por un proceso de pruebas antes de proceder a construir una aplicación creada con Vite y que, sí hay al menos una prueba que falle, se cancele el proceso; hay que modificar `package.json`. En el apartado de `scripts`, se debe colocar un script que corra `vitest run` (que realiza las pruebas y, al terminar, termina la ejecución de script) que intervenga en el comando de construcción. Por ejemplo, se puede crear un script de prueba aparte, y ejecutarlo antes de la construcción:

```json
{
  // ...
  "scripts": {
    // ...
    "build": "npm run test:only && tsc -b && vite build",
    "test:only": "vitest run"
    // ...
  }
  // ...
}
```
