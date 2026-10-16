import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TarjetaPaciente from "../components/TarjetaPaciente.jsx";
describe("Componente TarjetaPaciente - Pruebas de UI (9-16)", () => {
  const pacienteBase = {
    id: 1,
    nombre: "Bobi",
    especie: "Perro",
    raza: "Poodle",
    dueno: "Carlos",
    vacunasAlDia: true
  };

  it("9. Muestra el nombre de la mascota correctamente", () => {
    render(<TarjetaPaciente paciente={pacienteBase} onVerFicha={() => {}} />);
    expect(screen.getByText("Bobi")).toBeInTheDocument();
  });

  it("10. Renderiza la especie y la raza del paciente", () => {
    render(<TarjetaPaciente paciente={pacienteBase} onVerFicha={() => {}} />);
    expect(screen.getByText(/Especie: Perro/i)).toBeInTheDocument();
  });

  it("11. Renderiza el nombre del dueño", () => {
    render(<TarjetaPaciente paciente={pacienteBase} onVerFicha={() => {}} />);
    expect(screen.getByText(/Carlos/i)).toBeInTheDocument();
  });

  it("12. Muestra badge 'Vacunas al día' cuando vacunasAlDia es true", () => {
    render(<TarjetaPaciente paciente={pacienteBase} onVerFicha={() => {}} />);
    expect(screen.getByText("Vacunas al día")).toBeInTheDocument();
  });

  it("13. Muestra badge 'Vacunación Pendiente' cuando vacunasAlDia es false", () => {
    const pacientePendiente = { ...pacienteBase, vacunasAlDia: false };
    render(<TarjetaPaciente paciente={pacientePendiente} onVerFicha={() => {}} />);
    expect(screen.getByText("Vacunación Pendiente")).toBeInTheDocument();
  });

  it("14. Contiene un botón para consultar la ficha médica", () => {
    render(<TarjetaPaciente paciente={pacienteBase} onVerFicha={() => {}} />);
    const boton = screen.getByRole("button", { name: /ver ficha médica/i });
    expect(boton).toBeInTheDocument();
  });

  it("15. Llama a la función callback al hacer clic en el botón", async () => {
    const user = userEvent.setup();
    const fnSpy = vi.fn();
    render(<TarjetaPaciente paciente={pacienteBase} onVerFicha={fnSpy} />);
    await user.click(screen.getByRole("button", { name: /ver ficha médica/i }));
    expect(fnSpy).toHaveBeenCalledTimes(1);
  });

  it("16. Entrega el ID del paciente como argumento en el clic", async () => {
    const user = userEvent.setup();
    const fnSpy = vi.fn();
    render(<TarjetaPaciente paciente={pacienteBase} onVerFicha={fnSpy} />);
    await user.click(screen.getByRole("button", { name: /ver ficha médica/i }));
    expect(fnSpy).toHaveBeenCalledWith(1);
  });
});