export async function listarCitasApi(servicioApi) {
  const citas = await servicioApi.obtenerCitas();
  return citas;
}