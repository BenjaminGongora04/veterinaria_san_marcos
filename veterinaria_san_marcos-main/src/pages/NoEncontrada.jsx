import { Link } from "react-router-dom";

function NoEncontrada() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 text-danger">404</h1>
      <p className="fs-5 text-muted">La página o ruta que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
    </div>
  );
}

export default NoEncontrada;