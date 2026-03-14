import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { GifsApp } from "./GifsApp";

describe("GifsApp", () => {
  test("Should render component properly", () => {
    const { container: app } = render(<GifsApp />);

    expect(app).toMatchSnapshot();
  });
});
