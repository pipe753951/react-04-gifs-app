import type { FC } from "react";

interface Props {
  previousSearchesList: string[];

  // onLabelClick?(previousSearch: string): void;
  onLabelClick: (previousSearch: string) => void;
}

export const PreviousSearches: FC<Props> = function ({
  previousSearchesList,
  onLabelClick,
}) {
  return (
    <div className="previous-searches-container">
      <ul className="previous-searches-list">
        {previousSearchesList.map((previousSearch) => (
          <li
            key={previousSearch.toLowerCase()}
            className="previous-searches-list-item"
            onClick={() => onLabelClick?.(previousSearch)}
          >
            {previousSearch}
          </li>
        ))}
      </ul>
    </div>
  );
};
