import { calcularEstadoVacuna, filtrarMascotasPorEspecie } from "../utils/veterinariaUtils.js";
import { formatearPrecio } from "../utils/formato.js";
import { obtenerDatosGuardados } from "../utils/persistencia.js";

describe("Utilidades de la veterinaria - Jasmine", function () {
  it("devuelve Sin Registro cuando no existe fecha de próxima vacuna", function () {
    expect(calcularEstadoVacuna("")).toBe("Sin Registro");
  });

  it("devuelve todas las mascotas cuando el filtro es Todas", function () {
    const mascotas = [{ id: 1, especie: "Perro" }, { id: 2, especie: "Gato" }];
    expect(filtrarMascotasPorEspecie(mascotas, "Todas")).toEqual(mascotas);
  });

  it("formatea un precio distinto de cero con símbolo de pesos", function () {
    expect(formatearPrecio(1500)).toContain("$");
    expect(formatearPrecio(1500)).toContain("1.500");
  });

  it("devuelve el valor por defecto cuando no hay datos guardados", function () {
    const clave = "clave-inexistente-jasmine";
    localStorage.removeItem(clave);
    const valorPorDefecto = [{ id: 99 }];
    expect(obtenerDatosGuardados(clave, valorPorDefecto)).toBe(valorPorDefecto);
  });
});
