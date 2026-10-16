
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PiePagina from "../components/PiePagina";

describe("PiePagina - Pruebas de UI", () => {
  it("1. Renderiza el componente correctamente", () => {
    const { container } = render(<PiePagina />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("2. Muestra el nombre de la veterinaria", () => {
    render(<PiePagina />);
    expect(screen.getByText("Veterinaria San Marcos")).toBeInTheDocument();
  });

  it("3. Muestra el mensaje de cuidado de mascotas", () => {
    render(<PiePagina />);
    expect(
      screen.getByText("Atención y cuidado para tus mascotas")
    ).toBeInTheDocument();
  });

  it("4. Contiene un elemento footer", () => {
    const { container } = render(<PiePagina />);
    expect(container.querySelector("footer")).not.toBeNull();
  });

  it("5. Contiene el nombre dentro del footer", () => {
    render(<PiePagina />);
    const footer = screen.getByText("Veterinaria San Marcos").closest("footer");
    expect(footer).not.toBeNull();
  });

  it("6. Contiene el mensaje dentro del footer", () => {
    render(<PiePagina />);
    const mensaje = screen.getByText(
      "Atención y cuidado para tus mascotas"
    );
    expect(mensaje.closest("footer")).not.toBeNull();
  });

  it("7. El nombre de la veterinaria está en un párrafo", () => {
    render(<PiePagina />);
    const nombre = screen.getByText("Veterinaria San Marcos");
    expect(nombre.tagName).toBe("P");
  });

  it("8. El mensaje de cuidado está en un párrafo", () => {
    render(<PiePagina />);
    const mensaje = screen.getByText(
      "Atención y cuidado para tus mascotas"
    );
    expect(mensaje.tagName).toBe("P");
  });
});
