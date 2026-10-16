# Informe de pruebas unitarias — Veterinaria San Marcos

## Objetivo

Verificar comportamientos de componentes React y funciones de apoyo del frontend mediante Jasmine y Karma, conforme a la pauta de evaluación. El conjunto de `src/test-karma` contiene **30 casos `it(...)`**, distribuidos en diez casos por integrante como organización sugerida para la presentación.

## Distribución sugerida por integrante

### Integrante 1 — TarjetaPaciente (10 pruebas)

Archivo: `src/test-karma/TarjetaPaciente.spec.js`

1. Muestra el nombre de la mascota.
2. Muestra la especie de la mascota.
3. Muestra la raza.
4. Muestra el nombre del dueño.
5. Indica que las vacunas están al día.
6. Muestra el botón “Ver Ficha Médica”.
7. Llama a `onVerFicha` con el ID de la mascota.
8. Ejecuta el callback una sola vez al hacer clic.
9. Muestra la etiqueta de vacunación.
10. Renderiza la tarjeta del paciente.

### Integrante 2 — Navegación, pie de página y utilidades (10 pruebas)

Archivos: `src/test-karma/Navegacion.spec.js`, `src/test-karma/PiePagina.spec.js` y parte de `src/test-karma/utilidades.spec.js`.

1. Muestra Inicio e iniciar sesión cuando no hay usuario.
2. Muestra Mis Citas para un cliente.
3. Muestra Gestión Citas para un administrador.
4. Ejecuta el cierre de sesión al pulsar Salir.
5. Muestra el nombre de la veterinaria en el pie de página.
6. Muestra el mensaje de atención.
7. Incluye la etiqueta `footer`.
8. Devuelve “Sin Registro” cuando no hay fecha de próxima vacuna.
9. Devuelve todas las mascotas cuando el filtro es “Todas”.
10. Formatea un precio distinto de cero con símbolo de pesos.

### Integrante 3 — Lógica de negocio y formulario de citas (10 pruebas)

Archivos: `src/test-karma/LogicaNegocio.spec.js` y una prueba de `src/test-karma/utilidades.spec.js`.

1. Acepta un RUT con al menos ocho caracteres, según la lógica actual.
2. Rechaza un RUT vacío o ausente.
3. Marca como vencida una vacuna anterior a la fecha de referencia.
4. Marca como al día una vacuna en la fecha de referencia o posterior.
5. Filtra mascotas por especie sin distinguir mayúsculas.
6. Devuelve “Gratis/Control” para precio cero.
7. Guarda y recupera datos desde `localStorage`.
8. No guarda una cita si faltan los nombres obligatorios.
9. Guarda una cita válida y limpia el formulario.
10. Devuelve el valor por defecto cuando no hay datos guardados.

## Alcance y limitaciones

- Se prueban renderizado, contenido visible, navegación condicional por rol, eventos/callbacks, validaciones del formulario, filtrado de mascotas y funciones de formato/persistencia.
- La función `validarRut` actualmente solo comprueba que el texto tenga al menos ocho caracteres; estas pruebas verifican ese comportamiento existente y no equivalen a validar el dígito verificador oficial del RUT chileno.
- Este informe no declara un porcentaje de cobertura de líneas o ramas, porque todavía no se ha generado un reporte de instrumentación de cobertura.

## Ejecución

Desde la raíz del proyecto:

```bash
npm run test:jasmine
```

Karma está configurado para ejecutar los archivos `src/test-karma/**/*.spec.js` en Chrome. La compilación Webpack de las suites se verificó correctamente en el entorno de revisión; no fue posible ejecutar el navegador en dicho entorno porque no tiene Chrome instalado. Por eso, antes de entregar, ejecutar el comando en el equipo del grupo y guardar una captura del resultado final con `TOTAL: 30 SUCCESS`.
