
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Navegacion from "../components/Navegacion.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("Navegacion - Jasmine", function () {
  let contenedor;
  let root;

  afterEach(async function () {
    if (root) {
      await act(async function () {
        root.unmount();
      });
    }

    if (contenedor) {
      contenedor.remove();
    }

    root = null;
    contenedor = null;
  });

  async function renderizar(usuario, onCerrarSesion) {
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);

    await act(async function () {
      root.render(
        <MemoryRouter>
          <Navegacion
            usuario={usuario}
            onCerrarSesion={onCerrarSesion}
          />
        </MemoryRouter>
      );
    });
  }

  it("debe mostrar Inicio y permitir iniciar sesión si no hay usuario", async function () {
    await renderizar(null, jasmine.createSpy("onCerrarSesion"));

    expect(contenedor.textContent).toContain("Inicio");
    expect(contenedor.textContent).toContain("Iniciar Sesión");
    expect(contenedor.textContent).not.toContain("Mis Citas");
    expect(contenedor.textContent).not.toContain("Gestión Citas");
  });

  it("debe mostrar Mis Citas para un cliente", async function () {
    await renderizar(
      { nombre: "Carlos", rol: "CLIENTE" },
      jasmine.createSpy("onCerrarSesion")
    );

    expect(contenedor.textContent).toContain("Mis Citas");
    expect(contenedor.textContent).not.toContain("Gestión Citas");
    expect(contenedor.textContent).toContain("Salir (Carlos)");
  });

  it("debe mostrar Gestión Citas para un administrador", async function () {
    await renderizar(
      { nombre: "Ana", rol: "ADMIN" },
      jasmine.createSpy("onCerrarSesion")
    );

    expect(contenedor.textContent).toContain("Gestión Citas");
    expect(contenedor.textContent).not.toContain("Mis Citas");
  });

  it("debe ejecutar el cierre de sesión al pulsar Salir", async function () {
    const cerrarSesion = jasmine.createSpy("onCerrarSesion");

    await renderizar(
      { nombre: "Carlos", rol: "CLIENTE" },
      cerrarSesion
    );

    const boton = Array.from(
      contenedor.querySelectorAll("button")
    ).find((elemento) => elemento.textContent.includes("Salir"));

    expect(boton).toBeDefined();

    await act(async function () {
      boton.click();
    });

    expect(cerrarSesion).toHaveBeenCalled();
  });
});
