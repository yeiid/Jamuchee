import React from "react";
import { render } from "@testing-library/react";
import Card from "../Card";

describe("Componente Card", () => {
  test("renderiza correctamente con props básicas", () => {
    const { container } = render(
      <Card
        title="Título de tarjeta"
        subtitle="Subtítulo opcional"
        imageUrl="/path/to/image.jpg"
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("renderiza correctamente sin imagen", () => {
    const { container } = render(<Card title="Solo título" />);
    expect(container).toMatchSnapshot();
  });

  test("renderiza contenido hijo correctamente", () => {
    const { container } = render(
      <Card title="Tarjeta con hijos">
        <p>Este es un párrafo dentro de la tarjeta</p>
        <button>Un botón</button>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
});
