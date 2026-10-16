# Clínica Veterinaria San Marcos — SPA & Sistema de Gestión

Proyecto desarrollado para la evaluación **EP2 (DSY1104 - Desarrollo FullStack II)**. Es una aplicación web de página única (SPA) construida con React, Vite y Bootstrap para la gestión de pacientes y agendamiento de citas médicas en la Clínica Veterinaria San Marcos.

---

## Tecnologías Utilizadas

- **Frontend:** React 18, Vite, React Bootstrap, Bootstrap 5, React Router DOM v6
- **Testing Suite:** Vitest, React Testing Library, JSDOM, V8 Coverage
- **Despliegue & Servidor:** AWS EC2 (Ubuntu Server 22.04 LTS), Nginx
- **Control de Versiones:** Git, GitHub

---

## Características y Funcionalidades

- **Navegación SPA Responsiva:** Barra de navegación adaptable (mobile/desktop) con roles de usuario (Recepcionista/Admin/Dueño)[cite: 1, 3].
- **Catálogo de Pacientes:** Filtro dinámico por especie (Perro, Gato, Conejo, Ave) y buscador en tiempo real[cite: 2].
- **Ficha Médica Detallada:** Vista de detalle por mascota con historial de vacunas e información de contacto (`/ficha/:id`)[cite: 1, 2].
- **Módulo de Agendamiento (CRUD):** Formulario de solicitud de citas con selección de especialista, servicio y horarios, con persistencia en `localStorage` y opción de cancelación[cite: 1, 2].
- **Manejo de Rutas 404:** Página personalizada de ruta no encontrada[cite: 1].
- **Pie de Página Institucional:** Footer reutilizable con información académica y de contacto[cite: 3].

---

## Pruebas Unitarias y Cobertura (Testing)

El proyecto cuenta con una suite completa de pruebas unitarias automatizadas ejecutadas mediante Vitest.

- **Resultados de Pruebas:** 30 de 30 pasadas con éxito (100% aprobación).
- **Cobertura de Código (V8):** 100% de cobertura en módulos críticos, servicios asíncronos con mocks, persistencia y componentes principales (`TarjetaPaciente`, `FormularioCita`).

```bash
# Ejecutar la suite de pruebas
npm run test:run

# Generar informe de cobertura V8
npm run coverage
