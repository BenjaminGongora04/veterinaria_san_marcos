export function formatearPrecio(monto) {
  if (monto === 0) return "Gratis/Control";
  return `$${monto.toLocaleString("es-CL")}`;
}