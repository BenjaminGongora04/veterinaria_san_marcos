import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FormularioCita from "../pages/admin/FormularioCita";

describe("Formulario de Citas - Validaciones e Interacción (17-24)", () => {
  it("17. Renderiza el título del formulario", () => {
    render(<FormularioCita onGuardarCita={() => {}} />);
    expect(screen.getByRole("heading", { name: /solicitar cita médica/i })).toBeInTheDocument();
  });

  it("18. Renderiza el botón de agendamiento", () => {
    render(<FormularioCita onGuardarCita={() => {}} />);
    expect(screen.getByRole("button", { name: /agendar cita/i })).toBeInTheDocument();
  });

  it("19. Muestra error de campo obligatorio si la mascota se envía vacía", async () => {
    const user = userEvent.setup();
    render(<FormularioCita onGuardarCita={() => {}} />);
    await user.click(screen.getByRole("button", { name: /agendar cita/i }));
    expect(screen.getByText("El nombre de la mascota es obligatorio")).toBeInTheDocument();
  });

  it("20. Muestra error de campo obligatorio si el dueño está vacío", async () => {
    const user = userEvent.setup();
    render(<FormularioCita onGuardarCita={() => {}} />);
    await user.click(screen.getByRole("button", { name: /agendar cita/i }));
    expect(screen.getByText("El nombre del dueño es obligatorio")).toBeInTheDocument();
  });

  it("21. Permite escribir en el campo del nombre de la mascota", async () => {
    const user = userEvent.setup();
    render(<FormularioCita onGuardarCita={() => {}} />);
    const input = screen.getByLabelText(/nombre de la mascota/i);
    await user.type(input, "Pelusa");
    expect(input).toHaveValue("Pelusa");
  });

  it("22. Permite escribir en el campo del dueño", async () => {
    const user = userEvent.setup();
    render(<FormularioCita onGuardarCita={() => {}} />);
    const input = screen.getByLabelText(/nombre del dueño/i);
    await user.type(input, "Andrea");
    expect(input).toHaveValue("Andrea");
  });

  it("23. No ejecuta la función de guardado cuando existen errores", async () => {
    const user = userEvent.setup();
    const mockGuardar = vi.fn();
    render(<FormularioCita onGuardarCita={mockGuardar} />);
    await user.click(screen.getByRole("button", { name: /agendar cita/i }));
    expect(mockGuardar).not.toHaveBeenCalled();
  });

  it("24. Ejecuta onGuardarCita tras ingresar todos los campos obligatorios", async () => {
    const user = userEvent.setup();
    const mockGuardar = vi.fn();
    render(<FormularioCita onGuardarCita={mockGuardar} />);

    await user.type(screen.getByLabelText(/nombre de la mascota/i), "Max");
    await user.type(screen.getByLabelText(/nombre del dueño/i), "Pedro");
    await user.click(screen.getByRole("button", { name: /agendar cita/i }));

    expect(mockGuardar).toHaveBeenCalledTimes(1);
  });
});