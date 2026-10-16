
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

vi.mock("../utils/persistencia", () => ({
  obtenerDatosGuardados: vi.fn(() => []),
  guardarEnStorage: vi.fn(),
}));

describe("App - Pruebas de integración", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("1. Renderiza la aplicación", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", {
        name: /Veterinaria San Marcos/i,
      })
    ).toBeInTheDocument();
  });

  it("2. Muestra la navegación", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Inicio" })
    ).toBeInTheDocument();
  });

  it("3. Muestra la página de inicio en la ruta principal", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Inicio" })
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/404|página no encontrada/i)
    ).not.toBeInTheDocument();
  });

  it("4. Muestra la página 404 en una ruta desconocida", () => {
    render(
      <MemoryRouter initialEntries={["/ruta-inexistente"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/404|no encontrada|no encontrado/i)
    ).toBeInTheDocument();
  });

  it("5. Muestra la sección de citas en la ruta administrativa", () => {
    render(
      <MemoryRouter initialEntries={["/admin/citas"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Citas Agendadas/i })
    ).toBeInTheDocument();
  });

  it("6. Muestra el contador inicial de citas", () => {
    render(
      <MemoryRouter initialEntries={["/admin/citas"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /Citas Agendadas \(0\)/i,
      })
    ).toBeInTheDocument();
  });

  it("7. Muestra el mensaje cuando no existen citas", () => {
    render(
      <MemoryRouter initialEntries={["/admin/citas"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No hay citas agendadas aún/i)
    ).toBeInTheDocument();
  });

  it("8. Muestra el formulario para agendar citas", () => {
    render(
      <MemoryRouter initialEntries={["/admin/citas"]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /Agendar Cita/i })
    ).toBeInTheDocument();
  });
});
