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
    <div className="flex items-center justify-center my-4">
      <ul className="flex items-center justify-center flex-row flex-wrap gap-2 max-w-100 list-none">
        {previousSearchesList.map((previousSearch) => (
          <li
            key={previousSearch.toLowerCase()}
            className="border-2 border-gray-400 px-2.5 py-0.5 text-sm bg-white rounded-full cursor-pointer  transition-colors transition-200 ease-in-out hover:bg-gray-200"
            onClick={() => onLabelClick?.(previousSearch)}
          >
            {previousSearch}
          </li>
        ))}
      </ul>
    </div>
  );
};
