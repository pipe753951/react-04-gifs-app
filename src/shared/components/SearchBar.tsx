interface Props {
  name: string;
  id: string;
  placeholder?: string;
  buttonText?: string;
}

export const SearchBar = function ({
  name,
  id,
  placeholder,
  buttonText,
}: Props) {
  return (
    <div className="search-container">
      <input
        className="input"
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
      />
      <button className="button">{buttonText ?? "Buscar"}</button>
    </div>
  );
};
