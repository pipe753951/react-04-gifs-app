import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  onProcessQuery?: (query: string) => void;

  name?: string;
  id?: string;
  placeholder?: string;
  buttonText?: string;
}

export const SearchBar = function (props: Props) {
  const {
    onProcessQuery,
    name = "search",
    id = "search",
    placeholder,
    buttonText,
  } = props;

  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onProcessQuery?.(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onProcessQuery]);

  const handleQuery = () => {
    onProcessQuery?.(query);
    // setQuery("");
  };

  // const handleKeyDown: DOMAttributes<HTMLInputElement>["onKeyDown"] = (
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleQuery();
    }
  };

  return (
    <form
      action="?"
      className="flex items-center justify-center flex-row gap-4 my-4"
      aria-label="Search GIFs"
    >
      <input
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        value={query}
        className=" border-2 border-gray-400 p-2.5 w-full max-w-72 text-gray-800 rounded-xl"
        type="search"
        name={name}
        id={id}
        placeholder={placeholder}
      />
      <button
        className="border-none p-2.5 text-white bg-blue-500 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-700"
        onClick={handleQuery}
        type="button"
      >
        {buttonText ?? "Buscar"}
      </button>
    </form>
  );
};
