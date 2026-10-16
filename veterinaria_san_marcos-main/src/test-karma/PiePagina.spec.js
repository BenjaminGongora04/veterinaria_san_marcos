import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import PiePagina from "../components/PiePagina.jsx";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("PiePagina - Jasmine", function () {
  let contenedor;
  let root;

  beforeEach(async function () {
    contenedor = document.createElement("div");
    document.body.appendChild(contenedor);
    root = createRoot(contenedor);

    await act(async function () {
      root.render(<PiePagina />);
    });
  });

  afterEach(async function () {
    await act(async function () {
      root.unmount();
    });
    contenedor.remove();
  });

  it("debe mostrar el nombre de la veterinaria", function () {
    expect(contenedor.textContent).toContain(
      "Veterinaria San Marcos"
    );
  });

  it("debe mostrar el mensaje de atención", function () {
    expect(contenedor.textContent).toContain(
      "Atención y cuidado para tus mascotas"
    );
  });

  it("debe contener la etiqueta footer", function () {
    expect(contenedor.querySelector("footer")).not.toBeNull();
  });
});