
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navegacion from "../components/Navegacion";

const renderNavegacion = (usuario, onCerrarSesion = vi.fn()) => {
  return render(
    <MemoryRouter>
      <Navegacion
        usuario={usuario}
        onCerrarSesion={onCerrarSesion}
      />
    </MemoryRouter>
  );
};

describe("Navegacion - Pruebas de UI", () => {
  it("1. Muestra el nombre de la veterinaria", () => {
    renderNavegacion(null);
    expect(screen.getByText(/Veterinaria San Marcos/i)).toBeInTheDocument();
  });

  it("2. Muestra el enlace Inicio", () => {
    renderNavegacion(null);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  it("3. Muestra Iniciar Sesión cuando no hay usuario", () => {
    renderNavegacion(null);
    expect(
      screen.getByRole("link", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("4. Muestra el nombre del usuario autenticado", () => {
    renderNavegacion({ nombre: "Carlos", rol: "CLIENTE" });
    expect(screen.getByText(/Salir \(Carlos\)/i)).toBeInTheDocument();
  });

  it("5. Muestra Mis Citas para el cliente", () => {
    renderNavegacion({ nombre: "Carlos", rol: "CLIENTE" });
    expect(screen.getByText("Mis Citas")).toBeInTheDocument();
  });

  it("6. No muestra Mis Citas para un administrador", () => {
    renderNavegacion({ nombre: "Ana", rol: "ADMIN" });
    expect(screen.queryByText("Mis Citas")).not.toBeInTheDocument();
  });

  it("7. Muestra Gestión Citas para el administrador", () => {
    renderNavegacion({ nombre: "Ana", rol: "ADMIN" });
    expect(screen.getByText("Gestión Citas")).toBeInTheDocument();
  });

  it("8. Muestra Gestión Citas para el recepcionista", () => {
    renderNavegacion({ nombre: "Luis", rol: "RECEPCIONISTA" });
    expect(screen.getByText("Gestión Citas")).toBeInTheDocument();
  });

  it("9. Ejecuta el cierre de sesión al hacer clic", async () => {
    const user = userEvent.setup();
    const onCerrarSesion = vi.fn();

    renderNavegacion(
      { nombre: "Carlos", rol: "CLIENTE" },
      onCerrarSesion
    );

    await user.click(
      screen.getByRole("button", { name: /Salir \(Carlos\)/i })
    );

    expect(onCerrarSesion).toHaveBeenCalledTimes(1);
  });
});
