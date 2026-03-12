interface Props {
  previousSearchesList: string[];
}

export const PreviousSearches = function ({ previousSearchesList }: Props) {
  return (
    <div className="previous-searches-container">
      <ul className="previous-searches-list">
        {previousSearchesList.map((previousSearch) => (
          <li className="previous-searches-list-item">{previousSearch}</li>
        ))}
      </ul>
    </div>
  );
};
