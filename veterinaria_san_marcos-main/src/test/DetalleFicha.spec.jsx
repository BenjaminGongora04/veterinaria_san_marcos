
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import DetalleFicha from "../pages/DetalleFicha";

const pacienteBase = {
  id: 1,
  nombre: "Firulais",
  especie: "Perro",
  raza: "Labrador",
  edad: 5,
  dueno: "Juan Pérez",
  duenoId: "12345678-9",
  vacunasAlDia: true,
  historial: ["Consulta general", "Vacunación anual"],
};

function renderFicha(pacientes, ruta = "/ficha/1") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route
          path="/ficha/:id"
          element={<DetalleFicha pacientes={pacientes} />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("DetalleFicha - Pruebas de UI", () => {
  it("1. Muestra el nombre del paciente", () => {
    renderFicha([pacienteBase]);

    expect(screen.getByText(/Firulais/)).toBeInTheDocument();
  });

  it("2. Muestra los datos del propietario", () => {
    renderFicha([pacienteBase]);

    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(screen.getByText(/12345678-9/)).toBeInTheDocument();
  });

  it("3. Muestra las vacunas al día", () => {
    renderFicha([pacienteBase]);

    expect(screen.getByText(/Vacunas al Día/i)).toBeInTheDocument();
  });

  it("4. Muestra vacunación pendiente", () => {
    renderFicha([{ ...pacienteBase, vacunasAlDia: false }]);

    expect(screen.getByText(/Vacunación Pendiente/i)).toBeInTheDocument();
  });

  it("5. Muestra el historial clínico", () => {
    renderFicha([pacienteBase]);

    expect(screen.getByText("Consulta general")).toBeInTheDocument();
    expect(screen.getByText("Vacunación anual")).toBeInTheDocument();
  });

  it("6. Muestra el mensaje cuando no hay historial", () => {
    renderFicha([{ ...pacienteBase, historial: [] }]);

    expect(
      screen.getByText(/No hay atenciones previas registradas/i)
    ).toBeInTheDocument();
  });

  it("7. Muestra un mensaje cuando el paciente no existe", () => {
    renderFicha([pacienteBase], "/ficha/999");

    expect(
      screen.getByText(/Ficha Médica No Encontrada/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Volver al Inicio/i })
    ).toBeInTheDocument();
  });

  it("8. Busca el paciente usando el ID numérico de la URL", () => {
    renderFicha([pacienteBase], "/ficha/1");

    expect(screen.getByText(/Firulais/)).toBeInTheDocument();
  });
});
