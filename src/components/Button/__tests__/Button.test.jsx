import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

test("muestra el texto correcto", () => {
  render(<Button text="Haz clic" />);
  expect(screen.getByText("Haz clic")).toBeInTheDocument();
});

test("llama al callback cuando se hace clic", () => {
  const handleClick = jest.fn();
  render(<Button text="Haz clic" onClick={handleClick} />);
  fireEvent.click(screen.getByText("Haz clic"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("aplica correctamente la clase 'disabled' cuando está desactivado", () => {
  render(<Button text="Botón" disabled />);
  const button = screen.getByText("Botón");
  expect(button).toHaveClass("disabled");
  expect(button).toBeDisabled();
});

test("muestra el icono cuando se proporciona", () => {
  render(<Button text="Con icono" icon="star" />);
  const iconElement = screen.getByTestId("button-icon");
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveClass("icon-star");
});
