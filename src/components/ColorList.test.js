import React from "react";
import MutationObserver from "mutationobserver-shim";

import { render, screen } from "@testing-library/react";
import ColorList from "./ColorList";

test("Renders an empty list of colors without errors", () => {
  const colors = [];
  render(<ColorList colors={colors} />);
});

test("Renders a list of colors without errors", () => {
  const colors = [
    { color: "aliceblue", code: { hex: "#f0f8ff" }, id: 1 },
    { color: "black", code: { hex: "#ffff" }, id: 2 },
  ];
  render(<ColorList colors={colors} />);
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
  const colors = [
    { color: "aliceblue", code: { hex: "#f0f8ff" }, id: 1 },
    { color: "black", code: { hex: "#ffff" }, id: 2 },
  ];
  const { rerender } = render(<ColorList colors={colors} editing={true} />);
  let edit = screen.queryAllByTestId(/edit_menu/i);
  expect(edit).toHaveLength(1);

  rerender(<ColorList colors={colors} editing={false} />);
  edit = screen.queryAllByTestId(/edit_menu/i);
  expect(edit).toHaveLength(0);
});
