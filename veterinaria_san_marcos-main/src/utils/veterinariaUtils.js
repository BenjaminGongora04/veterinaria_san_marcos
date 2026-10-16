export function validarRut(rut) {
  if (!rut) return false;
  return rut.length >= 8;
}

export function calcularEstadoVacuna(proximaFecha) {
  if (!proximaFecha) return "Sin Registro";
  const hoy = new Date("2026-10-15");
  const fecha = new Date(proximaFecha);
  return fecha < hoy ? "Vencida" : "Al Día";
}

export function filtrarMascotasPorEspecie(mascotas, especie) {
  if (!especie || especie === "Todas") return mascotas;
  return mascotas.filter((m) => m.especie.toLowerCase() === especie.toLowerCase());
}