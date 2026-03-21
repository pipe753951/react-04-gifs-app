import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("SearchBar", () => {
  test("should render SearchBar properly.", () => {
    render(<SearchBar onProcessQuery={Function} />);

    const searchBar = screen.getByRole("form");

    expect(searchBar).toMatchSnapshot();
  });

  test("must call onQuery with the correct search query after 700ms.", async () => {
    const query = "test";

    const fakeOnProcessQuery = vi.fn();

    render(<SearchBar onProcessQuery={fakeOnProcessQuery} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: query } });

    // await new Promise((resolve) => setTimeout(resolve, 701));
    await waitFor(() => {
      expect(fakeOnProcessQuery).toHaveBeenCalledTimes(1);
      expect(fakeOnProcessQuery).toHaveBeenCalledWith(query);
    });
  });
});
