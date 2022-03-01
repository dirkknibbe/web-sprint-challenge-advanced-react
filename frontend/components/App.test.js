// Write your tests here

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import AppFunctional from "./AppFunctional";

test("sanity", () => {
  render(<AppFunctional />);
});

test("test that Coodinates is showing", () => {
  render(<AppFunctional />);

  const coordinates = screen.getByText(/Coordinates/i);

  expect(coordinates).toBeInTheDocument();
});

test("test that the keypad directions are displaying", () => {
  render(<AppFunctional />);

  const leftBtn = screen.getByText(/LEFT/i);
  const rightBtn = screen.getByText(/RIGHT/i);
  const upBtn = screen.getByText(/UP/i);
  const downBtn = screen.getByText(/DOWN/i);
  const resetBtn = screen.getByText(/reset/i);

  expect(leftBtn).toBeInTheDocument();
  expect(rightBtn).toBeInTheDocument();
  expect(upBtn).toBeInTheDocument();
  expect(downBtn).toBeInTheDocument();
  expect(resetBtn).toBeInTheDocument();
});

test("test that the email input is in the document", () => {
  render(<AppFunctional />);

  const emailInput = screen.getByPlaceholderText(/type email/i);

  expect(emailInput).toBeInTheDocument();
});

test("test that the grid is showing", () => {
  render(<AppFunctional />);

  const bigB = screen.getByText("B");

  expect(bigB).toBeInTheDocument();
});

test("test that typing in the input changes the value in the text box", () => {
  render(<AppFunctional />);

  const email = screen.getByPlaceholderText(/type email/i);

  userEvent.type(email, "dirk@dirk.com");

  expect(email).toHaveValue("dirk@dirk.com");
});
