import { useState, type KeyboardEvent } from "react";

interface Props {
  onProcessQuery?: (query: string) => void;

  name: string;
  id: string;
  placeholder?: string;
  buttonText?: string;
}

export const SearchBar = function (props: Props) {
  const [query, setQuery] = useState("");

  const { onProcessQuery, name, id, placeholder, buttonText } = props;

  const handleQuery = () => {
    onProcessQuery?.(query);
    // setQuery("");
  };

  // const handleKeyDown: DOMAttributes<HTMLInputElement>["onKeyDown"] = (
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleQuery();
  };

  return (
    <div className="search-container">
      <input
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        value={query}
        className="input"
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
      />
      <button className="button" onClick={handleQuery}>
        {buttonText ?? "Buscar"}
      </button>
    </div>
  );
};
