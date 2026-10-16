import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import TarjetaPaciente from "../components/TarjetaPaciente.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("TarjetaPaciente - Jasmine", function () {
  let contenedor;
  let root;
  let paciente;
  let onVerFicha;

  beforeEach(async function () {
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);

    paciente = {
      id: 1,
      nombre: "Bobi",
      especie: "Perro",
      raza: "Poodle",
      dueno: "Carlos",
      vacunasAlDia: true
    };

    onVerFicha = jasmine.createSpy("onVerFicha");

    await act(async function () {
      root.render(
        <TarjetaPaciente
          paciente={paciente}
          onVerFicha={onVerFicha}
        />
      );
    });
  });

  afterEach(async function () {
    await act(async function () {
      root.unmount();
    });

    contenedor.remove();
  });

  // 1. Mostrar nombre de la mascota
  it("debe mostrar el nombre de la mascota", function () {
    expect(contenedor.textContent).toContain("Bobi");
  });

  // 2. Mostrar especie
  it("debe mostrar la especie de la mascota", function () {
    expect(contenedor.textContent).toContain("Perro");
  });

  // 3. Mostrar raza
  it("debe mostrar la raza de la mascota", function () {
    expect(contenedor.textContent).toContain("Poodle");
  });

  // 4. Mostrar nombre del dueño
  it("debe mostrar el nombre del dueño", function () {
    expect(contenedor.textContent).toContain("Carlos");
  });

  // 5. Mostrar estado de vacunación al día
  it("debe indicar que las vacunas están al día", function () {
    expect(contenedor.textContent).toContain("Vacunas al día");
  });

  // 6. Mostrar el botón para ver la ficha
  it("debe mostrar el botón Ver Ficha Médica", function () {
    const boton = Array.from(
      contenedor.querySelectorAll("button")
    ).find((elemento) =>
      elemento.textContent.includes("Ver Ficha Médica")
    );

    expect(boton).toBeDefined();
  });

  // 7. Ejecutar callback con el ID correcto
  it("debe llamar a onVerFicha con el ID de la mascota", async function () {
    const boton = contenedor.querySelector("button");

    await act(async function () {
      boton.click();
    });

    expect(onVerFicha).toHaveBeenCalledWith(1);
  });

  // 8. Ejecutar el callback una sola vez por clic
  it("debe ejecutar el callback una sola vez al hacer clic", async function () {
    const boton = contenedor.querySelector("button");

    await act(async function () {
      boton.click();
    });

    expect(onVerFicha).toHaveBeenCalledTimes(1);
  });

  // 9. Mostrar la etiqueta de estado de vacunación
  it("debe mostrar la etiqueta de vacunación", function () {
    const texto = contenedor.textContent;

    expect(
      texto.includes("Vacunas al día") ||
      texto.includes("Vacunación Pendiente")
    ).toBeTrue();
  });

  // 10. Mostrar la información del paciente en una tarjeta
  it("debe renderizar la tarjeta del paciente", function () {
    expect(contenedor.querySelector(".card")).not.toBeNull();
  });
});
