import { describe, it, expect, vi } from "vitest";
import { guardarEnStorage, obtenerDatosGuardados } from "../utils/persistencia";
import { listarCitasApi } from "../services/citasServicio";

describe("Servicios y Persistencia - Pruebas Avanzadas (25-30)", () => {
  it("25. guardarEnStorage invoca setItem de localStorage con la clave correcta", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem");
    guardarEnStorage("citas_vetsm", [{ id: 1 }]);
    expect(spy).toHaveBeenCalledWith("citas_vetsm", JSON.stringify([{ id: 1 }]));
    spy.mockRestore();
  });

  it("26. obtenerDatosGuardados retorna el valor por defecto si no existen datos", () => {
    const resultado = obtenerDatosGuardados("clave_inexistente", []);
    expect(resultado).toEqual([]);
  });

  it("27. Simula una llamada asíncrona de obtención de citas mediante vi.fn()", async () => {
    const servicioApi = {
      obtenerCitas: vi.fn().mockResolvedValue([{ id: 101, estado: "CONFIRMADA" }])
    };
    const citas = await listarCitasApi(servicioApi);
    expect(servicioApi.obtenerCitas).toHaveBeenCalled();
    expect(citas[0].estado).toBe("CONFIRMADA");
  });

  it("28. Simula un error asíncrono de servidor al consultar API", async () => {
    const servicioApi = {
      obtenerCitas: vi.fn().mockRejectedValue(new Error("Error de conexión"))
    };
    await expect(listarCitasApi(servicioApi)).rejects.toThrow("Error de conexión");
  });

  it("29. Búsqueda de paciente existente retorna el objeto correspondiente", () => {
    const lista = [{ id: 1, nombre: "Thor" }, { id: 2, nombre: "Mimi" }];
    const hallado = lista.find((p) => p.id === 2);
    expect(hallado.nombre).toBe("Mimi");
  });

  it("30. Búsqueda de paciente inexistente retorna undefined sin romper la aplicación", () => {
    const lista = [{ id: 1, nombre: "Thor" }];
    const hallado = lista.find((p) => p.id === 999);
    expect(hallado).toBeUndefined();
  });
});