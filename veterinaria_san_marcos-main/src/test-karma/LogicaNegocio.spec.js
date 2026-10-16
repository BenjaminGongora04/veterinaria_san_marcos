import { validarRut, calcularEstadoVacuna, filtrarMascotasPorEspecie } from "../utils/veterinariaUtils.js";
import { formatearPrecio } from "../utils/formato.js";
import { obtenerDatosGuardados, guardarEnStorage } from "../utils/persistencia.js";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import FormularioCita from "../pages/admin/FormularioCita.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Lógica de negocio y FormularioCita - Jasmine", function () {
  it("acepta un RUT con al menos ocho caracteres", function () {
    expect(validarRut("12345678")).toBeTrue();
  });

  it("rechaza un RUT vacío o ausente", function () {
    expect(validarRut("")).toBeFalse();
    expect(validarRut(null)).toBeFalse();
  });

  it("marca como vencida una vacuna anterior al día de referencia", function () {
    expect(calcularEstadoVacuna("2026-10-14")).toBe("Vencida");
  });

  it("marca como al día una vacuna en la fecha de referencia o posterior", function () {
    expect(calcularEstadoVacuna("2026-10-15")).toBe("Al Día");
    expect(calcularEstadoVacuna("2026-10-16")).toBe("Al Día");
  });

  it("filtra mascotas por especie sin distinguir mayúsculas", function () {
    const mascotas = [
      { id: 1, especie: "Perro" },
      { id: 2, especie: "Gato" },
      { id: 3, especie: "PERRO" }
    ];
    expect(filtrarMascotasPorEspecie(mascotas, "perro").map((m) => m.id)).toEqual([1, 3]);
  });

  it("muestra el precio gratuito con la etiqueta definida", function () {
    expect(formatearPrecio(0)).toBe("Gratis/Control");
  });

  it("guarda y recupera datos desde localStorage", function () {
    const clave = "prueba-jasmine-veterinaria";
    const datos = [{ id: 7, nombre: "Luna" }];
    guardarEnStorage(clave, datos);
    expect(obtenerDatosGuardados(clave, [])).toEqual(datos);
    localStorage.removeItem(clave);
  });

  describe("FormularioCita", function () {
    let contenedor;
    let root;
    let onGuardarCita;

    beforeEach(async function () {
      contenedor = document.createElement("div");
      document.body.appendChild(contenedor);
      root = createRoot(contenedor);
      onGuardarCita = jasmine.createSpy("onGuardarCita");
      await act(async function () {
        root.render(<FormularioCita onGuardarCita={onGuardarCita} />);
      });
    });

    afterEach(async function () {
      await act(async function () {
        root.unmount();
      });
      contenedor.remove();
    });

    it("no guarda la cita si faltan los nombres obligatorios", async function () {
      const formulario = contenedor.querySelector("form");
      await act(async function () {
        formulario.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      });
      expect(onGuardarCita).not.toHaveBeenCalled();
      expect(contenedor.textContent).toContain("El nombre de la mascota es obligatorio");
      expect(contenedor.textContent).toContain("El nombre del dueño es obligatorio");
    });

    it("guarda la cita cuando los campos obligatorios están completos y limpia el formulario", async function () {
      const mascota = contenedor.querySelector('input[name="nombreMascota"]');
      const dueno = contenedor.querySelector('input[name="dueno"]');
      await act(async function () {
        const setterMascota = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        setterMascota.call(mascota, "Luna");
        mascota.dispatchEvent(new Event("input", { bubbles: true }));
        mascota.dispatchEvent(new Event("change", { bubbles: true }));
        const setterDueno = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        setterDueno.call(dueno, "María");
        dueno.dispatchEvent(new Event("input", { bubbles: true }));
        dueno.dispatchEvent(new Event("change", { bubbles: true }));
      });
      await act(async function () {
        contenedor.querySelector("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      });
      expect(onGuardarCita).toHaveBeenCalledTimes(1);
      expect(onGuardarCita).toHaveBeenCalledWith(jasmine.objectContaining({
        nombreMascota: "Luna",
        dueno: "María"
      }));
      expect(mascota.value).toBe("");
      expect(dueno.value).toBe("");
    });
  });
});
