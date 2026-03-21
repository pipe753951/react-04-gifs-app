import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("SearchBar", () => {
  test("must render SearchBar properly.", () => {
    render(<SearchBar onProcessQuery={Function} />);

    const searchBar = screen.getByRole("form");

    expect(searchBar).toMatchSnapshot();
  });

  test("must call onProcessQuery with the correct search query after 700ms.", async () => {
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

  test("must call onProcessQuery only once with the last search query (debounce).", async () => {
    const fakeOnProcessQuery = vi.fn();

    render(<SearchBar onProcessQuery={fakeOnProcessQuery} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fakeOnProcessQuery).toHaveBeenCalledTimes(1);
      expect(fakeOnProcessQuery).toHaveBeenCalledWith("test");
    });
  });

  test("must call onProcessQuery when button clicked with a search query.", async () => {
    const query = "test";
    const fakeOnProcessQuery = vi.fn();

    render(<SearchBar onProcessQuery={fakeOnProcessQuery} />);

    const input = screen.getByRole("searchbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: query } });
    fireEvent.click(button);

    expect(fakeOnProcessQuery).toHaveBeenCalledTimes(1);
    expect(fakeOnProcessQuery).toHaveBeenCalledWith(query);

    await waitFor(() => {
      expect(fakeOnProcessQuery).not.toHaveBeenCalledTimes(1);
      expect(fakeOnProcessQuery).toHaveBeenCalledTimes(2);
    });
  });

  test("must have its placeholder properly in its input.", () => {
    const placeholder = "Testing searchBox";

    render(<SearchBar onProcessQuery={Function} placeholder={placeholder} />);

    expect(screen.queryByPlaceholderText(placeholder)).not.toBeNull();
  });
});
