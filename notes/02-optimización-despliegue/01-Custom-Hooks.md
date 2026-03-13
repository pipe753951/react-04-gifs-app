# #01. Custom Hooks

Los custom hooks son funciones que separan la lógica de un componente de su diseño visual.

## Crear un custom hook

Teniendo en cuenta las reglas para los hooks, indicadas en la guía de atajos del instructor, se crean con la palabra `use` junto con el nombre del componente a donde se desea aplicar aquel hook. Por ejemplo: `useHome`, `useInput`, etc. Los nombres de los archivos que contienen estos hooks suelen comenzar con los nombres de estos hooks.

Los hooks son funciones que manejan hooks y estado y devuelven un array, objeto o primitivo. Las reglas del instructor indican que **NO se deben modificar hooks directamente**, más bien, recomienda utilizar funciones que establezcan el estado de manera indirecta (Por ejemplo: `setState`, `setCount`, entre otros.).

### Parámetros

Los custom hooks como son funciones, aceptar parámetros, que son utilizados para establecer el estado por defecto, entre otros usos. Mírese el siguiente ejemplo para entender el uso.

## Ejemplo

Aquí esta un ejemplo de un hook:

```tsx
import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);
  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSubtract = () => {
    setCounter(counter - 1);
  };
  const handleReset = () => {
    setCounter(initialValue);
  };

  return {
    // Values / Properties
    counter,
    // Methods / Actions
    handleAdd,
    handleSubtract,
    handleReset,
  };
};
```

Ahora, en el siguiente componente se aplica el hook:

```tsx
import { useCounter } from "../hooks/useCounter";

export const CounterApp = function () {
  const { counter, handleAdd, handleSubtract, handleReset } = useCounter(5);
  return (
    <div className="flex flex-col items-center m-10">
      <h1 className="text-6xl font-semibold my-4">Counter: {counter}</h1>
      <div className="flex gap-2">
        <CustomButton onClick={handleAdd}>+1</CustomButton>
        <CustomButton onClick={handleSubtract}>-1</CustomButton>
        <CustomButton onClick={handleReset}>Reset</CustomButton>
      </div>
    </div>
  );
};
```
