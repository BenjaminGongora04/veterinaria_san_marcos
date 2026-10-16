export function obtenerDatosGuardados(clave, valorPorDefecto) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : valorPorDefecto;
}

export function guardarEnStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}