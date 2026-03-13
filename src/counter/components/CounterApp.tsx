import { useState, type ReactNode } from "react";

import "./index.css";

export const CounterApp = function () {
  const [counter, setCounter] = useState(5);

  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSubtract = () => {
    setCounter(counter - 1);
  };
  const handleReset = () => {
    setCounter(5);
  };

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

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomButton = function ({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="my-2 px-4 py-1.5 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600 focus:ring-3 focus:ring-blue-300"
    >
      {children}
    </button>
  );
};
