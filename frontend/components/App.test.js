// Write your tests here

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AppFunctional from "./AppFunctional";

test("sanity", () => {
  render(<AppFunctional />);
});
