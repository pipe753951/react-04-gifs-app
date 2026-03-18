import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { AppHeader } from "./AppHeader";

describe("AppHeader", () => {
  const testingTitleText = "Testing title";

  test("Should render title correctly", () => {
    render(<AppHeader title={testingTitleText} />);

    const title = screen.getByRole("heading");

    expect(title.innerHTML).toBe(testingTitleText);
  });

  test("Should render description when provided", () => {
    const descriptionText = "This is a description text.";

    render(
      <AppHeader title={testingTitleText} description={descriptionText} />,
    );

    const description = screen.getByRole("paragraph");

    expect(description.innerHTML).toBe(descriptionText);
  });
  test("Shouldn't render description when isn't provided", () => {
    const titleText = "Testing title";

    render(<AppHeader title={titleText} />);

    expect(() => screen.getByRole("paragraph")).toThrow();
    expect(screen.queryByRole("paragraph")).toBeNull();

    //* Método usado por el profesor.
    // const { container } = render(<AppHeader title={titleText} />);

    // const parragraph = container.querySelector("p");
    // expect(parragraph).toBeNull();
  });
});
