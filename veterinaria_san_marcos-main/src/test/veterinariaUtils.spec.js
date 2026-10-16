import { describe, it, expect } from "vitest";
import { formatearPrecio } from "../utils/formato";
import {
  validarRut,
  calcularEstadoVacuna,
  filtrarMascotasPorEspecie
} from "../utils/veterinariaUtils";

describe("Módulo Utilitario - Pruebas Funcionales (1-8)", () => {
  it("1. formatearPrecio retorna 'Gratis/Control' para valor cero", () => {
    expect(formatearPrecio(0)).toBe("Gratis/Control");
  });

  it("2. formatearPrecio incluye separador de miles en pesos chilenos", () => {
    expect(formatearPrecio(15000)).toContain("15.000");
  });

  it("3. validarRut retorna false si el RUT está vacío", () => {
    expect(validarRut("")).toBe(false);
  });

  it("4. validarRut retorna true para un RUT con formato válido", () => {
    expect(validarRut("12345678-9")).toBe(true);
  });

  it("5. calcularEstadoVacuna marca como 'Vencida' si la fecha es pasada", () => {
    expect(calcularEstadoVacuna("2025-01-01")).toBe("Vencida");
  });

  it("6. calcularEstadoVacuna marca como 'Al Día' si la fecha es futura", () => {
    expect(calcularEstadoVacuna("2027-12-31")).toBe("Al Día");
  });

  it("7. filtrarMascotasPorEspecie devuelve la lista completa si especie es 'Todas'", () => {
    const lista = [{ especie: "Perro" }, { especie: "Gato" }];
    expect(filtrarMascotasPorEspecie(lista, "Todas")).toHaveLength(2);
  });

  it("8. filtrarMascotasPorEspecie filtra correctamente por 'Gato'", () => {
    const lista = [{ especie: "Perro" }, { especie: "Gato" }, { especie: "Gato" }];
    const resultado = filtrarMascotasPorEspecie(lista, "Gato");
    expect(resultado).toHaveLength(2);
  });
});